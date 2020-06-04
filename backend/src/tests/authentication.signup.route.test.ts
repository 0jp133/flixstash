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
});

describe('POST /api/authentication/signup tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const users = helper.initialUsers.map((u) => new User(u));
    const promises = users.map((u) => u.save());
    await Promise.all(promises);
  });

  test('Request with valid payload return 201. User is in database.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith@email.com',
      password: 'secret',
    };

    await api.post('/api/authentication/signup').send(newUser).expect(201);

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const addedUser = usersAtEnd.find((u) => u.username === newUser.username);

    expect(addedUser).toBeDefined();

    if (addedUser) {
      expect(addedUser.email).toBe(newUser.email);
      expect(addedUser.passwordHash).toBeDefined();
      expect(addedUser.createdAt).toBeDefined();
      //expect(addedUser.updatedAt).toBeDefined();
      expect(addedUser).toBeDefined();
    }
  });

  test('Request with empty payload return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    await api
      .post('/api/authentication/signup')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('username');
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('required');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with missing username return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      email: 'jsmith@email.com',
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('username');
        expect(res.body.error).toContain('required');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with missing email return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('required');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with missing password return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith@email.com',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('required');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with empty username return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: '',
      email: 'jsmith@email.com',
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('username');
        expect(res.body.error).toContain('empty');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with empty email return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: '',
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('empty');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with empty password return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith@email.com',
      password: '',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('empty');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with invalid email return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith',
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('valid');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with password with less than 6 characters return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith@email.com',
      password: '12345',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('password');
        expect(res.body.error).toContain('length');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with email already found in database return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: helper.initialUsers[0].email,
      password: 'secret',
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('email');
        expect(res.body.error).toContain('exists');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('Request with extra data in the payload return 400.', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: 'John Smith',
      email: 'jsmith@email.com',
      password: 'secret',
      uselessData: "hello"
    };

    await api
      .post('/api/authentication/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toContain('uselessData');
        expect(res.body.error).toContain('not allowed');
      });

    const usersAtEnd = await helper.getUsersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(async () => {
  mongoose.connection.close();
  await mongod.stop();
});
