import { createToaster } from '@chakra-ui/react';

export const toasterStore = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});
