import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import data from '../../data.json';

const Wrapper = styled.div`
    width: 100%;
    /* 최대 너비를 1200px로 줄여 양옆 사이드 여백을 더 넓게 확보 */
    max-width: 1200px; 
    /* 상하 여백은 40px, 좌우 여백은 30px로 넓혀 화면이 작아져도 여백이 유지되도록 설정 */
    padding: 40px 30px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 브라우저 중앙 정렬 */
    margin: 0 auto; 
`;

const Container = styled.div`
    width: 100%;
    max-width: 100%; /* 부모인 Wrapper의 1200px 규격을 그대로 따름 */
    & > * {
        :not(:last-child) {
            margin-bottom: 20px;
        }
    }
`;

function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <Button
                    title="글 작성하기"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />

                <PostList
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;