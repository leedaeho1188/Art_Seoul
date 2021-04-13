import React from 'react';
import styled from 'styled-components';

const Card =(props)=>{

    return(
        <React.Fragment>
            <Content {...props}></Content>
        </React.Fragment>
    )
}

// item들 가운데 정렬 나중에 반응형 잡으면서 넣기
const Content = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid #e9ecef;  
  margin: 20px 20px 0px 27px;
  border-radius: 5px;
  background-image: url("${(props) => props.src}");
  background-size: cover;

`;

export default Card; 