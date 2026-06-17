import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import QuillEditor from "../ui/QuillEditor";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 768px; /* 블로그 본문 너비 */
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 16px 0;
    font-size: 36px;
    font-weight: 700;
    color: #212529;
    border: none;
    border-bottom: 1px solid #e9ecef;
    outline: none;
    background: transparent;

    &::placeholder {
        color: #adb5bd;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 40px;
`;

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <Wrapper>
            <Container>
                
                <TitleInput
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <QuillEditor
                    value={content}
                    onChange={setContent}
                    placeholder="당신의 기술을 적어보세요..."
                />

                <ButtonContainer>
                    <Button
                        title="뒤로 가기"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <Button
                        title="작성하기"
                        onClick={() => {
                            console.log("저장될 데이터:", { title, content });
                            navigate("/");
                        }}
                    />
                </ButtonContainer>
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;