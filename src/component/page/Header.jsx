import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";

// icon
import { FaRegBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdOutlineRssFeed } from "react-icons/md";


// 스타일
// 전체 영역 (배경색과 밑줄은 브라우저 끝까지 채워짐)
const Wrapper = styled.div`
    width: 100%;
    background-color: whitesmoke;
    border-bottom: 1px solid #e9ecef;

    /* 세로 정렬을 위한 핵심 변경 사항 */
    display: flex;
    flex-direction: column;   /* 아이템들을 세로로 정렬 */
    align-items: center;      /* 세로 정렬 시 아이템들을 가로축 가운데로 정렬 */
`;

// 실질적인 콘텐츠가 들어가는 공간 (MainPage 규격과 동기화)
const Container = styled.div`
    width: 100%;
    max-width: 1200px; /* MainPage와 동일하게 맞춤 */
    padding: 20px 30px; /* 좌우 패딩을 30px로 동일하게 맞춤 */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MainTitle = styled.a`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    margin: 0 16px;
`;

const User = styled.div`
    display: flex; 
    flex-direction: row;
    align-items: center;
    gap: 15px;
`;

const Icon = styled.a`
    text-decoration: none;
    color: black;
`;

const Bell = styled(FaRegBell)`
    font-size: 24px;
`;

const Search = styled(FaSearch)`
    font-size: 24px;
`;

const Login = styled.a`
    width: 80px;
    height: 32px;
    border: 1px solid black;
    border-radius: 15px;
    background-color: black;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
`;

const MenuBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Menu = styled.a`
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    margin-left: 15px;
    text-decoration: none;
    color: black;
`;

const Filter = styled.div`

`;

function Header() {
    return (
        <Wrapper>
            <Container>
                <MainTitle href="http://localhost:5173/">Welog</MainTitle>
                <User>
                    <Icon href=""><Bell /></Icon>
                    <Icon href=""><Search /></Icon>
                    <Login href="">로그인</Login>
                </User>
            </Container>
            <Container>
                <MenuBar>
                    <Menu href=""><MdOutlineTrendingUp /> 트렌딩</Menu>
                    <Menu href=""><FaRegStar /> 추천</Menu>
                    <Menu href=""><IoMdTime /> 최신</Menu>
                    <Menu href=""><MdOutlineRssFeed /> 피드</Menu>
                </MenuBar>
                <Filter>
                    <form>
                        <select>
                        <option>오늘</option>
                        <option>이번 주</option>
                        <option>이번 달</option>
                        </select>
                    </form>
                </Filter>
            </Container>
        </Wrapper>
    );
};

export default Header;