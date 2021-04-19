import React, {useState} from 'react';
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

      //Content 클릭하면 MyPostModal이 열리게 되어있다
      
    return(
        <React.Fragment>
            
            <Content src={props.image_url}  onClick={openModal}></Content>
            {is_modal ? <MyPostModal {...props} close={closeModal}/> :null}
            
        </React.Fragment>
    )
}

// item들 가운데 정렬 나중에 반응형 잡으면서 넣기
const Content = styled.img`
  width: 293px;
  height: 293px;
  border: none;
  margin: 0px 0px 4px 4px;
  background-size: cover;

`


export default MyPost; 