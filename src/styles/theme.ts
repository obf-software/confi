import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsRoot: ':where(:root, :host)',
  theme: {
    tokens: {
      colors: {
        brand: {
          lightBlue: {
            value: '#D8F3F8',
          },
          grayText: {
            value: '#888888',
          },
        },
      },
      fonts: {
        heading: { value: 'Open Sauce One' },
        body: { value: 'Open Sauce One' },
      },
    },
    semanticTokens: {
      colors: {
        brandPrimaryButton: {
          solid: { value: '#00C5CB' },
          contrast: { value: '#00C5CB' },
          fg: { value: '#00C5CB' },
          muted: { value: '#00C5CB' },
          subtle: { value: '#00C5CB' },
          emphasized: { value: '#00C5CB' },
          focusRing: { value: '#00C5CB' },
        },
      },
    },
  },
});

export const themeSystem = createSystem(defaultConfig, config);

export default themeSystem;
