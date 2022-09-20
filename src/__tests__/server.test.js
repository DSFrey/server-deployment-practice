'use strict';

const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);

describe('API Server', () => {
  test('handle invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  test('handle errors', async () => {
    const response = await request.get('/oof');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/oof');
    expect(response.body.message).toEqual('this is a bad route');

  });
  test('handle root path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World');

  });
});
