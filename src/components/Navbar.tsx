'use client';
import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-xl font-bold mb-4 md:mb-0" href="/">
          Anonymous message
        </a>
        <div className="flex items-center justify-end">
          <ModeToggle />
          {session ? (
            <div className="ml-4">
              <span className="mr-4">
                Welcome, {user?.username || user?.email}
              </span>
              <Button className="w-full md:w-auto" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto ml-4">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
