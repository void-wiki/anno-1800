import { helloWorld } from './index';

describe('index.ts', () => {
  test('verify variable helloWorld', () => {
    expect(helloWorld).toEqual('Hello World!');
  });
});
