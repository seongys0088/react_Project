import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // useSearchParams 추가
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

const FeedStatusNotice = styled.div`
    padding: 40px;
    background: #ffffff;
    border-radius: 12px;
    text-align: center;
    color: #868e96;
    font-size: 16px;
    border: 1px dashed #dee2e6;
    margin-bottom: 32px;
`;

function MainPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // 현재 활성화된 탭 파라미터 획득 (디폴트: trending)
    const currentTab = searchParams.get("tab") || "trending";

    // 얕은 복사본을 만들어 원본 데이터 오염 방지 및 동적 정렬 로직 적용
    let sortedPosts = [...data];

    if (currentTab === "trending") {
        // 댓글(replyCount) 개수가 많은 순으로 정렬
        sortedPosts.sort((a, b) => (b.replyCount || 0) - (a.replyCount || 0));
    } else if (currentTab === "recommended") {
        // 좋아요(like)가 높은 순으로 정렬
        sortedPosts.sort((a, b) => (b.like || 0) - (a.like || 0));
    } else if (currentTab === "latest") {
        // 최신 등록 데이터 순
        sortedPosts.sort((a, b) => b.id - a.id);
    } else if (currentTab === "feed") {
        // 피드 탭만의 특별한 필터 예시
    }

    return (
        <Wrapper>
            <ActionRow>
                <Button
                    title="새 글 작성"
                    onClick={() => navigate("/post-write")}
                />
            </ActionRow>

            {/* 피드 탭일 때 상단에 감성적인 피드 안내 가이드라인 표출 */}
            {currentTab === "feed" && (
                <FeedStatusNotice>
                    💡 구독하신 에디터들의 최신 기술 트렌드 피드가 모이는 공간입니다.
                </FeedStatusNotice>
            )}

            {/* 정렬 및 필터링 처리가 완료된 게시글 리스트 렌더링 */}
            <PostList
                posts={sortedPosts}
                onClickItem={(item) => navigate(`/post/${item.id}`)}
            />
        </Wrapper>
    );
}

export default MainPage;