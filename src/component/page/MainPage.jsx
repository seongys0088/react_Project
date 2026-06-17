import React from 'react';
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
    
    // 현재 활성화된 탭 파라미터 획득 (디폴트: trending)
    const currentTab = searchParams.get("tab") || "trending";
    // 💡 Header와 동기화된 time 파라미터 수집 (기본값: 이번 달)
    const timeFilter = searchParams.get("time") || "month";

    // 얕은 복사본을 만들어 원본 데이터 오염 방지 및 동적 정렬 로직 적용
    let sortedPosts = [...data];

    if (currentTab === "trending") {
        const now = new Date(); 

        sortedPosts = sortedPosts.filter(post => {
            const postDate = parseKoreanDate(post.date);
            const timeDiff = now.getTime() - postDate.getTime();
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24); // 일 단위로 환산

            if (timeFilter === "today") {
                return dayDiff <= 1; // 24시간 이내의 글
            } else if (timeFilter === "week") {
                return dayDiff <= 7; // 7일 이내의 글
            } else if (timeFilter === "month") {
                return dayDiff <= 30; // 30일 이내의 글
            }
            return true;
        });

        // 필터링된 범위 안에서 기존 기획대로 댓글(replyCount)이 많은 순으로 정렬
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