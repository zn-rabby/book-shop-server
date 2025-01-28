import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<IUser>(
  {
    // _id: Types.ObjectId,
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'block'],
        message: '{VALUE} is not valid, please provide a valid status',
      },
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email: email }).select('+password');
};

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};
// function excludeDeleteQuery(next: Function) {
//   this.where({ isDeleted: { $ne: true } });
//   next();
// }
// function excludeDeleteAggregation(next: Function) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// }

// userSchema.pre('find', excludeDeleteQuery);
// userSchema.pre('findOne', excludeDeleteQuery);
// userSchema.pre('aggregate', excludeDeleteAggregation);

const User = model<IUser, UserModel>('User', userSchema);
export default User;

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
