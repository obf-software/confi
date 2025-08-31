/* eslint-disable @typescript-eslint/no-misused-promises */

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toasterStore } from '../../components/toaster';
import { zodResolver } from '../../helpers/zod-resolver';
import { BriefingStep } from '../search/briefing-step';
import { DiversityStep } from '../search/diversity-step';
import { NameStep } from '../search/name-step';
import { FormData, formDataSchema, FormPageId } from '../search/protocols';
import { useFindOpportunities } from '../search/use-find-opportunities';

export const DashboardFindOpportunities: React.FC = () => {
  const [currentPageId, setCurrentPageId] = React.useState<FormPageId>('name');
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      organizationName: '',
      organizationBriefing: '',
      activityRegion: '',
      organizationType: '',
      activityTime: '',
      businessStage: '',
      ods: '',
      minorityGroups: [],
      englishLevel: '',
    },
  });
  const navigate = useNavigate();
  const findOpportunities = useFindOpportunities();

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    await new Promise<void>((resolve) => {
      findOpportunities.mutate(data, {
        onSuccess: (opportunities) => {
          void navigate('/dashboard/opportunities', { state: { opportunities } });
          resolve();
        },
        onError: (error) => {
          toasterStore.create({
            id: 'failed-to-find-opportunities',
            title: 'Não foi possível buscar oportunidades',
            description: error.message,
            closable: true,
            type: 'error',
          });
          resolve();
        },
      });
    });
  };

  React.useEffect(() => {
    if (formMethods.formState.errors.organizationName) {
      setCurrentPageId('name');
      return;
    }

    if (formMethods.formState.errors.organizationBriefing) {
      setCurrentPageId('briefing');
      return;
    }
  }, [formMethods.formState.errors]);

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(submitHandler)}>
          {currentPageId === 'name' && (
            <NameStep
              onNext={() => {
                setCurrentPageId('briefing');
              }}
            />
          )}

          {currentPageId === 'briefing' && (
            <BriefingStep
              onBack={() => {
                setCurrentPageId('name');
              }}
              onNext={() => {
                setCurrentPageId('diversity');
              }}
            />
          )}

          {currentPageId === 'diversity' && (
            <DiversityStep
              onBack={() => {
                setCurrentPageId('briefing');
              }}
            />
          )}
        </form>
      </FormProvider>
    </>
  );
};