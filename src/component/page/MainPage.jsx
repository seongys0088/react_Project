import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import data from '../../data.json';

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px; 
    padding: 32px 24px 80px 24px; 
    margin: 0 auto; 
`;

const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;
`;

function MainPage() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <ActionRow>
                <Button
                    title="새 글 작성"
                    onClick={() => navigate("/post-write")}
                />
            </ActionRow>
            <PostList
                posts={data}
                onClickItem={(item) => navigate(`/post/${item.id}`)}
            />
        </Wrapper>
    );
}

export default MainPage;