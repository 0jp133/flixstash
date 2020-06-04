import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';

const api = supertest(app);

describe('General API tests', () => {
  test('Request with invalid json payload return 400.', async () => {
    await api.post('/api/authentication/login').send('{').expect(400);
  });

  test('Request to unknown endpoint return 404.', async () => {
    await api.post('/api/abc').expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
