import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const InputLabel = styled.label`
    font-size: 13px;
    font-weight: 600;
    color: ${props => props.theme.text};
    transition: color 0.25s ease;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease-in-out, background-color 0.25s ease, border-color 0.25s ease;

    &::placeholder {
        color: ${props => props.theme.secondaryText};
    }

    &:focus {
        border-color: ${props => props.theme.primary};
        box-shadow: 0 0 0 3px rgba(18, 184, 134, 0.08);
    }
`;

function LoginInput(props) {
    const { label, type, placeholder, value, onChange, onKeyDown } = props;

    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <StyledInput
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </InputWrapper>
    );
}

export default LoginInput;