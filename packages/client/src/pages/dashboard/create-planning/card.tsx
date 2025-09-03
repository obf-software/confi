import { CheckboxCard, Link } from '@chakra-ui/react';
import React from 'react';
import { Opportunity } from '../../../services/api';

export interface OpportunityCardProps {
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  data: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  checked,
  onCheckedChange,
  data,
}) => {
  return (
    <CheckboxCard.Root
      colorPalette='teal'
      rounded='lg'
      checked={checked}
      onCheckedChange={(e) => {
        onCheckedChange(!!e.checked);
      }}
    >
      <CheckboxCard.HiddenInput />

      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>🌎 {data.name}</CheckboxCard.Label>
          <CheckboxCard.Description mt='6'>{data.description}</CheckboxCard.Description>

          <CheckboxCard.Label mt='6'>💡 What you gain?</CheckboxCard.Label>
          <CheckboxCard.Description>{data.benefits.join(' • ')}</CheckboxCard.Description>

          <CheckboxCard.Label>🎯 Requirements</CheckboxCard.Label>
          <CheckboxCard.Description>{data.requirements.join(' • ')}</CheckboxCard.Description>

          <CheckboxCard.Label>📅 Enrollment Deadline</CheckboxCard.Label>
          <CheckboxCard.Description>{data.enrollmentDeadline}</CheckboxCard.Description>

          <CheckboxCard.Label>⏱️ Estimated Preparation Time</CheckboxCard.Label>
          <CheckboxCard.Description>{data.preparationTime}</CheckboxCard.Description>

          <CheckboxCard.Label>📄 Required Documentation</CheckboxCard.Label>
          <CheckboxCard.Description>{data.requiredDocumentation}</CheckboxCard.Description>
        </CheckboxCard.Content>

        <CheckboxCard.Indicator />
      </CheckboxCard.Control>

      {data.link && (
        <CheckboxCard.Addon>
          <CheckboxCard.Label>
            <Link
              href={data.link}
              target='_blank'
              overflow='clip'
              lineBreak='anywhere'
            >
              🔗 {data.link}
            </Link>
          </CheckboxCard.Label>
        </CheckboxCard.Addon>
      )}
    </CheckboxCard.Root>
  );
};
