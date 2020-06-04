/**
 * We use declaration merging to extend the Request interface from express.
 * This is needed since our auth middleware will append the user object to incoming request.
 */
declare namespace Express {
  export interface Request {
    user: import('../../models/user.model').IUserModel;
  }
}
