import React,{useState,useEffect} from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/post";
import { Settings } from "@material-ui/icons";
import Question from  "../pages/Question"
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

  console.log(user_info)
  if(my_list.length===0){
    return (<React.Fragment>
    
    <EditProfileContainer>
    <LeftSideContainer>
    <ImageCircle src={user_info.profile} size={150}/>
    </LeftSideContainer>
  <RightSideContainer>
  <RightSideContainer1>
    <Text>{user_info.nickname}</Text>
    <EditButton onClick={openModal}>EDIT PROFILE</EditButton> 
  </RightSideContainer1>

  
    <CountPost> 게시물 {my_list.length} </CountPost>
  
  </RightSideContainer>

  </EditProfileContainer>  
    {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
    <NoPost>
    <Text2>작성한 게시물이 없습니다!</Text2>
    
    {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
    </NoPost>
    
    </React.Fragment>
    )
  }else{
  return(
    <React.Fragment>

  <EditProfileContainer>
    <LeftSideContainer>
    <ImageCircle src={user_info.profile} size={150}/>
    </LeftSideContainer>
  <RightSideContainer>
  <RightSideContainer1>
    <Text>{user_info.nickname}</Text>
    <EditButton onClick={openModal}>EDIT PROFILE</EditButton> 
  </RightSideContainer1>

  
    <CountPost> 게시물 {my_list.length} </CountPost>
  
  </RightSideContainer>

  </EditProfileContainer>  
    {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
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

const MyPageBackground = styled.div`
top:0;
left:0;
background-image: url("https://images.unsplash.com/photo-1591723027220-66847f768065?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
width:100vw;
height:600px;;
background-size: cover;
padding-top: 150px;
`
const EditProfileContainer = styled.div`
margin:auto;
width: 903px;
height: 300px;
display: flex;

background-color: black;
border: none;

margin-top:50px;
@media (max-width: 975px){
  width: 100%;
}
`

const LeftSideContainer = styled.div`
width:33%;
height: 100%;
background-color: white;
`


const RightSideContainer = styled.div`
width:67%;
height: 100%;
background-color: white;
top: 100px;
left: 100px;
display: column;
@media (max-width: 975px){
  width: 100%;
}
`
const RightSideContainer1 = styled.div`
width:67%;
height: 30%;
top: 100px;
left: 100px;
display: flex;
@media (max-width: 975px){
  width: 100%;
}
`

const ImageCircle = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  // background-color: black;
  // background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  margin: 40px 0px 0px 60px;
`;


const PostContainer = styled.div`
  margin:auto;
  width:903px;

  background-color: white;
  border: none;
  border-radius: 10px;
  margin-top:10px;     
  display:flex;
  
  // 줄바꿈 자동으로 되도록 + flex-item간의 간격이 줄어들도록!
  flex-wrap: wrap;
  align-content:flex-start;
  padding: 10px 5px 10px 5px;
`;

const NoPost = styled.div`
  margin:auto;
  width:903px;

  background-color: white;
  border: none;
  border-radius: 10px;
  margin-top:10px;     
  text-align: center;
  
  // 줄바꿈 자동으로 되도록 + flex-item간의 간격이 줄어들도록!
  flex-wrap: wrap;
  align-content:flex-start;
  padding: 10px 5px 10px 5px;
`;


const Text = styled.div`
   font-size: 35px;
   color: black;
   padding: 50px 0px 0px 0px;
   word-spacing: 0px; 
`

const CountPost =styled.div`
   font-size: 15px;
   color: black;
   padding: 50px 0px 0px 0px;
   word-spacing: 0px; 
`

const Text2 = styled.div`
   font-weight: bold;
   font-size: 20px;
   color: black;
   word-spacing: 0px;
   padding: 40px 0px 40px 0px;
`

const EditButton = styled.button`
  width: 120px;
  height: 30px;
  margin: 60px 0px 0px 30px;
  padding: 0px 0px 0px 0px;
  font-weight: bold;
  border: 1px solid grey;
  background-color: white;
  font-size: 14px;
  border-radius:4px;
`

export default Mypage;
