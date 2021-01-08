import { ZeroPrefixPipe } from './zero-prefix.pipe';

describe('ZeroPrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new ZeroPrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
