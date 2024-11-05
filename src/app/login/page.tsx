"use client";

import {useState, FormEvent} from 'react';
import LocalStorageKit from '@/utils/localStorageKit';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';


export default function LoginPage() {
  return (
    <AuthForm />
  );
}