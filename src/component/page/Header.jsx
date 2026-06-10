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
const Wrapper = styled.div`

`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const MainTitle = styled.a`
    font-size: 20px;
    text-align: center;
    padding: 10px;
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: black;
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