import React,{useState,useEffect} from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/post";
import { Settings } from "@material-ui/icons";
import Setting from  "../pages/Setting"
import ProfileUpdateModal from "../components/ProfileUpdateModal";


//해당 user가 작성한 게시글 정보를 전부 내려주면 middleware를 통해서 reducer에 정보저장
  //해당 정보를 reducer에서 useSelector로 가져오고
const Mypage = () => {
 //순서 너무 중요하다...
  const dispatch = useDispatch();
  const my_list = useSelector((state) => state.post.mylist);
  const user_info = useSelector((state)=>state.user.user);

  // console.log(user_info)

  const [ is_modal, setDetailModal ] = useState();

    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };
 
  
  React.useEffect(() => {
      dispatch(userActions.getmyPostAX());
  },[]);

  if(my_list.length===0){
    return (<React.Fragment>

    <EditProfileContainer>
      <ImageCircle size={200}/>
      <EditButton onClick={openModal}>EDIT PROFILE </EditButton> 
    </EditProfileContainer>
    <NoPost><Text>작성한 게시물이 없습니다!</Text></NoPost>
    
    {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
    </React.Fragment>
    )
  }else{
  return(
  <React.Fragment>
  <EditProfileContainer/>
  <PostContainer>
  
  
  {my_list.map((item)=> {
    return(
      
      <MyPost key={item.id} {...item}></MyPost>
      
    )}
  )}
  
  </PostContainer> 
  </React.Fragment>
  )
 }
}


const EditProfileContainer = styled.div`
margin:auto;
width:516px;
height: 300px;

background-color: white;
border: 1px solid #e9ecef;
border-radius: 10px;
margin-top:100px;
`


const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: black;
  // background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  margin: 20px 0px 0px 30px;
`;



const PostContainer = styled.div`
  margin:auto;
  width:534px;

  background-color: black;
  border: 3px solid black;
  border-radius: 10px;
  margin-top:180px;     
  display:flex;
  
  // 줄바꿈 자동으로 되도록 + flex-item간의 간격이 줄어들도록!
  flex-wrap: wrap;
  align-content:flex-start;
  padding: 10px 5px 10px 5px;

  
`;
const NoPost = styled.div`
  margin:auto;
  width:516px;
  height: 150px;

  background-color: black;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  margin-top:70px;     
  display:flex;
  padding: 20px 9px 0px 0px;
`;

const Text = styled.div`
   font-weight: bold;
   font-size: 20px;
   color: white;
   
   padding: 40px 0px 40px 150px;
   
  
`

const EditButton = styled.button`
  margin: 20px 0px 0px 47px;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  border: 2px solid black;
  background-color: white;
  font-size: 20px;
`

export default Mypage;
