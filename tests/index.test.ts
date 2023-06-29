// File generated from our OpenAPI spec by Stainless.

import { Headers } from '~/core';
import Anthropic from '../index';

describe('instantiate client', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };

    console.warn = jest.fn();
  });

  afterEach(() => {
    process.env = env;
  });

  test('defaultHeaders are passed through', () => {
    const client = new Anthropic({ defaultHeaders: { 'X-My-Default-Header': '2' }, apiKey: 'my api key' });

    const { req } = client.buildRequest({ path: '/foo', method: 'post' });
    expect((req.headers as Headers)['X-My-Default-Header']).toEqual('2');
  });

  describe('baseUrl', () => {
    test('trailing slash', () => {
      const client = new Anthropic({ baseURL: 'http://localhost:5000/custom/path/', apiKey: 'my api key' });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });

    test('no trailing slash', () => {
      const client = new Anthropic({ baseURL: 'http://localhost:5000/custom/path', apiKey: 'my api key' });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });
  });

  test('maxRetries option is correctly set', () => {
    const client = new Anthropic({ maxRetries: 1, apiKey: 'my api key' });
    expect(client.maxRetries).toEqual(1);

    // default
    const client2 = new Anthropic({ apiKey: 'my api key' });
    expect(client2.maxRetries).toEqual(2);
  });

  test('with minimal arguments', () => {
    // set API Key via env var
    process.env['ANTHROPIC_API_KEY'] = 'env var api key';
    const client = new Anthropic();
    expect(client.apiKey).toBe('env var api key');
  });

  test('with apiKey argument', () => {
    process.env['ANTHROPIC_API_KEY'] = 'env var api key';

    const client = new Anthropic({ apiKey: 'another api key' });
    expect(client.apiKey).toBe('another api key');
  });

  test('with options argument', () => {
    process.env['ANTHROPIC_API_KEY'] = 'env var api key';

    // apiKey and custom options
    const client = new Anthropic({ apiKey: 'my api key', authToken: 'my-auth-token' });
    expect(client.apiKey).toBe('my api key');
  });

  test('with disabled authentication', () => {
    process.env['ANTHROPIC_API_KEY'] = 'env var api key';
    const client = new Anthropic({ apiKey: null, authToken: 'my-auth-token' });
    expect(client.apiKey).toBeNull();
  });
});