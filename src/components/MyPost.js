import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MyPostModal from './MyPostModal';



const MyPost =(props)=>{
  
    //클릭하면 is_modal 상태변경! + 해당요소 범위 밖에서 삼항연산자를 사용!
    const [ is_modal, setDetailModal ] = useState();

    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };

    return(
        <React.Fragment>
            
            <Content {...props}  onClick={openModal}></Content>
            {is_modal ? <MyPostModal {...props} close={closeModal}/> :null}
            
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
  background-image: url("${(props) => props.image_url}");
  background-size: cover;
  background-color: white;

`;

export default MyPost; 