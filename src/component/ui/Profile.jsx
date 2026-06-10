import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profileData from "../../profile.json";

const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const ProfileImg = styled.img`
    width: ${(props) => props.size || "32px"};
    height: ${(props) => props.size || "32px"};
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e9ecef;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const UserName = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #868e96;
    
    strong {
        color: #212529;
        font-weight: 600;
        margin-left: 2px;
    }
`;

function Profile({ user, size, hideName }) {
    const navigate = useNavigate();
    if (!user) return null;

    const matchedProfile = profileData.find((profile) => profile.name === user.writer);
    if (!matchedProfile) return null;

    const onClickProfile = (e) => {
        e.stopPropagation(); 
        navigate(`/mypage/${matchedProfile.id}`); 
    };
    
    return (
        <ProfileWrapper onClick={onClickProfile}>
            <ProfileImg 
                src={`/img/profileImg/${matchedProfile.profileImg}`} 
                alt={`${user.writer}`} 
                size={size} 
            />
            {!hideName && <UserName>by <strong>{user.writer}</strong></UserName>}
        </ProfileWrapper>
    );
}

export default Profile;