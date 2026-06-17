/* src/component/ui/Sidebar.jsx */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BiPlus, BiArrowToTop, BiMoon, BiSun, BiShareAlt, BiBookmark, BiBookmarkHeart } from 'react-icons/bi';
import { useTheme } from '../../context/ThemeContext';

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
    background-color: ${props => props.$primary ? props.theme.primary : props.theme.cardBody};
    color: ${props => props.$primary ? '#ffffff' : props.theme.text};
    border: 1px solid ${props => props.$primary ? props.theme.primary : props.theme.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.25s ease;
    opacity: ${props => props.$show === false ? 0 : 1};
    transform: ${props => props.$show === false ? 'translateY(20px)' : 'translateY(0)'};
    pointer-events: ${props => props.$show === false ? 'none' : 'auto'};

    svg {
        font-size: 24px;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        filter: brightness(1.05);
    }
`;

function Sidebar() {
    const navigate = useNavigate();
    const { postId } = useParams(); // 현재 주소에 postId가 있는지 감지
    const { isDarkMode, toggleTheme } = useTheme();
    
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 스크롤 감지 및 맨 위로 버튼 토글
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 현재 게시글의 북마크 여부 확인 (postId가 바뀔 때마다 실행)
    useEffect(() => {
        if (!postId) return;
        const bookmarks = JSON.parse(localStorage.getItem('welog-bookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(Number(postId)));
    }, [postId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 링크 공유 기능 구현
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('현재 페이지 링크가 클립보드에 복사되었습니다! 🎉');
        } catch (err) {
            alert('링크 복사에 실패했습니다. 주소창을 이용해 주세요.');
        }
    };

    // 북마크 토글 기능 구현
    const handleBookmarkToggle = () => {
        if (!postId) {
            alert('상세 게시글 페이지에서만 북마크 기능을 사용할 수 있습니다.');
            return;
        }
        
        const currentId = Number(postId);
        let bookmarks = JSON.parse(localStorage.getItem('welog-bookmarks') || '[]');
        
        if (bookmarks.includes(currentId)) {
            bookmarks = bookmarks.filter(id => id !== currentId);
            setIsBookmarked(false);
        } else {
            bookmarks.push(currentId);
            setIsBookmarked(true);
        }
        localStorage.setItem('welog-bookmarks', JSON.stringify(bookmarks));
    };

    return (
        <Container>
            {/* 테마 변경 (라이트/다크) */}
            <ButtonCircle onClick={toggleTheme} title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}>
                {isDarkMode ? <BiSun /> : <BiMoon />}
            </ButtonCircle>

            {/* 상세페이지 전용: 공유하기 */}
            {postId && (
                <ButtonCircle onClick={handleShare} title="링크 공유하기">
                    <BiShareAlt />
                </ButtonCircle>
            )}

            {/* 상세페이지 전용: 북마크 */}
            {postId && (
                <ButtonCircle onClick={handleBookmarkToggle} title="북마크 토글">
                    {isBookmarked ? <BiBookmarkHeart style={{ color: '#e53e3e' }} /> : <BiBookmark />}
                </ButtonCircle>
            )}

            {/* 새 글 작성 */}
            <ButtonCircle $primary onClick={() => navigate('/post-write')} title="새 글 작성">
                <BiPlus />
            </ButtonCircle>

            {/* 맨 위로 스크롤 */}
            <ButtonCircle $show={showScrollTop} onClick={scrollToTop} title="맨 위로 가기">
                <BiArrowToTop />
            </ButtonCircle>
        </Container>
    );
}

export default Sidebar;