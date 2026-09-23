"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ProductsPage() {
  const { authenticated, checking } = useAuth();

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            Product Admin
          </h1>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Products
        </h2>

        <p className="mt-2 text-gray-500">
          Product management dashboard
        </p>
      </div>
    </main>
  );
}