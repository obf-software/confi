import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Box textAlign='center'>
        <Spinner
          size='xl'
          color='brandPrimaryButton.500'
        />
      </Box>
    </Flex>
  );
};