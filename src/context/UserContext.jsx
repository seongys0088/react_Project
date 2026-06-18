import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    // 실제 운영 환경에서는 초기값으로 localStorage나 쿠키에서 유저 정보를 읽어옵니다.
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("currentUser");
            return savedUser ? JSON.parse(savedUser) : null; 
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            localStorage.removeItem("currentUser"); // 오염된 데이터 정화
            return null;
        }
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}