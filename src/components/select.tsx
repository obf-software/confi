import { ListCollection, Portal, Select as ChakraSelect } from '@chakra-ui/react';
import React from 'react';

export interface SelectProps {
  label: React.ReactNode;
  multiple?: boolean;
  collection: ListCollection<{ value: string }>;
}

export const Select: React.FC<SelectProps> = ({ label, multiple, collection }) => {
  return (
    <ChakraSelect.Root
      multiple={multiple}
      collection={collection}
      size='lg'
      variant='subtle'
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>{label}</ChakraSelect.Label>
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
            {collection.items.map((response) => (
              <ChakraSelect.Item
                item={response}
                key={response.value}
              >
                {response.value}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};
