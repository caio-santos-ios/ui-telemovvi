"use client";

interface Props {
    password: string;
}

interface Criterion {
    label: string;
    test: (p: string) => boolean;
}

const criteria: Criterion[] = [
    { label: "Mínimo 8 caracteres", test: (p) => p.length >= 8 },
    { label: "Letra maiúscula", test: (p) => /[A-Z]/.test(p) },
    { label: "Letra minúscula", test: (p) => /[a-z]/.test(p) },
    { label: "Número", test: (p) => /[0-9]/.test(p) },
    { label: "Caractere especial (@, #...)", test: (p) => /[@$!%*?&_#^]/.test(p) },
];

const levels = [
    { label: "Muito fraca", color: "bg-red-500" },
    { label: "Fraca", color: "bg-orange-400" },
    { label: "Média", color: "bg-yellow-400" },
    { label: "Boa", color: "bg-blue-400" },
    { label: "Ótima", color: "bg-green-500" },
];

export function PasswordStrength({ password }: Props) {
    const score = criteria.filter((c) => c.test(password)).length;
    const level = levels[score - 1] ?? levels[0];
    const percent = (score / criteria.length) * 100;

    return (
        <div className="mt-2 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${level.color}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            {
                password && (
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Força da senha:{" "}
                        <span className={`font-semibold ${score <= 1 ? "text-red-500" :
                            score === 2 ? "text-orange-400" :
                                score === 3 ? "text-yellow-500" :
                                    score === 4 ? "text-blue-400" :
                                        "text-green-500"
                            }`}>
                            {level.label}
                        </span>
                    </p>
                )
            }

            <ul className="grid grid-cols-2 gap-1">
                {criteria.map((c) => {
                    const ok = c.test(password);
                    return (
                        <li key={c.label} className="flex items-center gap-1.5 text-xs">
                            <span className={`text-base leading-none ${ok ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`}>
                                {ok ? "✓" : "○"}
                            </span>
                            <span className={ok ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}>
                                {c.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}