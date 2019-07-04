
declare global {
  namespace NodeJS {
    interface Global {
      AbortController: jest.Mock<AbortController>
      _AbortControllerInstances: jest.Mock<AbortController>[]
    }
  }
}