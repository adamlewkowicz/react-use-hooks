
global.fetch = require('node-fetch');

global.IntersectionObserver = jest.fn().mockImplementation(() => {
  return {
    disconnect: jest.fn(),
    observe: jest.fn()
  }
});