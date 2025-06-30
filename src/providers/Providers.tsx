import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { store } from "../store/store";
import type { ReactNode } from "react";

interface AllProvidersProps {
  children: ReactNode;
}

export const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};
