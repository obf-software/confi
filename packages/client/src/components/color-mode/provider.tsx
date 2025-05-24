import { ThemeProvider, ThemeProviderProps } from 'next-themes';

export type ColorModeProviderProps = ThemeProviderProps;

export const ColorModeProvider: React.FC<ColorModeProviderProps> = (props) => {
  return (
    <ThemeProvider
      attribute='class'
      disableTransitionOnChange
      {...props}
    />
  );
};
