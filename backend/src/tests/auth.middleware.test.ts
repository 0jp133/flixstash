import supertest from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { User } from '../models/user.model';
import { helper } from './testHelper';
import { auth } from '../middlewares/auth';
import { authenticationRouter } from '../routes/authentication.route';
import { HttpStatusCode } from '../types/http';

// Create a minimal Express app to test the auth middleware.
const secureRouter = express.Router();
secureRouter.get('/', auth, (req, res) => {
  expect(req.user).toBeDefined();
  expect(req.user.username).toBe(helper.initialUsers[1].username);
  expect(req.user.email).toBe(helper.initialUsers[1].email);
  res.status(HttpStatusCode.Ok).end();
});
const testApp = express();
testApp.use(express.json());
testApp.use('/api/secure', secureRouter);
testApp.use('/api/authentication', authenticationRouter);

const api = supertest(testApp);

let mongod: MongoMemoryServer;
let token: string;

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

  const loginInfo = {
    email: helper.initialUsers[1].email,
    password: helper.initialUsersPassword[1],
  };

  await api
    .post('/api/authentication/login')
    .send(loginInfo)
    .then((res) => {
      token = res.body.token;
    });
});

describe('API auth tests', () => {
  test('Request with valid token to secure route return 200.', async () => {
    await api
      .get('/api/secure')
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  test('Request with missing token to secure route return 401.', async () => {
    await api
      .get('/api/secure')
      .expect(401)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('Token');
        expect(res.body.error).toContain('missing');
      });
  });

  test('Request with malformed token to secure route return 401.', async () => {
    await api
      .get('/api/secure')
      .set('Authorization', 'bearer thisIsNotAValidToken')
      .expect(401)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('jwt malformed');
      });
  });
});

afterAll(async () => {
  mongoose.connection.close();
  await mongod.stop();
});
