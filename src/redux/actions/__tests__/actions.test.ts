import { upperFirstChar } from 'utils/library';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as MessageActions from 'redux/actions/message.action';
import { handleAsyncAction } from '../utils';

describe('handleAsyncAction api return data', () => {
  const testType = 'fetch';

  const fetchSuccessUrl = 'http://localhost:3001/api/success';
  const fetchFailureUrl = 'http://localhost:3001/api/failure';
  const networkError = 'http://localhost:3001/api/networkError';
  const server = setupServer(
    rest.get(fetchSuccessUrl, (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        message: 'success',
      }),
    )),

    rest.get(fetchFailureUrl, (req, res, ctx) => res(
      ctx.status(401),
      ctx.json({
        message: 'failure',
      }),
    )),

    rest.get(networkError, (_, res) => res()),
  );

  const dispatch = jest.fn();

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetch success', async () => {
    const setMessageSpy = jest.spyOn(MessageActions, 'setMessage');

    const asyncFunc = () => handleAsyncAction(dispatch, testType, () => fetch(fetchSuccessUrl));

    const newType = upperFirstChar(testType);

    await expect(asyncFunc()).resolves.toEqual({ message: 'success' });

    expect(dispatch).toBeCalledTimes(2);
    expect(setMessageSpy).toBeCalledTimes(1);
    expect(setMessageSpy).toBeCalledWith(expect.objectContaining({
      message: `${newType} successfully`,
      status: 200,
    }));
    setMessageSpy.mockRestore();
  });

  test('fetch failure', async () => {
    const setMessageSpy = jest.spyOn(MessageActions, 'setMessage');

    const asyncFunc = () => handleAsyncAction(dispatch, testType, () => fetch(fetchFailureUrl));

    await expect(asyncFunc()).rejects.toBe('failure');

    expect(dispatch).toBeCalledTimes(1);
    expect(setMessageSpy).toBeCalledTimes(1);
    expect(setMessageSpy).toBeCalledWith(expect.objectContaining({
      status: 401,
      error: { message: 'failure' },
    }));
    setMessageSpy.mockRestore();
  });
});
