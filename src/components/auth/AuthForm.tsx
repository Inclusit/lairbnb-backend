"use client";

import { useState, FormEvent } from 'react';
import LocalStorageKit from '@/utils/localStorageKit';
import { Button } from '@/components/ui/button';
import { UserLoginData, UserRegistrationData, SafeUser } from '@/types/user';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormTypeToggle = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = formType === "login" ? '/api/auth/login' : '/api/auth/register';
      const requestBody: UserLoginData | UserRegistrationData = formType === "login" 
        ? { email, password }
        : { email, password, firstName, lastName }; 

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(formType === "login" ? 'Failed to login' : 'Failed to register');
      }

      const data: SafeUser & { token: string } = await response.json();
      LocalStorageKit.set("@library/token", data.token);
      
      router.push('/'); 

    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">{formType === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        {formType === "register" && (
          <>
          <div>
          <label className="block text-lg font-medium">Förnamn</label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input"
            />
            </div>
            <div>
            <label className="block text-lg font-medium">Efternamn</label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input"
            />
            </div>
          </>
          
        )}
        <div>
        <label htmlFor="email" className="block text-lg font-medium">E-post:</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        </div>
        <div>
        <label htmlFor="password" className="block text-lg font-medium">Lösenord:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : formType === "login" ? "Login" : "Register"}
        </Button>
      </form>
      <p className="toggle-text">
        {formType === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
        <Button onClick={handleFormTypeToggle} className="toggle-button">
          {formType === "login" ? "Register" : "Login"}
        </Button>
      </p>
    </div>
  );
}
