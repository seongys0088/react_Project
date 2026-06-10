/* src/component/list/PostListItem.jsx */
import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/Profile';
import { AiOutlineLike } from "react-icons/ai";

const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Wrapper = styled.div`
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    height: 380px;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }
`;

const ImgContainer = styled.div`
    width: 100%;
    height: 170px;
    overflow: hidden;
    background-color: #f1f3f5;
    position: relative;
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
`;

const TitleText = styled.h4`
    font-size: 16px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 6px;
    line-height: 1.4;
`;
    
const SubText = styled.p`
    font-size: 13px;
    color: #495057;
    line-height: 1.5;
    margin-bottom: 8px;
`;

const SubData = styled.div`
    font-size: 11px;
    color: #868e96;
    margin-top: auto;
`;

const Footer = styled.div`
    padding: 10px 16px;
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    border-top: 1px solid #f8f9fa; 
    background-color: #ffffff;
`;

const Like = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #495057;
    
    svg {
        font-size: 16px;
    }
`;

function PostListItem(props) {
    const { post, onClick } = props;

    return (
        <Wrapper onClick={onClick}>
            <ImgContainer>
                <TitleImg src={`/img/titleImg/${post.img}`} alt={post.title} />
            </ImgContainer>
            <TextContainer>
                <TitleText>{truncateText(post.title, 24)}</TitleText>
                <SubText>{truncateText(post.content, 65)}</SubText>
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