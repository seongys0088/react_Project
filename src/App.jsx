import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

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
`;

const Main = styled.div`
  flex: 1;
  width: 100%
`;

function App(props) {
  return (
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
  );
}

export default App;
