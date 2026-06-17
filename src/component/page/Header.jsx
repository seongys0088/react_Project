import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginButton from "../ui/LoginButton";
import Menu from "../ui/Menu";
import NotificationDropdown from "../ui/NotificationDropdown";
import SearchInput from "../ui/SearchInput";

// icon
import { FaRegBell, FaSearch, FaRegStar } from "react-icons/fa";
import { MdOutlineTrendingUp, MdOutlineRssFeed } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const Wrapper = styled.header`
    width: 100%;
    background-color: ${props => props.theme.body === '#121212' ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
    backdrop-filter: blur(8px);
    border-bottom: 1px solid ${props => props.theme.border};
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.25s ease, border-color 0.25s ease;
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
    color: ${props => props.theme.text};
    letter-spacing: -1px;
    cursor: pointer;
    
    span {
        color: ${props => props.theme.primary};
    }
`;

const UserNav = styled.div`
    display: flex; 
    align-items: center;
    gap: 20px;
`;

const NavItemContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const IconButton = styled.a`
    color: ${props => props.theme.secondaryText};
    display: flex;
    align-items: center;
    font-size: 20px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.text};
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
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.cardBody};
    border: 1px solid ${props => props.theme.border};
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    margin-bottom: 8px;

    &:focus {
        border-color: ${props => props.theme.primary};
    }
`;

const BellContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

// 관리 보수가 간편하도록 상단 메뉴 구성을 설정 데이터화(Configuration Data)
const MENU_ITEMS = [
    { id: "trending", text: "트렌딩", icon: <MdOutlineTrendingUp /> },
    { id: "recommended", text: "추천", icon: <FaRegStar /> },
    { id: "latest", text: "최신", icon: <IoMdTime /> },
    { id: "feed", text: "피드", icon: <MdOutlineRssFeed /> }
];

function Header() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    const currentTab = searchParams.get("tab") || "trending";
    const currentTimeFilter = searchParams.get("time") || "week";

    const handleTabChange = (tabName) => {
        // 탭이 바뀔 때 기본 기간 필터도 유연하게 연결되도록 URL 구조를 설계합니다.
        if (tabName === "trending") {
            navigate(`/?tab=${tabName}&time=week`);
        } else {
            navigate(`/?tab=${tabName}`);
        }
    };

    const handleTimeFilterChange = (e) => {
        const selectedTime = e.target.value;
        navigate(`/?tab=trending&time=${selectedTime}`);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsNotificationOpen(false);
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
        setIsSearchOpen(false);
    };

    return (
        <Wrapper>
            <TopContainer>
                <MainTitle onClick={() => navigate("/")}>We<span>log</span></MainTitle>
                <UserNav>
                    <NavItemContainer>
                        <IconButton onClick={toggleSearch}><FaSearch /></IconButton>
                        {isSearchOpen && (
                            <SearchInput onClose={() => setIsSearchOpen(false)} />
                        )}
                    </NavItemContainer>
                    <NavItemContainer>
                        <IconButton onClick={toggleNotification}><FaRegBell /></IconButton>
                        {isNotificationOpen && (
                            <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
                        )}
                    </NavItemContainer>
                    <LoginButton />
                </UserNav>
            </TopContainer>
            
            <SubContainer>
                <MenuBar>
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
                            <FilterSelect 
                                value={currentTimeFilter} 
                                onChange={handleTimeFilterChange}
                            >
                                <option value="today">오늘</option>
                                <option value="week">이번 주</option>
                                <option value="month">이번 달</option>
                            </FilterSelect>
                        </form>
                    )}
                </div>
            </SubContainer>
        </Wrapper>
    );
};

export default Header;