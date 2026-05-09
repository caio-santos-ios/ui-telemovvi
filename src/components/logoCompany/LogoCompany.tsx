"use cliente";

import { userLoggedAtom } from "@/jotai/auth/auth.jotai";
import { useAtom } from "jotai";

type TProp = {
    width: number;
    height: number
}

export const CompanyLogo = ({width, height}: TProp) => {
    const [userLogged] = useAtom(userLoggedAtom); 

    return (
        <div className="flex justify-center items-center w-full m-auto">
            {
                userLogged.companyPhoto ?
                <img style={{width: `${width}px`, height: `${height}px`}} className="w-full h-full object-cover" src={userLogged.companyPhoto} alt="logo da empresa" />
                :
                <div className="border border-dashed border-(--erp-primary-color) p-3 text-(--erp-primary-color)">Logo da Empresa</div>
            }
        </div>
    )
}