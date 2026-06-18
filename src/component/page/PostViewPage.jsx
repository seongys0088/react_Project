import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import Button from "../ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.cardBody};
    transition: background-color 0.25s ease;
`;

const Container = styled.div`
    width: 100%;
    max-width: 768px; 
    padding: 60px 24px;
`;

const TitleText = styled.h1`
    font-size: 40px;
    font-weight: 800;
    color: ${props => props.theme.text};
    line-height: 1.3;
    letter-spacing: -1.5px;
    margin-bottom: 24px;
`;

const PostInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
`;

const PostInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: ${props => props.theme.secondaryText};

    .writer {
        font-weight: 700;
        color: ${props => props.theme.text};
    }
    .divider {
        color: ${props => props.theme.border};
    }
`;

const ActionButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

const ContentContainer = styled.article`
    font-size: 18px;
    line-height: 1.8;
    color: ${props => props.theme.text};
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
    margin-bottom: 24px;
`;

const CommentForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 40px;
`;

const StyledCommentInput = styled.input`
    width: 100%;
    padding: 16px 20px;
    font-size: 15px;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.border};
    border-radius: 12px;
    outline: none;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        color: ${props => props.theme.secondaryText};
    }

    &:focus {
        background-color: ${props => props.theme.cardBody};
        border-color: ${props => props.theme.primary};
        box-shadow: 0 0 0 3px rgba(18, 184, 134, 0.1);
    }
`;

const BottomActionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 48px;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    // 임시 로그인 유저 정보 (테스트용: '피카츄'나 '야돈' 등으로 변경해서 확인 가능)
    const currentUser = {
        name: "피카츄"
    };

    const post = data.find((item) => item.id == postId);
    
    const [comment, setComment] = useState("");

    if (!post) {
        return <Wrapper style={{padding: "40px"}}>해당 게시글을 찾을 수 없습니다.</Wrapper>;
    }

    // 작성자 본인 확인 로직
    const isAuthor = currentUser && currentUser.name === post.writer;

    // 글 삭제 핸들러
    const handleDelete = () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            console.log(`게시글 ID ${postId} 삭제 요청`);
            alert("게시글이 삭제되었습니다.");
            navigate("/"); 
        }
    };

    // 글 수정 핸들러
    const handleEdit = () => {
        navigate(`/post-edit/${postId}`);
    };

    return (
        <Wrapper>
            <Container>
                <header>
                    <TitleText>{post.title}</TitleText>
                    <PostInfoRow>
                        <PostInfo>
                            <span className="writer">{post.writer}</span>
                            <span className="divider">·</span>
                            <span>{post.date}</span>
                        </PostInfo>
                        
                        {/* 본인이 작성한 글일 때만 수정/삭제 버튼 노출 */}
                        {isAuthor && (
                            <ActionButtonGroup>
                                <Button 
                                    title="수정" 
                                    onClick={handleEdit}
                                    variant="secondary"
                                />
                                <Button 
                                    title="삭제" 
                                    onClick={handleDelete}
                                    style={{ backgroundColor: "#ff6b6b", color: "#fff" }} 
                                />
                            </ActionButtonGroup>
                        )}
                    </PostInfoRow>
                </header>

                <ContentContainer>{post.content}</ContentContainer>
                
                <Divider />

                {/* 댓글 섹션 */}
                <section>
                    <CommentLabel>{post.comments ? post.comments.length : 0}개의 댓글</CommentLabel>
                    
                    <CommentForm>
                        <StyledCommentInput
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="댓글을 작성하세요..."
                        />
                        <Button
                            title="댓글 작성"
                            onClick={() => {
                                console.log("저장될 댓글 데이터:", comment);
                                setComment(""); 
                            }}
                        />
                    </CommentForm>
                    
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