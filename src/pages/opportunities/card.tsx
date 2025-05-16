import { CheckboxCard, Link } from '@chakra-ui/react';
import React from 'react';

import { Opportunity } from '../../services/opportunity';

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
      colorPalette='brandPrimaryButton'
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

          <CheckboxCard.Label mt='6'>💡 O que você ganha?</CheckboxCard.Label>
          <CheckboxCard.Description>{data.benefits}</CheckboxCard.Description>

          <CheckboxCard.Label>🎯 Requisitos</CheckboxCard.Label>
          <CheckboxCard.Description>{data.requirements}</CheckboxCard.Description>

          <CheckboxCard.Label>📅 Prazo de Inscrição</CheckboxCard.Label>
          <CheckboxCard.Description>{data.enrollmentDeadline}</CheckboxCard.Description>

          <CheckboxCard.Label>⏱️ Tempo estimado de preparação</CheckboxCard.Label>
          <CheckboxCard.Description>{data.preparationTime}</CheckboxCard.Description>

          <CheckboxCard.Label>📄 Documentação exigida</CheckboxCard.Label>
          <CheckboxCard.Description>{data.requiredDocumentation}</CheckboxCard.Description>
        </CheckboxCard.Content>

        <CheckboxCard.Indicator />
      </CheckboxCard.Control>

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
    </CheckboxCard.Root>
  );
};
