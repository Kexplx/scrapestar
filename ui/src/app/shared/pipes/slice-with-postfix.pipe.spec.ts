import { SliceWithPostfixPipe } from './slice-with-postfix.pipe';

let pipe: SliceWithPostfixPipe;
beforeEach(() => {
  pipe = new SliceWithPostfixPipe();
});

describe('#transform', () => {
  it('should slice the string and append postfix if length < text.length', () => {
    const textToSlice = 'ABCDEFG';

    const result = pipe.transform(textToSlice, 5);

    expect(result).toEqual('ABCDE...');
  });

  it('should not append a postfix if length > text.length', () => {
    const textToSlice = 'ABCDEFG';

    const result = pipe.transform(textToSlice, textToSlice.length);

    expect(result).toEqual(textToSlice);
  });

  it('should slice after 20 chars if no length was passed', () => {
    const textToSlice = 'ABCDEABCDEABCDEABCDEZ';

    const result = pipe.transform(textToSlice);

    expect(result).toEqual('ABCDEABCDEABCDEABCDE...');
  });
});
