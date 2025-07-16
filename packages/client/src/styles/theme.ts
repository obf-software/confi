import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsRoot: ':where(:root, :host)',
  theme: {
    keyframes: {
      fadeInUp: {
        "0%": { 
          opacity: "0", 
          transform: "translateY(30px)" 
        },
        "100%": { 
          opacity: "1", 
          transform: "translateY(0)" 
        },
      },
      float: {
        "0%, 100%": { 
          transform: "translateY(0px)" 
        },
        "50%": { 
          transform: "translateY(-10px)" 
        },
      },
      shimmer: {
        "0%": { 
          backgroundPosition: "-200% center" 
        },
        "100%": { 
          backgroundPosition: "200% center" 
        },
      },
      pulse: {
        "0%, 100%": { 
          opacity: "1" 
        },
        "50%": { 
          opacity: "0.8" 
        },
      },
    },
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
      animations: {
        fadeInUp: { value: "fadeInUp 1s ease-out" },
        fadeInUpDelay: { value: "fadeInUp 1s ease-out 0.2s both" },
        fadeInUpDelay4: { value: "fadeInUp 1s ease-out 0.4s both" },
        fadeInUpDelay6: { value: "fadeInUp 1s ease-out 0.6s both" },
        fadeInUpDelay8: { value: "fadeInUp 1s ease-out 0.8s both" },
        fadeInUpDelayLong: { value: "fadeInUp 0.8s ease-out 1s both" },
        float: { value: "float 3s ease-in-out infinite" },
        floatSlow: { value: "float 4s ease-in-out infinite" },
        floatDelay: { value: "float 4s ease-in-out infinite 1s" },
        floatFast: { value: "float 2s ease-in-out infinite 0.5s" },
        floatStats: { value: "float 2s ease-in-out infinite" },
        floatStats2: { value: "float 2s ease-in-out infinite 0.5s" },
        floatStats3: { value: "float 2s ease-in-out infinite 1s" },
        floatLong: { value: "float 6s ease-in-out infinite" },
        shimmer: { value: "shimmer 1.5s linear infinite" },
        pulse: { value: "pulse 4s ease-in-out infinite" },
      },
    },
    semanticTokens: {
      colors: {
        brandPrimaryButton: {
          solid: { value: '#00C5CB' },
          contrast: { value: '#FFFFFF' },
          fg: { value: '#00C5CB' },
          muted: { value: '#00C5CB' },
          subtle: { value: '#000000' },
          emphasized: { value: '#00C5CB' },
          focusRing: { value: '#00C5CB' },
        },
      },
    },
  },
});

export const themeSystem = createSystem(defaultConfig, config);

export default themeSystem;
