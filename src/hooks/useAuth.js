"use client"

import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useAuth(){
    const router = useRouter();

    const [checking, setChecking] = useState(true);

    const [authenticated, setauthenticated] = useState(false);

    useEffect(() => {
        const loggedIn = isAuthenticated();

        if(!loggedIn) {
            router.replace("/login");
            return;
        }

        setauthenticated(true);
        setChecking(false);
    }, [router]);

    return {authenticated,checking}
}