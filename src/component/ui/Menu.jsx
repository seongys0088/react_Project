import React from "react";
import styled from "styled-components";

const StyledMenuButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 700;
    color: #868e96;
    padding: 12px 16px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    top: 1px; /* 헤더 하단 경계선과 매끄럽게 맞춤 */

    /* 활성화(active) 상태일 때의 Velog 시그니처 스타일 액센트 */
    &.active {
        color: #12b886;
        border-bottom: 2px solid #12b886;
    }

    &:hover:not(.active) {
        color: #212529;
    }

    svg {
        font-size: 18px;
    }
`;

function Menu(props) {
    const { icon, text, isActive, onClick } = props;

    return (
        <StyledMenuButton 
            className={isActive ? "active" : ""} 
            onClick={onClick}
        >
            {icon}
            {text}
        </StyledMenuButton>
    );
}

export default Menu;