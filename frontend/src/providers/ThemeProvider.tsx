import { type ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemeProvider
			attribute="data-theme"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
			themes={['dark', 'light']}
		>
			{children}
		</NextThemeProvider>
	);
}
