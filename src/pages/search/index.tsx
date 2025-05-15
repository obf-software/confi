/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver as hookformZodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form';

import { BriefingStep } from './briefing-step';
import { DiversityStep } from './diversity-step';
import { NameStep } from './name-step';
import { FormData, formDataSchema, FormPageId } from './protocols';

/**
 * This type casting avoid typescript server issues with the hookform/resolvers library
 */
const zodResolver = hookformZodResolver as unknown as (
  ...data: unknown[]
) => Resolver<FormData, unknown, FormData>;

export const Search: React.FC = () => {
  const [currentPageId, setCurrentPageId] = React.useState<FormPageId>('name');

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
