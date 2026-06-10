import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/Profile';

//icon
import { AiOutlineLike } from "react-icons/ai";

// 글자 수 제한 함수
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};

// 스타일
const Wrapper = styled.div`
    box-sizing: border-box;

    width: calc(100% - 50px);
    height: calc(100% - 50px);

    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .25s ease-in, transform .25s ease-in;
    cursor: pointer;
    background: white;

    overflow: hidden;
    min-width: 0;

    &:hover {
        transform: translateY(-4px); 
        box-shadow: 0 8px 24px 0 rgba(0, 0, 0, .08);
    }
`;

const ImgContainer = styled.div`
    width: 100%;
    flex-basis: 45%;

    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
`;

const TitleImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const TextContainer = styled.div`
    flex: 1;

    padding: 16px 16px 0 16px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    overflow: hidden;
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 5px;
    `;
    
const SubText = styled.p`
    font-size: 15px;
    font-weight: 200;
    padding: 0px;
    margin-top: 0px;
`;

const SubData = styled.p`
    font-size: 12px;
    font-weight: 200;
    margin-top: auto;
    color: #888;
`;

const Footer = styled.div`
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between; /* 양 끝으로 밀어내기 */
    align-items: center; /* 세로 중앙 정렬 */
    border-top: 1px solid #eee; /* 푸터 구분을 위한 옅은 선 (선택) */
`;

const WriterInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* 프로필과 글자 사이 간격 */
    font-size: 14px;
    color: #555;
`;

const Like = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #555;
    cursor: pointer;
`;

function PostListItem(props) {
    const { post, onClick } = props;

    return (
        <Wrapper onClick={onClick}>
            <ImgContainer>
                <TitleImg src={`/img/titleImg/${post.img}`} alt={`${post.title}`} />
            </ImgContainer>
            <TextContainer>
                <TitleText>{truncateText(post.title, 13)}</TitleText>
                <SubText>{truncateText(post.content, 30)}</SubText>
                <SubData>{post.date} | {post.replyCount}의 댓글</SubData>
            </TextContainer>
            <Footer>
                <WriterInfo><Profile user={post}/></WriterInfo>
                <Like><AiOutlineLike /> {post.like}</Like>
            </Footer>
        </Wrapper>
    );
}

export default PostListItem;