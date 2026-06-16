/* src/component/ui/Sidebar.jsx */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiArrowToTop, BiMoon, BiSun } from 'react-icons/bi'; // 추천 기능용 아이콘 포함

const Container = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 1000;

    @media (max-width: 768px) {
        bottom: 20px;
        right: 20px;
        gap: 8px;
    }
`;

const ButtonCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${props => props.$primary ? '#12b886' : '#ffffff'};
    color: ${props => props.$primary ? '#ffffff' : '#495057'};
    border: 1px solid ${props => props.$primary ? '#12b886' : '#e9ecef'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
    opacity: ${props => props.$show === false ? 0 : 1};
    transform: ${props => props.$show === false ? 'translateY(20px)' : 'translateY(0)'};
    pointer-events: ${props => props.$show === false ? 'none' : 'auto'};

    svg {
        font-size: 24px;
    }

    &:hover {
        background-color: ${props => props.$primary ? '#20c997' : '#f8f9fa'};
        border-color: ${props => props.$primary ? '#20c997' : '#dee2e6'};
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    &:active {
        transform: translateY(0);
    }
`;

function Sidebar() {
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // 스크롤 위치에 따라 '맨 위로 가기' 버튼 토글
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Container>
            {/* 기능 1: 새 글 작성 버튼 (Velog 민트 포인트 적용) */}
            <ButtonCircle 
                $primary 
                onClick={() => navigate('/post-write')}
                title="새 글 작성"
            >
                <BiPlus />
            </ButtonCircle>

            {/* 기능 2: 맨 위로 올라가기 (300px 이상 스크롤 시 부드럽게 등장) */}
            <ButtonCircle 
                $show={showScrollTop} 
                onClick={scrollToTop}
                title="맨 위로"
            >
                <BiArrowToTop />
            </ButtonCircle>
        </Container>
    );
}

export default Sidebar;