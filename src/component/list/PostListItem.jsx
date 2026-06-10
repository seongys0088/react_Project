import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/Profile';

//icon
import { AiOutlineLike } from "react-icons/ai";

// 글자 수 제한 함수
const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};

// 스타일
const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    /* 텍스트 양이 많아도 완전히 수용할 수 있도록 전체 높이를 400px로 여유롭게 조정 */
    height: 400px; 

    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .25s ease-in-out, transform .25s ease-in-out;
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
    /* 이미지 영역을 기존 45%에서 40%로 줄여서 텍스트 공간을 더 확보 */
    height: 40%; 
    overflow: hidden;
    background-color: #f1f3f5;
`;

const TitleImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const TextContainer = styled.div`
    flex: 1;
    padding: 16px 16px 12px 16px; /* 아래쪽 패딩을 살짝 줄임 */
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const TitleText = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #212529;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 6px; /* 간격 축소 */
`;
    
const SubText = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 10px;
    line-height: 1.4;
`;

const SubData = styled.p`
    font-size: 12px;
    font-weight: 400;
    /* 중요: flex 안에서 밀려나지 않고 Footer 바로 위에 안정적으로 배치되도록 고정 */
    margin-top: auto; 
    margin-bottom: 0px;
    color: #868e96;
`;

/* 크기 최적화를 진행한 Footer */
const Footer = styled.div`
    /* 패딩을 기존 상하 12px -> 6px로 대폭 줄여 Footer 크기를 콤팩트하게 최소화 */
    padding: 6px 16px; 
    box-sizing: border-box;
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    border-top: 1px solid #f1f3f5; 
    background-color: #fafbfc;
    
    /* 내부 프로필 컴포넌트 등으로 인해 높이가 강제로 늘어나는 것을 방지 */
    min-height: 44px; 
`;

const WriterInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; 
    font-size: 13px; /* 폰트 크기 살짝 조정 */
    color: #495057;

    /* Profile 컴포넌트 내부의 이미지 크기가 너무 크다면 제한하는 코드 (선택사항) */
    img {
        width: 24px !important;
        height: 24px !important;
    }
`;

const Like = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #495057;
    cursor: pointer;
    
    &:hover {
        color: #228be6;
    }
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