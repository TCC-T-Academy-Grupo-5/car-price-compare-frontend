export {};

declare global {
  interface Window {
    global: Window;
    process: {
      env: {
        DEBUG?: string | undefined;
      };
    };
  }
}
