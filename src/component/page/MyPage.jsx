import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Profile from "../ui/Profile";

// 데이터
import postData from "../../data.json";
import profileData from "../../profile.json";

const Wrapper = styled.div`
    width: 100%;
    /* MainPage와 동일하게 최대 너비를 1200px로 줄여 양옆 사이드 여백 확보 */
    max-width: 1200px; 
    /* 상하 여백 40px, 좌우 여백 30px로 일치시켜 모든 화면 규격 동기화 */
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

const ProfileSection = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;
    justify-content: flex-start;
    gap: 32px; 
    padding: 40px 0 60px 0;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 40px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px; 
`;

const UserName = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #212529;
    margin: 0;
`;

const Sub = styled.p`
    font-size: 18px;
    color: #868e96;
    margin: 0;
`;

const PostSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SectionTitle = styled.h3`
    font-size: 22px;
    font-weight: 700;
    color: #212529;
    margin: 0;
    padding-bottom: 16px;
`;

function MyPage(props) {
    const navigate = useNavigate();
    const { profileId } = useParams(); // 💡 주소창에 들어온 고유 번호 추출 (문자열 형태)

    // 💡 추출한 profileId와 일치하는 유저 데이터를 정수형으로 변환 후 매칭
    const myProfile = profileData.find((profile) => profile.id === parseInt(profileId));
    
    // 💡 해당 유저의 name과 게시글 작성자(writer)가 일치하는 데이터들만 정밀 필터링
    const myPosts = postData.filter((post) => post.writer === myProfile?.name);

    if (!myProfile) {
        return <Wrapper>프로필 정보를 찾을 수 없습니다.</Wrapper>;
    }

    return (
        <Wrapper>
            <Container>
                {/* 상단: 프로필 가로 배열 배정 구역 */}
                <ProfileSection>
                    {/* 크기 확장 및 텍스트 2중 표기 무력화 옵션 가동 */}
                    <Profile 
                        user={{ writer: myProfile.name, id: myProfile.id }} 
                        size="128px" 
                        hideName={true} 
                    />
                    <InfoContainer>
                        <UserName>{myProfile.name}</UserName>
                        <Sub>{myProfile.sub}</Sub>
                    </InfoContainer>
                </ProfileSection>

                {/* 하단: 필터링 처리 완료된 리스트 바인딩 구역 */}
                <PostSection>
                    <SectionTitle>
                        작성한 글 ({myPosts.length})
                    </SectionTitle>
                    
                    <PostList
                        posts={myPosts}
                        onClickItem={(item) => {
                            navigate(`/post/${item.id}`);
                        }}
                    />
                </PostSection>
            </Container>
        </Wrapper>
    );
}

export default MyPage;