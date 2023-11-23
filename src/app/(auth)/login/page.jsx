'use client';
import IconGoogle from "@/components/icons/IconGoogle";
import Link from "next/link";
import {useState} from "react";
import {signIn} from "next-auth/react";
import toast, {Toaster} from 'react-hot-toast';
import {redirect, useRouter} from "next/navigation";


export default function LoginPage() {
  // router
  const router = useRouter();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // Handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault()
    // result object from next-auth
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',

    });
    if (result.error) {
      if (result.error === 'Wrong password') {
        setPassword('');
      }
      if (result.error === 'No user registered with such email') {
        setPassword('');
      }
      toast.error(result.error);
    } else {
      // Set success toast and redirect to home page
      toast.success('Successfully logged in!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }

  async function handleGoogleLogin() {
    const result = await signIn('google', {
      callbackUrl: '/',
      redirect: false,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      // Set success toast and redirect to home page
      toast.success('Successfully logged in!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }

  return (
    <section className={"min-h-[90vh] flex justify-center items-center"}>
      <Toaster/>
      <div className="max-w-sm mx-auto flex flex-col justify-center items-center gap-6 py-10">
        <h1 className="text-primary text-2xl font-semibold">
          Log in
        </h1>
        <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
            className="bg-gray-100 border border-primary focus:border-primary-dark rounded-md p-4 px-8 text-lg focus:outline-none focus:ring focus:ring-primary-light transition duration-200"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-gray-100 border border-primary focus:border-primary-dark rounded-md p-4 text-lg focus:outline-none focus:ring focus:ring-primary-light transition duration-200"
          />
          <button
            onClick={handleFormSubmit}
            className="bg-primary hover:bg-primary-dark text-white text-lg rounded-md p-4 transition duration-200"
          >
            Log in
          </button>
          <div className="flex items-center justify-center gap-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="text-gray-500 text-sm">OR</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={() => signIn('google')}
            className="flex items-center justify-center gap-2 border border-primary rounded-lg py-3 px-4 hover:bg-primary hover:text-white hover:border-transparent transition duration-200 text-lg">
            <IconGoogle/>
            Log in with Google
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Not yet registered?
            <Link href="/register" className="text-primary ml-2 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}