import { useParams } from 'react-router-dom';

const useParamsNum = (...paramKeys:Array<string>) => {
  const paramsObj = useParams();
  const result:Record<string, number> = {};

  paramKeys.forEach((key:string) => {
    const numberValue = Number(paramsObj[key]);
    result[key] = numberValue;
  });

  return result;
};

export default useParamsNum;
