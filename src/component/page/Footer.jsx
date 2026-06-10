import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: center; /* 내부 Container를 중앙으로 */
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px; /* MainPage와 동일하게 맞춤 */
    padding: 20px 30px; /* 좌우 패딩을 30px로 동일하게 맞춤 */
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 핵심 수정: 아이템들을 오른쪽 정렬 */
    gap: 10px;
`;

const FooterText = styled.p`
    font-size: 14px;
    color: #6c757d;
    margin: 0; /* 불필요한 기본 마진 제거 */
    text-align: right; /* 글자 자체도 오른쪽 정렬 보장 */
`;

function Footer() {
    return (
        <Wrapper>
            <Container>
                <FooterText>학번: 202532087</FooterText>
                <FooterText>학과: 컴퓨터소프트웨어과</FooterText>
                <FooterText>이름: 성윤수</FooterText>
                <FooterText>© 2026 Soaple Blog. All rights reserved.</FooterText>
                <FooterText>이용약관 | 개인정보처리방침</FooterText>
            </Container>
        </Wrapper>
    );
}

export default Footer;