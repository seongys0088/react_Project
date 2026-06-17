import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

const SearchContainer = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: 340px;
    /* iOS 특유의 투명도 높은 블러 배경 처리 */
    background-color: ${props => props.theme.body === '#121212' ? 'rgba(30, 30, 30, 0.75)' : 'rgba(242, 242, 247, 0.85)'};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${props => props.theme.body === '#121212' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    border-radius: 14px;
    padding: 10px 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 1010;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: iosScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes iosScaleIn {
        from { opacity: 0; transform: scale(0.96) translateY(-4px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;

const SearchWrapper = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px 32px 8px 32px; /* 아이콘 자리를 위한 여백 */
    font-size: 15px;
    background-color: ${props => props.theme.body === '#121212' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
    color: ${props => props.theme.text};
    border: none;
    border-radius: 10px;
    outline: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    &::placeholder {
        color: ${props => props.theme.body === '#121212' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)'};
    }
`;

const LeftIcon = styled(FaSearch)`
    position: absolute;
    left: 10px;
    font-size: 14px;
    color: ${props => props.theme.body === '#121212' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)'};
    pointer-events: none;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    padding: 0;
    color: ${props => props.theme.body === '#121212' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    
    &:hover {
        color: ${props => props.theme.text};
    }
`;

const CancelText = styled.span`
    font-size: 15px;
    color: ${props => props.theme.primary || '#007AFF'}; /* iOS 시스템 블루 컬러 감성 */
    cursor: pointer;
    font-weight: 500;
    user-select: none;
    padding-right: 4px;
`;

function SearchInput({ onClose }) {
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // 컴포넌트가 열리자마자 바로 타이핑할 수 있게 포커싱 (iOS 디테일)
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    // 바깥 영역 클릭 시 닫히는 로직
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [onClose]);

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    return (
        <SearchContainer ref={containerRef}>
            <SearchWrapper>
                <LeftIcon />
                <StyledInput 
                    ref={inputRef}
                    type="text" 
                    placeholder="검색" 
                />
                <ClearButton onClick={handleClear}>
                    <FaTimesCircle />
                </ClearButton>
            </SearchWrapper>
            <CancelText onClick={onClose}>취소</CancelText>
        </SearchContainer>
    );
}

export default SearchInput;