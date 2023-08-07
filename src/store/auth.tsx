import { ReactNode, createContext, useContext, useState } from 'react';

export type AuthProviderProps = {
    children: ReactNode
}

export type TokenContext = {
    token: string;
    handleSetToken: (task: string) => void
}

export const authContext = createContext<TokenContext | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.stringify(localStorage.getItem('token')) : "");

    const handleSetToken = (token: string) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    return <authContext.Provider value={{ token, handleSetToken }}>
        {children}
    </authContext.Provider>
}

// consumer => useContext
export const useAuth = () => {
    const authConsumer = useContext(authContext);
    if (!authConsumer) {
        throw new Error("No auth consumer");
    }
    return authConsumer;
}
