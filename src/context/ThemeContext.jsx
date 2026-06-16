/* src/context/ThemeContext.jsx */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// 라이트 모드 & 다크 모드 색상 규격 정의
export const lightTheme = {
    body: '#f8f9fa',
    text: '#212529',
    cardBody: '#ffffff',
    border: '#e9ecef',
    secondaryText: '#868e96',
    primary: '#12b886',
};

export const darkTheme = {
    body: '#121212',
    text: '#eceff1',
    cardBody: '#1e1e1e',
    border: '#2a2a2a',
    secondaryText: '#a0aec0',
    primary: '#20c997',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // 사용자의 기존 설정이나 OS 설정을 반영
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('welog-theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem('welog-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <StyledThemeProvider theme={currentTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);