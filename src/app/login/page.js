"use client";

import { useEffect, useState } from "react";
import { loginUser } from "@/services/auth.service.js";
import { isAuthenticated, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isAuthenticated()) {
        router.replace("/products")
    }
  }, [router])



  async function handleSubmit(event) {

    event.preventDefault();

    if(loading){
        return;
    }

    setError("")
    setLoading(true);

    try{
        const data = await loginUser(username, password);

        setToken(data.accessToken)

        router.push("/products")

        console.log(data);
        
    }catch(error){
        console.error(error);

        setError("Invalid username or Password.")
        
    }finally{
        setLoading(false);
    }
    
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Product Admin
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to manage your products.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-black">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            { loading ? "Signing in ..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}