import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import LoginInput from "../ui/LoginInput"; // 1. 분리한 LoginInput 임포트
import profileData from "../../profile.json";

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    padding: 40px 24px;
`;

const LoginCard = styled.div`
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border-radius: 16px;
    padding: 40px 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
`;

const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 36px;
`;

const BrandTitle = styled.h2`
    font-family: 'Fira Mono', monospace, sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #212529;
    letter-spacing: -1px;
    margin-bottom: 8px;
    cursor: pointer;
    
    span {
        color: #12b886;
    }
`;

const SubText = styled.p`
    font-size: 14px;
    color: #868e96;
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
    gap: 12px;
    
    button {
        width: 100%;
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
                    <BrandTitle onClick={() => navigate("/")}>We<span>log</span></BrandTitle>
                    <SubText>기술 블로그에 오신 것을 환영합니다.</SubText>
                </LogoContainer>

                <InputGroup>
                    {/* 2. 아이디 입력용 LoginInput 컴포넌트 매핑 */}
                    <LoginInput
                        label="아이디"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {/* 3. 비밀번호 입력용 LoginInput 컴포넌트 매핑 */}
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
                    <Button title="로그인" onClick={handleLogin} />
                    <Button 
                        title="취소" 
                        variant="secondary" 
                        onClick={() => navigate("/")} 
                    />
                </ActionContainer>
            </LoginCard>
        </Wrapper>
    );
}

export default LoginPage;