import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

// pages
import Header from './component/page/Header';
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import MyPage from './component/page/MyPage';
import LoginPage from "./component/page/LoginPage";
import Sidebar from './component/ui/Sidebar';
import Footer from './component/page/Footer';

const Layout = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  /* 테마 변경 시 디자인 규격 유지하며 색상만 변경되도록 설정 */
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  transition: background-color 0.25s ease, color 0.25s ease;
`;

const Main = styled.div`
  flex: 1;
  width: 100%
`;

function App(props) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Header />
          <Main>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="post-write" element={<PostWritePage />} />
                <Route path="post/:postId" element={<PostViewPage />} />
                <Route path="mypage/:profileId" element={<MyPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
          </Main>
          <Sidebar />
          <Footer />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
