const _global = global as any;
const _AbortController = _global.AbortController;


export function mockAbortController() {
  global._AbortControllerInstances = [];
  _global.AbortController = jest.fn().mockImplementation(() => {

    const signal = {
      aborted: false,
      onabort: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }

    const abort = jest.fn().mockImplementation(() => {
      signal.aborted = true;
    });

    const controller = { signal, abort };

    _global._AbortControllerInstances.push(controller);

    return controller;
  });
}

export function cleanAbortControllerMock() {
  _global.AbortController = _AbortController;
}