"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { SafeUser } from "@/types/user";

import LocalStorageKit from "@/utils/localStorageKit";
import { User } from "@prisma/client";

type OnComplete = (response?: any) => void;
type OnError = (error?: any) => void;

// default state
type UserContextState = {
  token: string | null;
  user: SafeUser | null;
};

const defaultState: UserContextState = {
  token: null,
  user: null,
};

// context initator constructor
const UserContext = createContext<Partial<UserContextState>>(defaultState);

// provider
function UserProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<typeof defaultState.token>(
    defaultState.token
  );
  const [user, setUser] = useState<typeof defaultState.user>(defaultState.user);

  useEffect(() => {
    if (!token) {
      let _token = LocalStorageKit.get("@library/token");
      if (_token) {
        setToken(_token);
        return;
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();

    // Event listener for storage changes
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchUser = async () => {
    console.log("Fetching user...");
    try {
      const token = LocalStorageKit.get("@library/token");
      console.log("Token from localStorage:", token); // Kontrollera om token hittas

      if (!token) {
        console.log("No token found. Setting user to null.");
        setUser(null);
        return;
      }

      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetch response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data: User = await response.json();
      console.log("Fetched user data:", data); // Logga användardata

      setUser(data);
    } catch (error: any) {
      console.warn("Error: Failed to fetch user", error.message);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// use hook
function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("'useUser' used outside of provider");
  }
  return user as UserContextState;
}

export { UserProvider, useUser };
