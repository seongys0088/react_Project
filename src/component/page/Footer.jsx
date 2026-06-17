import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
    width: 100%;
    background-color: ${props => props.theme.cardBody};
    border-top: 1px solid ${props => props.theme.border};
    display: flex;
    justify-content: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
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
    color: ${props => props.theme.secondaryText};
    transition: color 0.3s ease;
    
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const RightSection = styled.div`
    display: flex;
    gap: 12px;
    font-size: 13px;
    font-weight: 600;
    color: ${props => props.theme.text};
    transition: color 0.3s ease;

    span {
        color: ${props => props.theme.secondaryText};
    }

    a:hover {
        color: ${props => props.theme.primary};
    }
`;

function Footer() {
    return (
        <Wrapper>
            <Container>
                <LeftSection>
                    <p>© 2026 DevSquare. Developed by 성윤수 (컴퓨터소프트웨어과)</p>
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