import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
    width: 100%;
    background-color: #ffffff;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 30px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LeftSection = styled.div`
    font-size: 13px;
    color: #868e96;
    
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const RightSection = styled.div`
    display: flex;
    gap: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #495057;
`;

function Footer() {
    return (
        <Wrapper>
            <Container>
                <LeftSection>
                    <p>© 2026 Welog. Developed by 성윤수 (컴퓨터소프트웨어과)</p>
                </LeftSection>
                <RightSection>
                    <a href="">이용약관</a>
                    <span>|</span>
                    <a href="">개인정보처리방침</a>
                </RightSection>
            </Container>
        </Wrapper>
    );
}

export default Footer;