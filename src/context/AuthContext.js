import { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  getUser,
  removeAuth,
  saveToken,
  saveUser,
  isAuth,
} from "../utils/auth";

const AuthContext = createContext();

// esto me deja destructurar -> { login} = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(() => {
    if (isAuth()) {
      const storedUser = getUser();
      const storedToken = getToken();

      setUser(storedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  function updateAuth(userData, tokenData) {
    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
  }

  async function login(username, password) {
    const res = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Wrong email or password. Please try again.");
    }

    const data = await res.json();

    // guardo en localStorage
    saveToken(data.token);
    saveUser(data.user);

    // actualizo estado global
    setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  }

  function logout() {
    removeAuth();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = {
    user,
    token,
    login,
    logout,
    updateAuth,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
