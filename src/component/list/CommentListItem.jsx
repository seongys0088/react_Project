import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/Profile';

const Wrapper = styled.div`
    width: calc(100%);
    padding: 16px 0;
    display: flex;
    flex-direction: row; 
    align-items: center; 
    border-bottom: 1px solid #f1f3f5;
    border-radius: 16px;
    background: white;
`;

const LeftArea = styled.div`
    margin: 0 16px;
`;

const RightArea = styled.div`
    display: flex;
    flex-direction: column; 
    flex: 1; 
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0;
    margin-top: 4px; 
    margin-bottom: 8px; 
`;

const WriterName = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 0;
    margin-top: 4px;
`;

const DateText = styled.span`
    font-size: 10px;
    color: #868e96;
    margin-bottom: 16px;
`;

const ContentText = styled.div`
    font-size: 16px;
    line-height: 1.6;
    color: #212529;
    white-space: pre-wrap;
`;

function CommentListItem(props) {
    const { comment } = props;

    return (
        <Wrapper>
            
            {/* 왼쪽 구역: 프로필 사진 */}
            <LeftArea>
                <Profile user={comment} size="44px" hideName={true} />
            </LeftArea>

            {/* 오른쪽 구역: 이름과 내용 */}
            <RightArea>
                <WriterName>{comment.writer}</WriterName>
                <DateText>{comment.commentDate || "방금 전"}</DateText>
                <ContentText dangerouslySetInnerHTML={{ __html: comment.content }} />
            </RightArea>

        </Wrapper>
    );
}

export default CommentListItem;