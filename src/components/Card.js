import React from 'react';
import styled from 'styled-components';

const Card =(props)=>{

    return(
        <React.Fragment>
            <Content>{props.name}</Content>
        </React.Fragment>
    )
}

const Content = styled.div`
  width: 150px;
  min-width: 150px;
  height: 150px;
  background-color: red;
  border: 1px solid #e9ecef;  
  margin: 0px 20px 0px 0px;
  position: relative;
  

  
`;

export default Card; 