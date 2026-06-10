/* src/component/list/PostList.jsx */
import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    width: 100%;

    /* 패널 반응형 규격 최적화 */
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

function PostList(props) {
    const { posts, onClickItem } = props;
    return (
        <Wrapper>
            {posts.map((post) => (
                <PostListItem
                    key={post.id}
                    post={post}
                    onClick={() => onClickItem(post)}
                />
            ))}
        </Wrapper>
    );
}

export default PostList;