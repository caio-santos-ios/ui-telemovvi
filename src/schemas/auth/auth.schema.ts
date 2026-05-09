import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "O E-mail é obrigatório").email("E-mail inválido"),
    password: z.string().min(1, "A Senha é obrigatória"),
})

export const registerSchema = z.object({
    companyName: z.string().min(1, "O nome da empresa é obrigatório"),
    name: z.string().min(1, "O nome completo é obrigatório"),
    document: z.string().min(1, "O CPF ou CNPJ é obrigatório"),
    email: z.string().min(1, "O E-mail é obrigatório").email("E-mail inválido"),
    phone: z.string().min(1, "O telefone é obrigatório"),
    whatsapp: z.string().optional(),
    password: z.string().min(1, "A Senha é obrigatória").
    min(8, "A senha deve ter no minimo 8 caractere ").
    regex(new RegExp("^(?=.*[A-Z])"), "A senha deve ter 1 letra maiúscula").
    regex(new RegExp("^(?=.*[a-z])"), "A senha deve ter 1 letra minúscula").
    regex(new RegExp("([0-9])"), "A senha deve ter 1 número").
    regex(new RegExp("(?=.*[@$!%*#?&])"), "A senha deve ter 1 caractere especial"),
    privacyPolicy: z.boolean("Aceitar os termos e condições é obrigatório")
})