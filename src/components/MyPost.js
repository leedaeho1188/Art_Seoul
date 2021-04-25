import React, {useState} from 'react';
import styled from 'styled-components';
import MyPostModal from './MyPostModal';


//Userpage의 개별 포스트입니다 + 삼항연산자를 이용해 상세페이지로 들어갈 수 있습니다.
const MyPost =(props)=>{
    const [ is_modal, setDetailModal ] = useState();

    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };

    return(
        <React.Fragment>
            <Content onClick={openModal} src={props.image_url} ></Content>
            {is_modal ? <MyPostModal _id={props._id} {...props} close={closeModal}/> :null}
        </React.Fragment>
    )
}

const Content = styled.img`
  width: 260px;
  height: 260px;
  margin: 0px 0px 30px 30px;
  background-size: cover;
  cursor: pointer;
`

export default MyPost; 