import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AuthWrapper = styled.div`
    display: flex; 
    align-items: center;
    gap: 16px;
`;

const HeaderProfileImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e9ecef;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
`;

const StyledButton = styled.button`
    padding: 6px 16px;
    border-radius: 16px;
    background-color: ${props => props.isLogout ? '#ef4444' : '#212529'};
    color: white;
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.isLogout ? '#dc2626' : '#495057'};
    }
`;

function LoginButton() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // 컴포넌트가 마운트될 때 브라우저 저장소의 유저 정보 동기화
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleAuthAction = () => {
        if (user) {
            // 로그인 상태일 때: 로그아웃 처리
            if (window.confirm("로그아웃 하시겠습니까?")) {
                localStorage.removeItem("currentUser");
                setUser(null);
                window.location.replace("/");
            }
        } else {
            // 비로그인 상태일 때: 로그인 페이지로 이동
            navigate("/login");
        }
    };

    return (
        <AuthWrapper>
            {/* 로그인 상태일 때만 프로필 노출 + 마이페이지 클릭 이벤트 */}
            {user && (
                <HeaderProfileImg 
                    src={`/img/profileImg/${user.profileImg}`} 
                    alt={user.name}
                    onClick={() => navigate(`/mypage/${user.id}`)}
                    title={`${user.name}님의 마이페이지로 이동`}
                />
            )}

            <StyledButton 
                onClick={handleAuthAction}
                isLogout={!!user}
            >
                {user ? "로그아웃" : "로그인"}
            </StyledButton>
        </AuthWrapper>
    );
}

export default LoginButton;