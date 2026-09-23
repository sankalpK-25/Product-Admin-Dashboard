"use client"

import { removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    function handleLogout(){
        removeToken();
        router.replace("/login");
    }

    return <button type="button" onClick={handleLogout} className="rounded-lg border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
        Logout
    </button>
}