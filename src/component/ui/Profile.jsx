import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import profileData from "../../profile.json";

const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.2s ease-in-out;

    &:hover {
        background-color: #f5f5f5; 
    }
`;

const ProfileImg = styled.img`
    width: ${(props) => props.size || "40px"};
    height: ${(props) => props.size || "40px"};
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ddd;
`;

const UserName = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

function Profile({ user, size, hideName }) {
    const navigate = useNavigate();
    
    if (!user) return null;

    const matchedProfile = profileData.find(
        (profile) => profile.name === user.writer
    );

    if (!matchedProfile) return null;

    const onClickProfile = (e) => {
        // 💡 게시글 카드 전체 클릭 이벤트가 동시에 터지는 버블링 현상 방지
        e.stopPropagation(); 
        navigate(`/mypage/${matchedProfile.id}`); 
    };
    
    return (
        <ProfileWrapper onClick={onClickProfile}>
            <ProfileImg 
                src={`/img/profileImg/${matchedProfile.profileImg}`} 
                alt={`${user.writer}의 프로필`} 
                size={size} 
            />
            {!hideName && <UserName>by {user.writer}</UserName>}
        </ProfileWrapper>
    );
}

export default Profile;