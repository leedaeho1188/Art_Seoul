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

    const mouseover = () => {
        setOver(true);
      };
    const mouseout = () => {
        setOver(false);
    };

    console.log(props.image_url)
    return(
        <React.Fragment>
            {is_mouseover?
            <>
            <div> 
            <Box src={props.image_url} onMouseOut={mouseout} onClick={openModal}>
            </Box>

            <TextBox>
            <Text> Place: {props.markername}</Text>
            </TextBox>
            </div>
            </>
            : <Content  onMouseOver={mouseover}  src={props.image_url} ></Content>}
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
`
const Box = styled.div`
  width: 260px;
  height: 260px;
  border: none;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 0px 0px 30px 30px;
  cursor: pointer;
  text-align: center;
  // position: relative;
  z-index: 30;

`

const TextBox = styled.div`
 
 
`

const Text = styled.div`
 
  color: black;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  z-index:20;
  
  
  
`




export default MyPost; 