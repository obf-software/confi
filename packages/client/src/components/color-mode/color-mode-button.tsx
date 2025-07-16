import { ClientOnly, IconButton, IconButtonProps, Skeleton } from '@chakra-ui/react';
import React from 'react';

import { ColorModeIcon } from './color-mode-icon';
import { useColorMode } from './hooks';

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode, colorMode } = useColorMode();
    
    const handleClick = () => {
      console.log('Current color mode:', colorMode);
      toggleColorMode();
    };
    
    return (
      <ClientOnly fallback={<Skeleton boxSize='8' />}>
        <IconButton
          onClick={handleClick}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    );
  }
);
