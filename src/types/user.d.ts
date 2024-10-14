type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

type UserData = Omit<User, "id" | "isAdmin">;