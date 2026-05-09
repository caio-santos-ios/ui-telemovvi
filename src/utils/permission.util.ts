import { decodedToken } from "./auth.util";

export const permissionRead = (module: string, subModule: string) => {
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_ENVIRONMENT}TelemovviToken`);
    
    if(!token) return false;

    const user = decodedToken(token);

    if(user.admin || user.master) return true;

    const currentModule = user.modules.findIndex((m: any) => m.code == module);
    if(currentModule >= 0) {
        const currentRoutine = user.modules[currentModule].routines.findIndex((r: any) => r.code == subModule);
        
        if(currentRoutine >= 0) {

            return user.modules[currentModule].routines[currentRoutine].permissions.read;
        };
    };

    return false;
};

export const permissionCreate = (module: string, subModule: string) => {
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_ENVIRONMENT}TelemovviToken`);
    
    if(!token) return false;

    const user = decodedToken(token);

    if(user.admin || user.master) return true;

    const currentModule = user.modules.findIndex((m: any) => m.code == module);
    if(currentModule >= 0) {
        const currentRoutine = user.modules[currentModule].routines.findIndex((r: any) => r.code == subModule);
        
        if(currentRoutine >= 0) {

            return user.modules[currentModule].routines[currentRoutine].permissions.read;
        };
    };

    return false;
};

export const permissionUpdate = (module: string, subModule: string) => {
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_ENVIRONMENT}TelemovviToken`);
    
    if(!token) return false;

    const user = decodedToken(token);

    if(user.admin || user.master) return true;

    const currentModule = user.modules.findIndex((m: any) => m.code == module);
    if(currentModule >= 0) {
        const currentRoutine = user.modules[currentModule].routines.findIndex((r: any) => r.code == subModule);
        
        if(currentRoutine >= 0) {

            return user.modules[currentModule].routines[currentRoutine].permissions.read;
        };
    };

    return false;
};

export const permissionDelete = (module: string, subModule: string) => {
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_ENVIRONMENT}TelemovviToken`);
    
    if(!token) return false;

    const user = decodedToken(token);

    if(user.admin || user.master) return true;

    const currentModule = user.modules.findIndex((m: any) => m.code == module);
    if(currentModule >= 0) {
        const currentRoutine = user.modules[currentModule].routines.findIndex((r: any) => r.code == subModule);
        
        if(currentRoutine >= 0) {

            return user.modules[currentModule].routines[currentRoutine].permissions.read;
        };
    };

    return false;
};