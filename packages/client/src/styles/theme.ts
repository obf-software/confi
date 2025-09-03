import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsRoot: ':where(:root, :host)',
  conditions: {
    light: '.light, .light *',
    dark: '.dark, .dark *',
  },
  theme: {
    keyframes: {
      fadeInUp: {
        '0%': {
          opacity: '0',
          transform: 'translateY(30px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      float: {
        '0%, 100%': {
          transform: 'translateY(0px)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
      },
      shimmer: {
        '0%': {
          backgroundPosition: '-200% center',
        },
        '100%': {
          backgroundPosition: '200% center',
        },
      },
      pulse: {
        '0%, 100%': {
          opacity: '1',
        },
        '50%': {
          opacity: '0.8',
        },
      },
      slideInUp: {
        '0%': {
          opacity: '0',
          transform: 'translateY(40px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      slideInLeft: {
        '0%': {
          opacity: '0',
          transform: 'translateX(-40px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      slideInRight: {
        '0%': {
          opacity: '0',
          transform: 'translateX(40px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      scaleIn: {
        '0%': {
          opacity: '0',
          transform: 'scale(0.8)',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
    },
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f9fa' },
          100: { value: '#ccf2f3' },
          200: { value: '#99e5e8' },
          300: { value: '#66d8dc' },
          400: { value: '#33cbd1' },
          500: { value: '#00c5cb' },
          600: { value: '#009ea2' },
          700: { value: '#00767a' },
          800: { value: '#004f51' },
          900: { value: '#002729' },
          950: { value: '#001314' },
        },
        gray: {
          50: { value: '#f9fafb' },
          100: { value: '#f3f4f6' },
          200: { value: '#e5e7eb' },
          300: { value: '#d1d5db' },
          400: { value: '#9ca3af' },
          500: { value: '#6b7280' },
          600: { value: '#4b5563' },
          700: { value: '#374151' },
          800: { value: '#1f2937' },
          900: { value: '#111827' },
          950: { value: '#030712' },
        },
      },
      fonts: {
        heading: { value: 'Open Sauce One' },
        body: { value: 'Open Sauce One' },
      },
      animations: {
        fadeInUp: { value: 'fadeInUp 1s ease-out' },
        fadeInUpDelay: { value: 'fadeInUp 1s ease-out 0.2s both' },
        fadeInUpDelay4: { value: 'fadeInUp 1s ease-out 0.4s both' },
        fadeInUpDelay6: { value: 'fadeInUp 1s ease-out 0.6s both' },
        fadeInUpDelay8: { value: 'fadeInUp 1s ease-out 0.8s both' },
        fadeInUpDelayLong: { value: 'fadeInUp 0.8s ease-out 1s both' },
        float: { value: 'float 3s ease-in-out infinite' },
        floatSlow: { value: 'float 4s ease-in-out infinite' },
        floatDelay: { value: 'float 4s ease-in-out infinite 1s' },
        floatFast: { value: 'float 2s ease-in-out infinite 0.5s' },
        floatStats: { value: 'float 2s ease-in-out infinite' },
        floatStats2: { value: 'float 2s ease-in-out infinite 0.5s' },
        floatStats3: { value: 'float 2s ease-in-out infinite 1s' },
        floatLong: { value: 'float 6s ease-in-out infinite' },
        shimmer: { value: 'shimmer 1.5s linear infinite' },
        pulse: { value: 'pulse 4s ease-in-out infinite' },
        slideInUp: { value: 'slideInUp 0.8s ease-out forwards' },
        slideInLeft: { value: 'slideInLeft 0.8s ease-out forwards' },
        slideInRight: { value: 'slideInRight 0.8s ease-out forwards' },
        scaleIn: { value: 'scaleIn 0.6s ease-out forwards' },
        slideInUpDelay1: { value: 'slideInUp 0.8s ease-out 0.1s forwards' },
        slideInUpDelay2: { value: 'slideInUp 0.8s ease-out 0.2s forwards' },
        slideInUpDelay3: { value: 'slideInUp 0.8s ease-out 0.3s forwards' },
      },
    },
    semanticTokens: {
      colors: {
        // Brand colors with light/dark mode support
        brandPrimaryButton: {
          solid: {
            value: { _light: 'brand.500', _dark: 'brand.400' },
          },
          contrast: {
            value: { _light: 'white', _dark: 'gray.900' },
          },
          fg: {
            value: { _light: 'brand.500', _dark: 'brand.300' },
          },
          muted: {
            value: { _light: 'brand.100', _dark: 'brand.800' },
          },
          subtle: {
            value: { _light: 'brand.50', _dark: 'brand.900' },
          },
          emphasized: {
            value: { _light: 'brand.600', _dark: 'brand.300' },
          },
          focusRing: {
            value: { _light: 'brand.500', _dark: 'brand.400' },
          },
          50: { value: { _light: 'brand.50', _dark: 'brand.950' } },
          100: { value: { _light: 'brand.100', _dark: 'brand.900' } },
          200: { value: { _light: 'brand.200', _dark: 'brand.800' } },
          300: { value: { _light: 'brand.300', _dark: 'brand.700' } },
          400: { value: { _light: 'brand.400', _dark: 'brand.600' } },
          500: { value: { _light: 'brand.500', _dark: 'brand.500' } },
          600: { value: { _light: 'brand.600', _dark: 'brand.400' } },
          700: { value: { _light: 'brand.700', _dark: 'brand.300' } },
          800: { value: { _light: 'brand.800', _dark: 'brand.200' } },
          900: { value: { _light: 'brand.900', _dark: 'brand.100' } },
        },
        // Background colors
        bg: {
          canvas: {
            value: { _light: 'white', _dark: 'gray.900' },
          },
          surface: {
            value: { _light: 'gray.50', _dark: 'gray.800' },
          },
          subtle: {
            value: { _light: 'gray.100', _dark: 'gray.700' },
          },
          muted: {
            value: { _light: 'gray.200', _dark: 'gray.600' },
          },
        },
        // Text colors
        fg: {
          default: {
            value: { _light: 'gray.900', _dark: 'gray.100' },
          },
          muted: {
            value: { _light: 'gray.600', _dark: 'gray.400' },
          },
          subtle: {
            value: { _light: 'gray.500', _dark: 'gray.500' },
          },
          contrast: {
            value: { _light: 'white', _dark: 'gray.900' },
          },
        },
        // Border colors
        border: {
          default: {
            value: { _light: 'gray.200', _dark: 'gray.700' },
          },
          subtle: {
            value: { _light: 'gray.100', _dark: 'gray.800' },
          },
          muted: {
            value: { _light: 'gray.300', _dark: 'gray.600' },
          },
        },
        // Hero specific colors
        hero: {
          bg: {
            value: { _light: '#0A274E', _dark: 'gray.900' },
          },
          overlay: {
            value: { _light: 'rgba(10, 39, 78, 0.7)', _dark: 'rgba(17, 24, 39, 0.8)' },
          },
        },
        // Glassmorphism effects
        glass: {
          bg: {
            value: { _light: 'rgba(255, 255, 255, 0.1)', _dark: 'rgba(17, 24, 39, 0.2)' },
          },
          border: {
            value: { _light: 'rgba(255, 255, 255, 0.2)', _dark: 'rgba(156, 163, 175, 0.1)' },
          },
          shadow: {
            value: {
              _light: '0 8px 32px rgba(0, 0, 0, 0.12)',
              _dark: '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
          },
        },
        // Enhanced contrast colors
        surface: {
          elevated: {
            value: { _light: 'white', _dark: 'gray.800' },
          },
          overlay: {
            value: { _light: 'rgba(255, 255, 255, 0.95)', _dark: 'rgba(31, 41, 55, 0.95)' },
          },
        },
      },
    },
  },
});

export const themeSystem = createSystem(defaultConfig, config);

export default themeSystem;
