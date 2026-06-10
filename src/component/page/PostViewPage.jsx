import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import QuillEditor from "../ui/QuillEditor";
import Button from "../ui/Button";
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
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 768px; 
    margin-top: 40px; 
    gap: 16px;
`;

const PostHeader = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
`;

const TitleText = styled.h1`
    font-size: 44px;
    font-weight: 800;
    color: #212529;
    line-height: 1.4;
    word-break: keep-all;
    margin: 0;
`;

const PostInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
`;

const InfoLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const WriterText = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #212529;
`;

const DateText = styled.span`
    font-size: 16px;
    color: #868e96;
`;

const ContentContainer = styled.div`
    padding: 32px 0;
`;

const ContentText = styled.p`
    font-size: 18px;
    line-height: 1.7;
    color: #212529;
    white-space: pre-wrap;
    word-break: keep-all;
    margin: 0;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #e9ecef;
    margin: 40px 0;
`;

const CommentLabel = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #212529;
    margin: 0;
`;

const CommentWriteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    gap: 16px;
    margin-top: 20px;
    margin-bottom: 40px;
    border: 1px solid #e9ecef;
    padding: 0 16px 16px 16px;
    border-radius: 8px;
    background: white;
`;

const BottomActionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = data.find((item) => {
        return item.id == postId;
    });

    const [comment, setComment] = useState("");

    if (!post) {
        return <Wrapper>해당 게시글을 찾을 수 없습니다.</Wrapper>;
    }

    return (
        <Wrapper>
            <Container>
                
                {/* 1. 헤더 영역 */}
                <PostHeader>
                    <TitleText>{post.title}</TitleText>
                    <PostInfo>
                        <InfoLeft>
                            <WriterText>{post.writer}</WriterText>
                            <DateText>· {post.date}</DateText>
                        </InfoLeft>
                    </PostInfo>
                </PostHeader>

                {/* 2. 본문 영역 */}
                <ContentContainer>
                    <ContentText>{post.content}</ContentText>
                </ContentContainer>
                
                {/* 3. 구분선 */}
                <Divider />

                {/* 4. 댓글 영역 */}
                <div>
                    <CommentLabel>
                        {post.comments ? post.comments.length : 0}개의 댓글
                    </CommentLabel>
                    
                    <CommentWriteContainer>
                        {/* 💡 TextInput 대신 분리해 둔 에디터를 재사용하고 높이를 축소시킵니다 */}
                        <QuillEditor
                            value={comment}
                            onChange={setComment}
                            placeholder="댓글을 작성하세요..."
                            height="120px" 
                        />
                        <Button
                            title="댓글 작성"
                            onClick={() => {
                                console.log("저장될 댓글 데이터(HTML 문자열):", comment);
                                setComment(""); 
                            }}
                        />
                    </CommentWriteContainer>

                    <CommentList comments={post.comments || []} />
                </div>

                {/* 5. 하단 목록으로 이동 버튼 */}
                <BottomActionContainer>
                    <Button
                        title="목록으로 돌아가기"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </BottomActionContainer>

            </Container>
        </Wrapper>
    );
}

export default PostViewPage;