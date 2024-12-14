import { ThemeProvider as BaseThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <BaseThemeProvider attribute={"class"} defaultTheme="system">
      {children}
    </BaseThemeProvider>
  );
}
