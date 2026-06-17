import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import LoginInput from "../ui/LoginInput";
import profileData from "../../profile.json";

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.body}; 
    padding: 40px 24px;
    transition: background-color 0.25s ease;
`;

const LoginCard = styled.div`
    width: 100%;
    max-width: 420px;
    background: ${props => props.theme.cardBody};
    border-radius: 16px;
    padding: 40px 32px;
    box-shadow: ${props => props.theme.body === '#121212' ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.05)'};
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.border};
    transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 36px;
`;

const BrandTitle = styled.h2`
    font-family: 'Fira Mono', monospace, sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.text};
    letter-spacing: -1px;
    margin-bottom: 8px;
    cursor: pointer;
    
    span {
        color: ${props => props.theme.primary};
    }
`;

const SubText = styled.p`
    font-size: 14px;
    color: ${props => props.theme.secondaryText};
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
`;

const ErrorMessage = styled.p`
    font-size: 13px;
    color: #fa5252;
    margin-bottom: 16px;
    min-height: 19px;
`;

const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px; /* 회원가입 링크와의 간격을 위해 약간 조절 */
    
    button {
        width: 100%;
    }
`;

/* 회원가입 안내 및 링크 구역 추가 */
const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-size: 14px;
    color: ${props => props.theme.secondaryText};
`;

const SignUpLink = styled.span`
    color: ${props => props.theme.text};
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;

    &:hover {
        color: ${props => props.theme.primary}; /* 마우스 호버 시 포인트 컬러 */
    }
`;

function LoginPage() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            setError("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        const matchedUser = profileData.find(
            (user) => user.username === username && user.password === password
        );

        if (matchedUser) {
            setError("");
            localStorage.setItem("currentUser", JSON.stringify(matchedUser));
            alert(`${matchedUser.name}님, 환영합니다!`);
            window.location.replace("/");
        } else {
            setError("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <Wrapper>
            <LoginCard>
                <LogoContainer>
                    <BrandTitle onClick={() => navigate("/")}>Dev<span>Square</span></BrandTitle>
                    <SubText>기술 블로그에 오신 것을 환영합니다.</SubText>
                </LogoContainer>

                <InputGroup>
                    <LoginInput
                        label="아이디"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <LoginInput
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </InputGroup>

                <ErrorMessage>{error}</ErrorMessage>

                <ActionContainer>
                    {/* 취소 버튼을 제거하고 로그인 버튼만 간결하게 배치 */}
                    <Button title="로그인" onClick={handleLogin} />
                    
                    {/* 새로운 회원가입 가이드 링크 라인 */}
                    <SignUpContainer>
                        아직 회원이 아니신가요? 
                        <SignUpLink onClick={() => navigate("/signup")}>
                            회원가입
                        </SignUpLink>
                    </SignUpContainer>
                </ActionContainer>
            </LoginCard>
        </Wrapper>
    );
}

export default LoginPage;