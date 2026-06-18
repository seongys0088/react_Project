import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import QuillEditor from "../ui/QuillEditor";
import data from "../../data.json";

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
    max-width: 720px;
    & > * {
        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
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

function PostWritePage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    
    // 이 값이 존재하면 '수정 모드', 없으면 '생성 모드'
    const isEditMode = !!postId; 

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 컴포넌트 마운트 시, 수정 모드라면 기존 글 데이터 채워 넣기
    useEffect(() => {
        if (isEditMode) {
            const targetPost = data.find((item) => item.id == postId);
            if (targetPost) {
                setTitle(targetPost.title);
                setContent(targetPost.content);
            } else {
                alert("존재하지 않는 게시글입니다.");
                navigate("/");
            }
        }
    }, [isEditMode, postId, navigate]);

    // 완료 버튼 핸들러 (등록 및 수정 분기)
    const handleSubmit = () => {
        if (isEditMode) {
            // [수정 모드 로직]
            console.log(`게시글 ${postId}번 수정 요청 완료`);
            console.log("수정된 데이터:", { title, content });
            alert("글 수정이 완료되었습니다.");
            navigate(`/post/${postId}`); // 수정 후 해당 글 보기 페이지로 이동
        } else {
            // [생성 모드 로직]
            console.log("새로운 게시글 등록 요청");
            console.log("생성된 데이터:", { title, content });
            alert("글 등록이 완료되었습니다.");
            navigate("/");
        }
    };

    return (
        <Wrapper>
            <Container>
                <h2>{isEditMode ? "게시글 수정하기" : "새로운 게시글 작성"}</h2>
                
                <TitleInput
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <QuillEditor 
                    value={content} 
                    onChange={setContent} 
                />

                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "16px" }}>
                    <Button
                        title="취소"
                        onClick={() => {
                            // 취소 시 이전 페이지로 돌아감
                            navigate(-1);
                        }}
                    />
                    <Button
                        title={isEditMode ? "수정 완료" : "글 등록"}
                        onClick={handleSubmit}
                    />
                </div>
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;