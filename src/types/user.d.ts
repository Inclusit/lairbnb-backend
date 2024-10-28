//src/types/user.d.ts
import { User } from "@prisma/client";

type UserData = Omit<User, "id" | "isAdmin">;

type UserRegistrationData = Omit<User, "id" | "isAdmin" | "createdAt" | "updatedAt">;

type UserLoginData = Pick<User, "email" | "password">;

type UserUpdateData = Omit<User, "id" | "isAdmin" | "createdAt" | "updatedAt">;

type SafeUser = Omit<User, "password">;