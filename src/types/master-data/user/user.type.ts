import { ResetAddress, TAddress } from "../address/address";

export type TUserLogged = {
    id: string;
    name: string;
    email: string;
    photo: string;
    admin: boolean;
    master: boolean;
    role: string;
    companyName: string;
    companyPhoto: string;
    storeName: string;
    modules: any[];
}

export const ResetUserLogged: TUserLogged = {
    id: "",
    photo: "",
    name: "",
    email: "",
    admin: false,
    master: false,
    role: "",
    companyName: "",
    companyPhoto: "",
    storeName: "",
    modules: []
}

export type TUserProfile = {
    id?: string;
    photo: any;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: TAddress;
}

export const ResetUserProfile: TUserProfile = {
    id: "",
    photo: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: ResetAddress
}