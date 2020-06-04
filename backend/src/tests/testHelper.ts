import { User } from '../models/user.model';

const initialUsers = [
  {
    username: 'User1',
    email: 'user1@email.com',
    passwordHash:
      '$2a$10$W6zj5r6w290VVbFKQcJF3O4KHMma7BM1oMo8ll4RwhRAm1sIOCxQe', // password = secret1
  },
  {
    username: 'User2',
    email: 'user2@email.com',
    passwordHash:
      '$2a$10$mG88v64Rm.nL0X4cQes//O1pduiqNbfxUm.ypmAfjE/Jmg.a3ReYW', // password = secret2
  },
  {
    username: 'User3',
    email: 'user3@email.com',
    passwordHash:
      '$2a$10$SPJPHMNXU5h0n0WBlhL58eF4bEY1.JO7X7vxnNnM.HBtsVA7wdEXm', // password = secret3
  },
];

const initialUsersPassword = ['secret1', 'secret2', 'secret3'];

const getUsersInDb = async () => {
  const users = await User.find({});
  return users;
};

export const helper = { initialUsers, initialUsersPassword, getUsersInDb };
