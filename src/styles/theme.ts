import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsRoot: ':where(:root, :host)',
});

export const themeSystem = createSystem(defaultConfig, config);

export default themeSystem;
