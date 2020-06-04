import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import { User } from '../models/user.model';
import { helper } from './testHelper';

const api = supertest(app);
let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = new MongoMemoryServer();
  const uri = await mongod.getUri();

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = helper.initialUsers.map((u) => new User(u));
  const promises = users.map((u) => u.save());
  await Promise.all(promises);
});

describe('POST /api/authentication/login tests', () => {
  test('Request with valid payload return 200. Token and profile is in the response.', async () => {
    const loginInfo = {
      email: 'user2@email.com',
      password: 'secret2',
    };

    await api
      .post('/api/authentication/login')
      .send(loginInfo)
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBeDefined();
        expect(res.body.profile).toBeDefined();
        expect(res.body.profile.username).toBe('User2');
        expect(res.body.profile.email).toBe('user2@email.com');
      });
  });

  test('Request with invalid email return 401.', async () => {
    const loginInfo = {
      email: 'unknown@email.com',
      password: 'secret',
    };

    await api
      .post('/api/authentication/login')
      .send(loginInfo)
      .expect(401)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('Invalid email or password.');
      });
  });

  test('Request with invalid password return 401.', async () => {
    const loginInfo = {
      email: 'user2@email.com',
      password: 'wrong_password',
    };

    await api
      .post('/api/authentication/login')
      .send(loginInfo)
      .expect(401)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('Invalid email or password.');
      });
  });

  test('Request with empty payload return 400.', async () => {
    await api
      .post('/api/authentication/login')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('required');
      });
  });

  test('Request with missing email return 400.', async () => {
    const loginInfo = {
      password: 'secret',
    };

    await api
      .post('/api/authentication/login')
      .send(loginInfo)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('required');
      });
  });

  test('Request with missing password return 400.', async () => {
    const loginInfo = {
      email: 'user2@email.com',
    };

    await api
      .post('/api/authentication/login')
      .send(loginInfo)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('required');
      });
  });
});

afterAll(async () => {
  mongoose.connection.close();
  await mongod.stop();
});
