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
    max-width: 1200px; 
    padding: 40px 30px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
`;

const Container = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px; 
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;
    justify-content: flex-start;
    gap: 32px; 
    padding-bottom: 40px;
    border-bottom: 1px solid #e9ecef;
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
`;

function MyPage(props) {
    const navigate = useNavigate();
    const { profileId } = useParams();

    const myProfile = profileData.find((profile) => profile.id === parseInt(profileId));
    const myPosts = postData.filter((post) => post.writer === myProfile?.name);

    if (!myProfile) {
        return <Wrapper>프로필 정보를 찾을 수 없습니다.</Wrapper>;
    }

    return (
        <Wrapper>
            <Container>
                <ProfileSection>
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