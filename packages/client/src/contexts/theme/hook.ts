import * as NextTheme from 'next-themes';
import { ColorMode } from './context';

export interface UseThemeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useTheme(): UseThemeReturn {
  const { resolvedTheme, setTheme } = NextTheme.useTheme();

  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return {
    colorMode: (resolvedTheme || 'light') as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T, K>(light: T, dark: K): T | K {
  const { colorMode } = useTheme();
  return colorMode === 'dark' ? dark : light;
}
