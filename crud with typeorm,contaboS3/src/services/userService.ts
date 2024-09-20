import { AppDataSource } from "../config/db";
import { User } from "../entities/User";

// Create a new user
export const createUserService = async (name: string, email: string, imageUrl?: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name, email, imageUrl });
  await userRepo.save(user);
  return user;
};

// Get all users
export const getAllUsersService = async () => {
  return await AppDataSource.getRepository(User).find();
};

// Get a user by ID
export const getUserByIdService = async (id: number) => {
  return await AppDataSource.getRepository(User).findOneBy({ id });
};

// Update a user
export const updateUserService = async (id: number, updates: Partial<User>) => {
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

// Delete a user
export const deleteUserService = async (id: number) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo.delete(id);
};
