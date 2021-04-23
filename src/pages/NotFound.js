import React from 'react'
import styled from 'styled-components'


//올바른 주소가 아닌 경우 알려줍니다
const NotFound =()=> {

  return(
    <React.Fragment>
    <Title>올바른 주소가 아닙니다</Title>
    </React.Fragment>
  )

}

const Title = styled.div`
   font-weight: bold;
   font-size: 20px;
   text-align: center;
   margin-top:200px;

`
export default NotFound;
