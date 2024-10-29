(window as Window).global = window;
(window as Window).process = {
  env: { DEBUG: undefined },
};
