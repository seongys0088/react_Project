import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import QuillEditor from "../ui/QuillEditor";
import Button from "../ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
`;

const Container = styled.div`
    width: 100%;
    max-width: 768px; 
    padding: 60px 24px;
`;

const TitleText = styled.h1`
    font-size: 40px;
    font-weight: 800;
    color: #212529;
    line-height: 1.3;
    letter-spacing: -1.5px;
    margin-bottom: 24px;
`;

const PostInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: #495057;
    margin-bottom: 48px;

    .writer {
        font-weight: 700;
        color: #212529;
    }
    .divider {
        color: #ced4da;
    }
`;

const ContentContainer = styled.article`
    font-size: 18px;
    line-height: 1.8;
    color: #212529;
    white-space: pre-wrap;
    margin-bottom: 60px;
    letter-spacing: -0.2px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #e9ecef;
    margin: 48px 0;
`;

const CommentLabel = styled.h3`
    font-size: 18px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 16px;
`;

const CommentWriteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    gap: 12px;
    margin-bottom: 32px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #f8f9fa;
    padding: 12px;
`;

const BottomActionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 48px;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = data.find((item) => item.id == postId);
    const [comment, setComment] = useState("");

    if (!post) {
        return <Wrapper style={{padding: "40px"}}>해당 게시글을 찾을 수 없습니다.</Wrapper>;
    }

    return (
        <Wrapper>
            <Container>
                <header>
                    <TitleText>{post.title}</TitleText>
                    <PostInfo>
                        <span className="writer">{post.writer}</span>
                        <span className="divider">·</span>
                        <span>{post.date}</span>
                    </PostInfo>
                </header>

                <ContentContainer>{post.content}</ContentContainer>
                
                <Divider />

                <section>
                    <CommentLabel>{post.comments ? post.comments.length : 0}개의 댓글</CommentLabel>
                    <CommentWriteContainer>
                        <QuillEditor
                            value={comment}
                            onChange={setComment}
                            placeholder="댓글을 작성하세요..."
                            height="100px" 
                        />
                        <Button
                            title="댓글 작성"
                            onClick={() => {
                                console.log("저장될 댓글 데이터:", comment);
                                setComment(""); 
                            }}
                        />
                    </CommentWriteContainer>
                    <CommentList comments={post.comments || []} />
                </section>

                <BottomActionContainer>
                    <Button
                        title="← 목록으로 돌아가기"
                        onClick={() => navigate("/")}
                        variant="secondary"
                    />
                </BottomActionContainer>
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;