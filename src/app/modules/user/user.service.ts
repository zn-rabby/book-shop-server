import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import User from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';

const getAllUsers = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUsers = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const userRoleUpdate = async (userId: string, payload: Partial<IUser>) => {
  // check user is exits
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  // if (user?.role !== 'user') {
  //   throw new AppError(403, 'Only user roles can be blocked!');
  // }
  if (user?.role !== 'user') {
    throw new AppError(403, 'Only user roles can be changed!');
  }

  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const userStatusUpdate = async (userId: string, payload: Partial<IUser>) => {
  // check user is exits
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  if (user?.role !== 'user') {
    throw new AppError(403, 'Only user status can be blocked!');
  }

  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const userUpdate = async (userId: string, payload: Partial<IUser>) => {
  // check user is exits
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getAllUsers,
  getSingleUsers,
  userRoleUpdate,
  userStatusUpdate,
  userUpdate,
  deleteUser,
};
