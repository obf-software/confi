import React from 'react';

import { BriefingStep } from './briefing-step';
import { DiversityStep } from './diversity-step';
import { NameStep } from './name-step';

type FormPage = 'name' | 'diversity' | 'briefing';

export const Search: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<FormPage>('name');

  return (
    <>
      {currentPage === 'name' && (
        <NameStep
          onNext={() => {
            setCurrentPage('briefing');
          }}
        />
      )}

      {currentPage === 'briefing' && (
        <BriefingStep
          onBack={() => {
            setCurrentPage('name');
          }}
          onNext={() => {
            setCurrentPage('diversity');
          }}
        />
      )}

      {currentPage === 'diversity' && (
        <DiversityStep
          onBack={() => {
            setCurrentPage('briefing');
          }}
          onSubmit={() => {
            console.log('submit');
          }}
        />
      )}
    </>
  );
};
