import React from 'react'

import styled from 'styled-components'

const About = (props) => {

  return(

    <React.Fragment>
      <Component onClick={props.close} />
      <ModalComponent>
        <HeaderContainer>
          사이트 소개
        </HeaderContainer>
        <ContentsContainer>
          <ImageContainer src="https://images.unsplash.com/photo-1591723027220-66847f768065?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
          <Bold>ART Seoul</Bold>은 서울안에 자신이 관람한 공연이나 전시 후기를 다른사람과 공유하는 사이트입니다.
          후기를 남기실 때는 <Bold>지도안에있는 마커</Bold>를 클릭해서 남기실 수 있습니다.
          자신이 다녀온 곳에 이미 마커가 찍혀있다면 해당 마커를 사용하시면되고, 
          마커가 찍혀있지 않으면 <Bold>직접 마커를 만드셔서</Bold> 사용하시면 됩니다.😀 
          지도에서 원하는 장소를 찾으실 때는 직접 지도를 사용하시거나 해당 <Bold>주소를 입력</Bold>을해서 
          찾으실 수 있습니다! <br/><br/>

          <Bold>공연정보</Bold> 페이지에 들어가면 현재 서울에서 관람할 수 있는 공연 정보들을 카테고리별로 나눠서 제공하고있습니다.😀<br/> <br/>

          좋은시간 되시길 바랍니다.

        </ContentsContainer>
        <ExitBtn onClick={props.close} >나가기</ExitBtn>
      </ModalComponent>
    </React.Fragment>

  )

}

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
  opacity: 0.4;
`

const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index:20;
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1000px){
    width: 85%;
  };
  @media (max-width: 450px){
    width: 95%;
    height: 400px;
  }
`

const HeaderContainer = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 24px;

`

const ContentsContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
  width: 90%;
  font-size: 18px;
  line-height: 1.8;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`

const Bold = styled.span`
    font-weight: bold;
`

const ImageContainer = styled.img`
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
`

const ExitBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  background-color: #FFCC4D;
  border-radius: 5px;
  padding: 8px 12px;
  margin-bottom: 30px;
`
export default About