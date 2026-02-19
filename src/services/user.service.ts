import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const registerUser = async (userData: any) => {
  const { name, email, password, address } = userData;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
  });

  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user.id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (userData: any) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password!))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const getUserProfile = async (userId: number) => {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateUserProfile = async (userId: number, userData: Partial<User>) => {
    const user = await User.findByPk(userId);

    if (user) {
        user.name = userData.name || user.name;
        user.email = userData.email || user.email;
        user.address = userData.address || user.address;
        if (userData.password) {
            user.password = userData.password;
        }
        const updatedUser = await user.save();
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            token: generateToken(updatedUser.id),
        };
    } else {
        throw new Error('User not found');
    }
};
