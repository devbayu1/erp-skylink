import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  role: string;
  setRole: (role: string) => void;
}

const defaultValue: AuthContextType = {
  role: "admin",
  setRole: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState(
    localStorage.getItem("app_role") || "admin"
  );

  const setRole = (newRole: string) => {
    setRoleState(newRole);
    localStorage.setItem("app_role", newRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
