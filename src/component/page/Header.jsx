import React from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginButton from "../ui/LoginButton";
import Menu from "../ui/Menu"; // 1. 분리한 Menu 컴포넌트 임포트

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
    padding: 0px 24px 0px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MenuBar = styled.nav`
    display: flex;
    align-items: center;
    gap: 8px;
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
    margin-bottom: 8px;

    &:focus {
        border-color: #12b886;
    }
`;

// 2. 관리 보수가 간편하도록 상단 메뉴 구성을 설정 데이터화(Configuration Data)
const MENU_ITEMS = [
    { id: "trending", text: "트렌딩", icon: <MdOutlineTrendingUp /> },
    { id: "recommended", text: "추천", icon: <FaRegStar /> },
    { id: "latest", text: "최신", icon: <IoMdTime /> },
    { id: "feed", text: "피드", icon: <MdOutlineRssFeed /> }
];

function Header() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const currentTab = searchParams.get("tab") || "trending";

    const handleTabChange = (tabName) => {
        navigate(`/?tab=${tabName}`);
    };

    return (
        <Wrapper>
            <TopContainer>
                <MainTitle onClick={() => navigate("/")}>We<span>log</span></MainTitle>
                <UserNav>
                    <IconButton><FaSearch /></IconButton>
                    <IconButton><FaRegBell /></IconButton>
                    <LoginButton />
                </UserNav>
            </TopContainer>
            
            <SubContainer>
                <MenuBar>
                    {/* 3. 수동 작성을 지우고 데이터 기반으로 자식 컴포넌트 맵핑 */}
                    {MENU_ITEMS.map((item) => (
                        <Menu
                            key={item.id}
                            icon={item.icon}
                            text={item.text}
                            isActive={currentTab === item.id}
                            onClick={() => handleTabChange(item.id)}
                        />
                    ))}
                </MenuBar>
                
                <div>
                    {currentTab === "trending" && (
                        <form>
                            <FilterSelect>
                                <option>오늘</option>
                                <option>이번 주</option>
                                <option>이번 달</option>
                            </FilterSelect>
                        </form>
                    )}
                </div>
            </SubContainer>
        </Wrapper>
    );
};

export default Header;