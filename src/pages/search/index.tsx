/* eslint-disable @typescript-eslint/no-misused-promises */

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toasterStore } from '../../components/toaster';
import { buildPath } from '../../helpers/build-path';
import { zodResolver } from '../../helpers/zod-resolver';
import { BriefingStep } from './briefing-step';
import { DiversityStep } from './diversity-step';
import { NameStep } from './name-step';
import { FormData, formDataSchema, FormPageId } from './protocols';
import { useFindOpportunities } from './use-find-opportunities';

export const Search: React.FC = () => {
  const [currentPageId, setCurrentPageId] = React.useState<FormPageId>('name');
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      organizationName: 'asdasdas',
      organizationBriefing: 'asd',
      activityRegion: '123',
      organizationType: 'Informal (sem CNPJ)',
      activityTime: 'Menos de 1 ano',
      businessStage: 'Ideação',
      ods: 'Pobreza - ODS 1',
      minorityGroups: [],
      englishLevel: 'Ainda não',
    },
  });
  const navigate = useNavigate();
  const findOpportunities = useFindOpportunities();

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    await new Promise<void>((resolve) => {
      findOpportunities.mutate(data, {
        onSuccess: (opportunities) => {
          void navigate(buildPath('opportunities'), { state: { opportunities } });
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
