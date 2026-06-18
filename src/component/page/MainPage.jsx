import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const parseKoreanDate = (dateString) => {
    if (!dateString) return new Date(0);
    const matches = dateString.match(/(\d+)년\s*(\d+)월\s*(\d+)일/);
    if (matches) {
        const [_, year, month, day] = matches;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return new Date(dateString); // 예외 상황 방어 코드
};

function MainPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const currentTab = searchParams.get("tab") || "trending";
    const timeFilter = searchParams.get("time") || "month";

    // 💡 useMemo를 활용한 데이터 필터링 및 정렬 최적화
    const sortedPosts = useMemo(() => {
        let posts = [...data];
        const now = new Date();

        if (currentTab === "trending") {
            return posts.filter(post => {
                const postDate = parseKoreanDate(post.date);
                const timeDiff = now.getTime() - postDate.getTime();
                const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

                // 과거 데이터이므로 dayDiff는 0보다 크거나 같아야 하며 표준 범위 내여야 함
                if (dayDiff < 0) return false; 
                
                if (timeFilter === "today") return dayDiff <= 1;
                if (timeFilter === "week") return dayDiff <= 7;
                if (timeFilter === "month") return dayDiff <= 30;
                return true;
            }).sort((a, b) => (b.replyCount || 0) - (a.replyCount || 0));
        } 
        
        if (currentTab === "recommended") {
            return posts.sort((a, b) => (b.like || 0) - (a.like || 0));
        } 
        
        if (currentTab === "latest") {
            return posts.sort((a, b) => b.id - a.id);
        }

        return posts;
    }, [currentTab, timeFilter]);

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