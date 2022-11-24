import { faker } from '@faker-js/faker';
import { EMAIL_REGEX, NAME_REGEX } from '../form';

describe('valid val', () => {
  test('valid email', () => {
    const emailList = ['trang+3901@bot-it.ai', 'Loc@bot-it.ai', 'ducloc20810@gmail.com', faker.internet.email()];

    emailList.forEach((email) => expect(EMAIL_REGEX.test(email)).toBe(true));
  });

  test('valid name', () => {
    const nameList = ['ducloc', 'tranducloc', 'tran duc loc', 'John'];

    nameList.forEach((name) => expect(NAME_REGEX.test(name)).toBe(true));
  });
});

describe('invalid value', () => {
  test('invalid email', () => {
    const emailList = ['emailWithoutDomain', 'emailWithoutSymbol'];

    emailList.forEach((email) => expect(EMAIL_REGEX.test(email)).toBe(false));
  });

  test('invalid name', () => {
    const nameList = ['Tiếng Việt', '2 spaces  between'];

    nameList.forEach((name) => expect(NAME_REGEX.test(name)).toBe(false));
  });
});
