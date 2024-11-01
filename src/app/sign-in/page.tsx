"use client";

import {useState, FormEvent} from 'react';
import LocalStorageKit from '@/utils/localStorageKit';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);    
  

  try {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email, password }),
        });

        if(!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        
        const token = data.token;

        LocalStorageKit.set("@library/token", token);


  } catch (error:any) {

    console.error('Failed to login', error);

  } finally {
    setLoading(false);
    window.location.href = '/';
  }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='flex justify-between'>
      <Button type="submit">Submit</Button>
    <Link href="/sign-up">
    <Button>Sign Up</Button>
    </Link> 
    </div>
      
    </form>
  );
}