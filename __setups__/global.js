
global.fetch = require('node-fetch');

global.IntersectionObserver = jest.fn().mockImplementation(() => {
  return {
    disconnect: jest.fn(),
    observe: jest.fn()
  }
});

// global.AbortController = jest.fn().mockImplementation(() => {
//   return {
//     signal: {
//       aborted: false,
//       onabort: jest.fn(),
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn()
//     },
//     abort: jest.fn()
//   }
// });