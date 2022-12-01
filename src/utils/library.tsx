import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export const upperFirstChar = (yourString: string) => {
  let newString = yourString.split('_').join(' ');
  newString = newString.toLowerCase().charAt(0).toUpperCase() + newString.toLowerCase().slice(1);

  return newString;
};

export const generateNumberArray = (length: number) =>
  Array.from({ length: length }, (_, i) => i + 1);

export const camelCaseObjKeys = (data: any) => {
  if (isArray(data)) {
    const newDataArr: any[] = data.map((item) => camelCaseObjKeys(item));
    return newDataArr;
  }

  if (isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = camelCase(key);
      newData[newKey] = camelCaseObjKeys(dataCopy[key]);
    });
    return newData;
  }

  return data;
};

export const snakeCaseObjKeys = (data:any) => {
  if (isArray(data)) {
    const newDataArr: any[] = data.map((item) => snakeCaseObjKeys(item));
    return newDataArr;
  }

  if (isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = snakeCase(key);
      newData[newKey] = snakeCaseObjKeys(dataCopy[key]);
    });
    return newData;
  }

  return data;
};
