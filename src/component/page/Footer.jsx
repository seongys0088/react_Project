import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 12px;
  text-align: right;
  background-color: grey;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function Footer(props) {
    return(
        <Wrapper>
            학번: 202532087<br/>
            학과: 컴퓨터소프트웨어과<br/>
            이름: 성윤수<br/>
        </Wrapper>
    );
}

export default Footer;