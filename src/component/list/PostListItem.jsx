import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/Profile';
import { AiOutlineLike } from "react-icons/ai";

// 에디터 HTML 태그 제거 및 순수 텍스트 추출용 유틸 함수
const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
};

const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Wrapper = styled.div`
    background: ${props => props.theme.cardBody};
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: ${props => props.theme.body === '#121212' ? '0 4px 16px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.04)'};
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, background-color 0.25s ease;
    height: 380px;
    cursor: pointer; /* 클릭 가능한 카드임을 명시 */

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${props => props.theme.body === '#121212' ? '0 12px 24px rgba(0, 0, 0, 0.6)' : '0 12px 24px rgba(0, 0, 0, 0.08)'};
    }
`;

const ImgContainer = styled.div`
    width: 100%;
    height: 170px;
    overflow: hidden;
    background-color: #f1f3f5;
    position: relative;
    /* 이미지 다운로드 전 공백 레이아웃 유연성 확보 */
    flex-shrink: 0; 
`;

const TitleImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${Wrapper}:hover & {
        transform: scale(1.05);
    }
`;

const TextContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0; /* flex 자식 요소의 단어 끊김 현상 방지 최소 너비 설정 */
`;

const TitleText = styled.h4`
    font-size: 16px;
    font-weight: 700;
    color: ${props => props.theme.text};
    margin-bottom: 6px;
    line-height: 1.4;
    /* 타이틀 한 줄 말줄임 (안전장치) */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
    
const SubText = styled.p`
    font-size: 13px;
    color: ${props => props.theme.secondaryText};
    line-height: 1.5;
    margin-bottom: 8px;
    /* 긴 단어가 들어와도 카드를 뚫고 나가지 않도록 방어 */
    word-break: break-all; 
    overflow: hidden;
`;

const SubData = styled.div`
    font-size: 11px;
    color: #868e96;
    margin-top: auto; /* 하단 푸터 바로 위에 딱 붙도록 고정 */
    padding-top: 4px;
`;

const Footer = styled.div`
    padding: 10px 16px;
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    border-top: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.cardBody};
    transition: background-color 0.25s ease, border-color 0.25s ease;
    flex-shrink: 0;
`;

const Like = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.secondaryText};
`;

function PostListItem(props) {
    const { post, onClick } = props;

    // 만약 content에 HTML 태그가 섞여있다면 정제 후 가공 처리
    const cleanContent = stripHtmlTags(post.content);

    return (
        <Wrapper onClick={onClick}>
            <ImgContainer>
                <TitleImg src={`/img/titleImg/${post.img}`} alt={post.title} />
            </ImgContainer>
            <TextContainer>
                <TitleText>{truncateText(post.title, 24)}</TitleText>
                <SubText>{truncateText(cleanContent, 65)}</SubText>
                <SubData>{post.date} · {post.replyCount}개의 댓글</SubData>
            </TextContainer>
            <Footer>
                <Profile user={post} size="24px" />
                <Like><AiOutlineLike /> {post.like}</Like>
            </Footer>
        </Wrapper>
    );
}

export default PostListItem;