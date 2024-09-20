import { AppDataSource } from "../config/db";
import { User } from "../entities/User";

export const createUser = async (name: string, email: string, imageUrl?: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name, email, imageUrl });
  await userRepo.save(user);
  return user;
};

export const getAllUsers = async () => {
  return await AppDataSource.getRepository(User).find();
};

export const getUserById = async (id: number) => {
  return await AppDataSource.getRepository(User).findOneBy({ id });
};

export const updateUser = async (id: number, updates: Partial<User>) => {
  const userRepo = AppDataSource.getRepository(User);
  
  // Fetch the existing user to ensure it exists
  const user = await userRepo.findOneBy({ id });
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  // Update the fields if provided
  if (updates.name) user.name = updates.name;
  if (updates.email) user.email = updates.email;
  if (updates.imageUrl) user.imageUrl = updates.imageUrl;

  // Save the updated user
  await userRepo.save(user);
  return user;
};


export const deleteUser = async (id: number) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo.delete(id);
};
