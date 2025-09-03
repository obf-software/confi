import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToaster } from '../../../contexts/toaster';
import { zodResolver } from '../../../helpers/zod-resolver';
import { BriefingStep } from './briefing-step';
import { DiversityStep } from './diversity-step';
import { NameStep } from './name-step';
import { FormData, formDataSchema, FormPageId } from './protocols';
import { useFindOpportunities } from '../../../hooks/use-find-opportunities';

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
  const toaster = useToaster();

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    await new Promise<void>((resolve) => {
      findOpportunities.mutate(data, {
        onSuccess: (opportunities) => {
          void navigate('/dashboard/opportunities', { state: { opportunities } });
          resolve();
        },
        onError: (error) => {
          toaster.create({
            id: 'failed-to-find-opportunities',
            title: 'Unable to search for opportunities',
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
