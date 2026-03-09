import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const registerUser = async (userData: any) => {
  const { firstName, lastName, email, password, phone, address, city, pincode } = userData;
  const userExists = await User.findOne({ where: { email: email?.toLowerCase() } });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    city,
    pincode,
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    pincode: user.pincode,
    token: generateToken(user.id),
  };
};

export const loginUser = async (userData: any) => {
  const { email, password } = userData;
  const user = await User.scope('withPassword').findOne({ where: { email: email?.toLowerCase() } });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      pincode: user.pincode,
      token: generateToken(user.id),
    };
  }

  throw new Error('Invalid credentials');
};

export const getUserProfile = async (userId: string | number) => {
  const user = await User.findByPk(Number(userId), {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserProfile = async (userId: string | number, userData: any) => {
  const user = await User.scope('withPassword').findByPk(Number(userId));

  if (!user) {
    throw new Error('User not found');
  }

  user.firstName = userData.firstName || user.firstName;
  user.lastName = userData.lastName || user.lastName;
  user.email = userData.email || user.email;
  user.phone = userData.phone || user.phone;
  user.address = userData.address || user.address;
  user.city = userData.city || user.city;
  user.pincode = userData.pincode || user.pincode;
  if (userData.password) user.password = userData.password;

  const updatedUser = await user.save();
  return {
    id: updatedUser.id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    phone: updatedUser.phone,
    address: updatedUser.address,
    city: updatedUser.city,
    pincode: updatedUser.pincode,
    token: generateToken(updatedUser.id),
  };
};
