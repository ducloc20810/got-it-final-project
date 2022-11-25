import { camelCaseObjKeys, generateNumberArray, snakeCaseObjKeys, upperFirstChar } from 'utils/library';

const hasSamePropsAndValues = (obj1:Record<string, unknown>|Array<unknown>, obj2:Record<string, unknown>|Array<unknown>) => JSON.stringify(obj1) === JSON.stringify(obj2);

test('upperFirstChar function', () => {
  const str = 'hello';

  expect(upperFirstChar(str)).toBe('Hello');
});

test('generateNumberArray function', () => {
  const length = 10;

  const arr = generateNumberArray(length);

  expect(arr.length).toBe(length);

  generateNumberArray(length).forEach((item, index) => expect(item).toBe(index + 1));
});

describe('convert snake case to camel case function', () => {
  test('data is not array and object', () => {
    const list = [10, 'abcd', true, null, undefined];

    list.forEach((item) => expect(camelCaseObjKeys(item)).toBe(item));
  });

  test('data is an object', () => {
    const data = {
      total_items: 10,
      data_name: 'abc',
    };

    const expectedResult = {
      totalItems: 10,
      dataName: 'abc',
    };

    const camelCaseData = camelCaseObjKeys(data);

    expect(hasSamePropsAndValues(camelCaseData, expectedResult)).toBe(true);
  });

  test('data is an array', () => {
    const data = [
      1, 'abc', 'bcd', true, null, undefined,
    ];

    const camelCaseData = camelCaseObjKeys(data);
    expect(hasSamePropsAndValues(camelCaseData, data)).toBe(true);
  });

  test('data is a nested object', () => {
    const nestedObject = {
      name: 'Loc',
      school: {
        school_name: 'University of Science',
        school_year: 2018,
      },
      subjects: [
        'Math', 'English',
      ],
    };

    const expectedResult = {
      name: 'Loc',
      school: {
        schoolName: 'University of Science',
        schoolYear: 2018,
      },
      subjects: [
        'Math', 'English',
      ],
    };

    const camelCaseData = camelCaseObjKeys(nestedObject);
    expect(hasSamePropsAndValues(camelCaseData, expectedResult)).toBe(true);
  });

  test('data is a nested array object', () => {
    const nestedObjectArray = [
      {
        school_name: 'University of Science',
        school_year: 2018,
        school_students: ['Loc', 'Khoa', 'Huy'],
      },

      {
        school_name: 'University of Social',
        school_year: 2019,
        school_students: ['Loc', 'Khoa', 'Huy'],

      },
    ];

    const expectedResult = [
      {
        schoolName: 'University of Science',
        schoolYear: 2018,
        schoolStudents: ['Loc', 'Khoa', 'Huy'],

      },

      {
        schoolName: 'University of Social',
        schoolYear: 2019,
        schoolStudents: ['Loc', 'Khoa', 'Huy'],

      },
    ];

    const camelCaseData = camelCaseObjKeys(nestedObjectArray);

    expect(hasSamePropsAndValues(camelCaseData, expectedResult)).toBe(true);
  });
});

describe('convert camel case to snake case function', () => {
  test('data is not array and object', () => {
    const list = [10, 'abcd', true, null, undefined];

    list.forEach((item) => expect(camelCaseObjKeys(item)).toBe(item));
  });

  test('data is an object', () => {
    const data = {
      totalItems: 10,
      dataName: 'abc',
    };

    const expectedResult = {
      total_items: 10,
      data_name: 'abc',
    };

    const snakeCaseData = snakeCaseObjKeys(data);

    expect(hasSamePropsAndValues(snakeCaseData, expectedResult)).toBe(true);
  });

  test('data is an array', () => {
    const data = [
      1, 'abc', 'bcd', true, null, undefined,
    ];

    const snakeCaseData = snakeCaseObjKeys(data);
    expect(hasSamePropsAndValues(snakeCaseData, data)).toBe(true);
  });

  test('data is a nested object', () => {
    const nestedObject = {
      name: 'Loc',
      school: {
        schoolName: 'University of Science',
        schoolYear: 2018,
      },
      subjects: [
        'Math', 'English',
      ],
    };

    const expectedResult = {
      name: 'Loc',
      school: {
        school_name: 'University of Science',
        school_year: 2018,
      },
      subjects: [
        'Math', 'English',
      ],
    };

    const snakeCaseData = snakeCaseObjKeys(nestedObject);
    expect(hasSamePropsAndValues(snakeCaseData, expectedResult)).toBe(true);
  });

  test('data is a nested array object', () => {
    const nestedObjectArray = [
      {
        schoolName: 'University of Science',
        schoolYear: 2018,
        schoolStudents: ['Loc', 'Khoa', 'Huy'],
      },

      {
        schoolName: 'University of Social',
        schoolYear: 2019,
        schoolStudents: ['Loc', 'Khoa', 'Huy'],

      },
    ];

    const expectedResult = [
      {
        school_name: 'University of Science',
        school_year: 2018,
        school_students: ['Loc', 'Khoa', 'Huy'],

      },

      {
        school_name: 'University of Social',
        school_year: 2019,
        school_students: ['Loc', 'Khoa', 'Huy'],

      },
    ];

    const snakeCaseData = snakeCaseObjKeys(nestedObjectArray);

    expect(hasSamePropsAndValues(snakeCaseData, expectedResult)).toBe(true);
  });
});
