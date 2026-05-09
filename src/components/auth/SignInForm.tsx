"use client";

import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { api } from "@/service/api.service";
import { TSignIn } from "@/types/auth/signIn.type";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { onError, resolveResponse, saveLocalStorage } from "@/service/config.service";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { useAtom } from "jotai";
import { Logo } from "../logo/Logo";
import { TCompany } from "@/types/master-data/company/company.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth/auth.schema";

export default function SignInForm() {
  const [_, setIsLoading] = useAtom(loadingAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<any>({companies: []});
  const [companyId, setCompanyId] = useState("");
  const router = useRouter();
  
  const { register, handleSubmit } = useForm<TSignIn>({
    resolver: zodResolver(loginSchema)
  });
  
  const login: SubmitHandler<TSignIn> = async (body: TSignIn) => {
    try {
      setIsLoading(true);
      const {data} = await api.post(`/auth/login`, body);
      const result = data.result.data;
      
      if(result.companies.length > 1) {
        setCompanyId(result.companies[0].id)
        setResult(result);
      } else {
        saveLocalStorage(result, true);
        if(result.admin) {
          router.push("/dashboard");
        } else {
          router.push("/master-data/profile");
        };
      }
    } catch (error) {
      resolveResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const enter = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.put(`/auth/select-company-token`, {id: result.id, company: companyId});
      const response = data.result.data;
      saveLocalStorage(response, true);

      if(result.admin) {
        router.push("/dashboard");
      } else {
        router.push("/master-data/profile");
      };
    } catch (error) {
      resolveResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full max-w-[90dvw]">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <Logo width={250} height={100}/>
        </div>
        <div>
          <form>
            <div className="space-y-6">
              <div>
                <Label title="E-mail"/>
                <input placeholder="Seu e-mail" {...register("email")} type="email" className="input-erp-primary input-erp-default"/>
              </div>
              <div>
                <Label title="Senha"/>
                <div className="relative">
                  <input placeholder="Sua senha" {...register("password")} type={showPassword ? "text" : "password"} className="input-erp-primary input-erp-default"/>
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-1 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {
                result.companies.length > 1 && (
                  <div>
                    <Label title="Empresa"/>
                    <select onChange={(e) => {
                      setCompanyId(e.target.value);
                    }} className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:bg-dark-900">
                      {
                        result.companies.map((company: TCompany) => {
                          return <option key={company.id} value={company.id} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">{company.tradeName}</option>
                        })
                      }
                    </select>
                  </div>
                )
              }

              <div className="flex items-center justify-between">
                <Link
                  href="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                  Esqueceu sua senha?
                </Link>
              </div>
              <div>
                {
                  result.companies.length <= 1 && <Button type="button" className="w-full" size="sm" onClick={handleSubmit(login, onError)}>Entrar</Button>
                }
                {
                  result.companies.length > 1 && <Button type="button" className="w-full" size="sm" onClick={enter}>Entrar</Button>
                }
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Não tem uma conta? {""}
              <Link href="/signup" className="text-erp-primary dark:text-erp-primary">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
