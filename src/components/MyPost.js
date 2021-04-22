import { connectRouter } from 'connected-react-router';
import React, {useState} from 'react';
import styled from 'styled-components';
import MyPostModal from './MyPostModal';



const MyPost =(props)=>{
    
    console.log(props)
    //클릭하면 is_modal 상태변경! + 해당요소 범위 밖에서 삼항연산자를 사용!
    const [ is_modal, setDetailModal ] = useState();
    const [ is_mouseover, setOver ] = useState();

    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };

    const mouseout = () => {
        setOver(false);
    };

    console.log(props.image_url)
    return(
        <React.Fragment>
            <Content onClick={openModal}  onMouseOver={()=> {setOver(true)}}  src={props.image_url} ></Content>
            {is_modal ? <MyPostModal {...props} close={closeModal}/> :null}
        </React.Fragment>
    )
}

// item들 가운데 정렬 나중에 반응형 잡으면서 넣기
const Content = styled.img`
  width: 260px;
  height: 260px;
  margin: 0px 0px 30px 30px;
  background-size: cover;
  cursor: pointer;
  @media (max-width: 600px){
    width: 45%;
    height: 10%;
  };
  @media (max-width: 376px){
    width: 100%;
    height: 5%;
  };
`

export default MyPost; 