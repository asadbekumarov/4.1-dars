"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(id: string, name: string, email: string) {
    const userData: User = { id: Number(id), username: name, email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return { user, login, logout, isAuthenticated: !!user };
}

export default useAuth;
