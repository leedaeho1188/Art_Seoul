import React,{useState,useEffect} from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/post";
import { Settings } from "@material-ui/icons";
import ProfileUpdateModal from "../components/ProfileUpdateModal";


//해당 user가 작성한 게시글 정보를 전부 내려주면 middleware를 통해서 reducer에 정보저장
  //해당 정보를 reducer에서 useSelector로 가져오고
const Mypage = () => {
 
  const dispatch = useDispatch();
  const my_list = useSelector((state) => state.post.mylist);
  const user_info = useSelector((state)=>state.user.user);
  // const preview = useSelector((state) => state.image.profile_preview)

  const [is_modal, setModal] = useState();
    const openModal = () => {
        setModal(true);
      };
    const closeModal = () => {
        setModal(false);
      };
 
  React.useEffect(() => {
      dispatch(userActions.getmyPostAX());
  },[]);

  // 내 게시물이 없는 경우 & 있는 경우
  if(my_list.length==0){
    return (
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
          <CountPost> POST {my_list.length} </CountPost>
        </RightSideContainer>
      </EditProfileContainer>  
        
      <NoPost>
        <Text2>작성한 게시물이 없습니다!</Text2>
        {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
      </NoPost>
    </React.Fragment>)
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
          <CountPost> {user_info.nickname}님은 현재 {my_list.length}개의 게시물이 있습니다! </CountPost>
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


const EditProfileContainer = styled.div`
margin:auto;
width: 914px;
height: 230px;
display: flex;
margin-top:50px;
@media (max-width: 975px){
  width: 100%;
}
border-bottom: 2px solid grey;
`
const LeftSideContainer = styled.div`
width:33%;
height: 100%;

`
const RightSideContainer = styled.div`
width:67%;
height: 100%;
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
  width:914px;
  border: none;
  border-radius: 10px;
  margin-top:50px;     
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
const Text2 = styled.div`
   font-weight: bold;
   font-size: 20px;
   color: black;
   word-spacing: 0px;
   padding: 40px 0px 40px 0px;
`
const CountPost =styled.div`
  
   font-size: 22px;
   color: black;
   padding: 50px 0px 0px 0px;
   word-spacing: 1.5px;
   font-weight: bold;
   display: flex;
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
  cursor: pointer;
`

export default Mypage;
