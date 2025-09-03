import * as NextTheme from 'next-themes';

export const ThemeProvider: React.FC<NextTheme.ThemeProviderProps> = (props) => {
  return (
    <NextTheme.ThemeProvider
      attribute='class'
      defaultTheme='light'
      themes={['light', 'dark']}
      disableTransitionOnChange
      {...props}
    />
  );
};
