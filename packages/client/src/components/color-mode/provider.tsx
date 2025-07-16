import { ThemeProvider, ThemeProviderProps } from 'next-themes';

export type ColorModeProviderProps = ThemeProviderProps;

export const ColorModeProvider: React.FC<ColorModeProviderProps> = (props) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      themes={['light', 'dark']}
      disableTransitionOnChange
      {...props}
    />
  );
};
