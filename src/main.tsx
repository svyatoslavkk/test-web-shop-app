import { createRoot, type Root } from "react-dom/client";
import { store } from "./store/store";
import { setConfig } from "./store/config/slice";
import App from "./App";
import type { AppConfig } from "./types";
import "./index.css";
import { AllProviders } from "./providers";
export class ShopApp {
  private root: Root | null = null;
  private container: HTMLElement | null = null;

  start(config: AppConfig = {}) {
    store.dispatch(setConfig(config));
    this.container = document.getElementById("app-root");

    if (!this.container) {
      console.error('Container with id "app-root" not found');
      return;
    }

    this.root = createRoot(this.container);
    this.root.render(
      <AllProviders>
        <App />
      </AllProviders>
    );
  }

  stop() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

declare global {
  interface Window {
    App: typeof ShopApp;
  }
}

window.App = ShopApp;

export {};
