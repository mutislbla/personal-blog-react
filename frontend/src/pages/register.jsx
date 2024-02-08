import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/fetch";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !full_name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: `fill username and password`,
      });
    }
    try {
      await register(full_name, username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome to WordWander
          </h1>
          <p className="mt-4 text-gray-500">
            Let's get started with registration.
          </p>
        </div>
        <form
          onSubmit={handleSignUp}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter full name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Have an account?
              <a className="underline" href="/">
                Sign in
              </a>
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
