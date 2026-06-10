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
    color: #495057;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    color: #212529;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        color: #adb5bd;
    }

    &:focus {
        border-color: #12b886;
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