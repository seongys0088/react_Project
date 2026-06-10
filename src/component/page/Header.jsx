import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginButton from "../ui/LoginButton"; // 1. 분리된 로그인 버튼 임포트

// icon
import { FaRegBell, FaSearch, FaRegStar } from "react-icons/fa";
import { MdOutlineTrendingUp, MdOutlineRssFeed } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const Wrapper = styled.header`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MainTitle = styled.a`
    font-family: 'Fira Mono', monospace, sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #212529;
    letter-spacing: -1px;
    cursor: pointer;
    
    span {
        color: #12b886;
    }
`;

const UserNav = styled.div`
    display: flex; 
    align-items: center;
    gap: 20px;
`;

const IconButton = styled.a`
    color: #495057;
    display: flex;
    align-items: center;
    font-size: 20px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        color: #212529;
    }
`;

const SubContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 0px 24px 8px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MenuBar = styled.nav`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Menu = styled.a`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 700;
    color: #868e96;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;

    &.active, &:hover {
        color: #212529;
        background-color: #f1f3f5;
    }

    svg {
        font-size: 18px;
    }
`;

const FilterSelect = styled.select`
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    outline: none;
    cursor: pointer;

    &:focus {
        border-color: #12b886;
    }
`;

function Header() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <TopContainer>
                <MainTitle onClick={() => navigate("/")}>We<span>log</span></MainTitle>
                <UserNav>
                    <IconButton><FaSearch /></IconButton>
                    <IconButton><FaRegBell /></IconButton>
                    
                    {/* 2. 복잡한 인증 로직과 UI가 내포된 독립 컴포넌트 배치 */}
                    <LoginButton />
                </UserNav>
            </TopContainer>
            
            <SubContainer>
                <MenuBar>
                    <Menu className="active"><MdOutlineTrendingUp /> 트렌딩</Menu>
                    <Menu><FaRegStar /> 추천</Menu>
                    <Menu><IoMdTime /> 최신</Menu>
                    <Menu><MdOutlineRssFeed /> 피드</Menu>
                </MenuBar>
                <div>
                    <form>
                        <FilterSelect>
                            <option>오늘</option>
                            <option>이번 주</option>
                            <option>이번 달</option>
                        </FilterSelect>
                    </form>
                </div>
            </SubContainer>
        </Wrapper>
    );
};

export default Header;