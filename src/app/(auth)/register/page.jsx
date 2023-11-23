'use client';
import IconGoogle from "../../../components/icons/IconGoogle";
import {useState} from "react";
import toast, {Toaster} from 'react-hot-toast';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";



export default function RegisterPage() {

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    toast.loading('Creating user...');

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"},
      });
      toast.dismiss(); // Dismiss the loading toast

      if (!response.ok) {
        const responseData = await response.json();
        toast.error(responseData.error);
        // Additional logic for handling user registration failure

      } else {
        toast.success('User created successfully!');
        // Additional logic for handling user registration success

        const loginResponse = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (loginResponse.error) {
          toast.error(loginResponse.error);
        } else {
          router.push('/'); // Redirect to home or desired page
        }


      }
    } catch (error) {
      toast.dismiss();
      toast.error('An error occurred during registration.');
    }
  }


  return (
    <section className={"min-h-[90vh] flex justify-center items-center"}>
      <Toaster />
      <div className="max-w-sm mx-auto flex flex-col justify-center items-center gap-6 py-10">
        <h1 className="text-primary text-2xl font-semibold">
          Sign Up
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
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white text-lg rounded-md p-4 transition duration-200"
          >
            Sign up
          </button>
          <div className="flex items-center justify-center gap-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="text-gray-500 text-sm">OR</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            className="flex items-center justify-center gap-2 border border-primary rounded-lg py-3 px-4 hover:bg-primary hover:text-white hover:border-transparent transition duration-200 text-lg">
            <IconGoogle/>
            Sign Up with Google
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already registered?
            <Link href="/login" className="text-primary ml-2 hover:underline">
                Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}