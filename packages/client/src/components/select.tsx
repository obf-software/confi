import { ListCollection, Portal, Select as ChakraSelect, SelectRootProps } from '@chakra-ui/react';
import React from 'react';

export interface SelectProps extends SelectRootProps {
  label?: React.ReactNode;
  multiple?: boolean;
  collection: ListCollection<string>;
}

export const Select: React.FC<SelectProps> = ({ label, ...defaultProps }) => {
  return (
    <ChakraSelect.Root
      size='lg'
      variant='outline'
      {...defaultProps}
    >
      <ChakraSelect.HiddenSelect />
      {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}

      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder='Selecione' />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {defaultProps.collection.items.map((response) => (
              <ChakraSelect.Item
                item={response}
                key={response}
              >
                {response}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};
