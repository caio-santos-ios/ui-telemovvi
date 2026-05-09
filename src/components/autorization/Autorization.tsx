"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { userAdmin, userLoggedAtom } from "@/jotai/auth/auth.jotai";
import { ResetUserLogged, TUserLogged } from "@/types/master-data/user/user.type";
import { removeLocalStorage } from "@/service/config.service";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { decodedToken } from "@/utils/auth.util";

export const Autorization = () => {
    const [_, setIsLoading] = useAtom(loadingAtom);
    const [__, setUserLogged] = useAtom(userLoggedAtom);
    const [___, setIsAdmin] = useAtom(userAdmin);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const localToken = localStorage.getItem(`${process.env.NEXT_PUBLIC_ENVIRONMENT}TelemovviToken`);
        const token = localToken ? localToken : "";

        if(!token) {
            setUserLogged(ResetUserLogged);
            setIsLoading(false);

            if(!["reset-password", "signup", "new-code-confirm", "confirm-account"].includes(pathname.split("/")[1])) {
                router.push("/");
                removeLocalStorage();
                setIsAdmin(false);
            };
        } else {
            const user: TUserLogged = decodedToken(token);
            setUserLogged(user);

            if(user.admin || user.master) {
                if(pathname == "/" || pathname == "/reset-password") {
                    router.push("/dashboard");
                };
            } else {
                if(pathname == "/" || pathname == "/reset-password") {
                    router.push("/master-data/profile");
                };
            };
        };
    }, [pathname, router]);

    return <></>
}