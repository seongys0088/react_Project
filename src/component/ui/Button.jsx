import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.variant === 'secondary' ? '#495057' : '#ffffff'};
    background-color: ${props => props.variant === 'secondary' ? '#ffffff' : '#12b886'}; /* velog 포인트 컬러 */
    border: 1px solid ${props => props.variant === 'secondary' ? '#ced4da' : '#12b886'};
    border-radius: 20px; /* 둥근 캡슐형 */
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: ${props => props.variant === 'secondary' ? 'none' : '0 4px 12px rgba(18, 184, 134, 0.2)'};

    &:hover {
        background-color: ${props => props.variant === 'secondary' ? '#f8f9fa' : '#20c997'};
        border-color: ${props => props.variant === 'secondary' ? '#adb5bd' : '#20c997'};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

function Button(props) {
    const { title, onClick } = props;
    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;