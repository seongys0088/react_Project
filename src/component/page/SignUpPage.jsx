/* src/component/page/SignUpPage.jsx */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import LoginInput from "../ui/LoginInput";

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

const SignUpCard = styled.div`
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
    margin-bottom: 30px;
`;

const BrandTitle = styled.h2`
    font-family: 'Fira Mono', monospace;
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.text};
    letter-spacing: -1px;
    margin-bottom: 8px;
    
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
    gap: 16px;
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
    gap: 20px;
    
    button {
        width: 100%;
    }
`;

const LoginGuide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${props => props.theme.secondaryText};
`;

const LoginLink = styled.span`
    color: ${props => props.theme.text};
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
        color: ${props => props.theme.primary};
    }
`;

function SignUpPage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });
    };

    const handleSignUp = () => {
        const { name, username, password, confirmPassword } = formData;

        if (!name || !username || !password || !confirmPassword) {
            setError("모든 필드를 입력해주세요.");
            return;
        }
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (password.length < 4) {
            setError("비밀번호는 4자리 이상이어야 합니다.");
            return;
        }

        setError("");
        alert("회원가입이 완료되었습니다! 로그인 해주세요.");
        navigate("/login");
    };

    return (
        <Wrapper>
            <SignUpCard>
                <LogoContainer>
                    <BrandTitle>We<span>log</span></BrandTitle>
                    <SubText>새로운 계정을 생성하세요.</SubText>
                </LogoContainer>

                <InputGroup>
                    <LoginInput
                        label="이름"
                        placeholder="실명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleChange(e, "name")}
                    />
                    <LoginInput
                        label="아이디"
                        placeholder="사용할 아이디를 입력하세요"
                        value={formData.username}
                        onChange={(e) => handleChange(e, "username")}
                    />
                    <LoginInput
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.password}
                        onChange={(e) => handleChange(e, "password")}
                    />
                    <LoginInput
                        label="비밀번호 확인"
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange(e, "confirmPassword")}
                    />
                </InputGroup>

                <ErrorMessage>{error}</ErrorMessage>

                <ActionContainer>
                    <Button title="계정 만들기" onClick={handleSignUp} />
                    
                    <LoginGuide>
                        이미 계정이 있으신가요? 
                        <LoginLink onClick={() => navigate("/login")}>
                            로그인
                        </LoginLink>
                    </LoginGuide>
                </ActionContainer>
            </SignUpCard>
        </Wrapper>
    );
}

export default SignUpPage;