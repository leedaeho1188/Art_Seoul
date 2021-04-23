import React,{useState,useEffect} from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post";
import { Settings } from "@material-ui/icons";
import ProfileUpdateModal from "../components/ProfileUpdateModal";



//해당 user가 작성한 게시글 정보를 전부 내려주면 middleware를 통해서 reducer에 정보저장
  //해당 정보를 reducer에서 useSelector로 가져오고
const Userpage = (props) => {
 //순서 너무 중요하다...
 const _id = props.match.params.id
 const dispatch = useDispatch();
 const user_list = useSelector((state) => state.post.userlist);
 const user_info = useSelector((state) => state.user.user);
 console.log(user_list)



  React.useEffect(() => {
    dispatch(postActions.getuserPostAX(_id));
    window.scrollTo(0,0)
    },[_id]);
  

  const [ is_modal, setDetailModal ] = useState();

    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };


  
  if(user_list.length==0 && _id === user_info.id){
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
          <CountPost> {user_info.nickname}님은 현재 {user_list.length}개의 게시물이 있습니다!</CountPost>
        </RightSideContainer>
      </EditProfileContainer>  
        
      <NoPost>
        <Text2>작성한 게시물이 없습니다!</Text2>
        {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
      </NoPost>
    </React.Fragment>)
  }else if(_id === user_info.id){
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
    <CountPost> {user_info.nickname}님은 현재 {user_list.length}개의 게시물이 있습니다! </CountPost>
    </RightSideContainer>
    </EditProfileContainer>  
    
    <PostContainer>
    {user_list.map((item)=> {
      return(
        
        <MyPost key={item.id} {...item} _id={_id}></MyPost>
        
      )}
    )}
    
    </PostContainer> 
    {is_modal ? <ProfileUpdateModal {...user_info} close={closeModal}/> :null}
    </React.Fragment>
    )  
  }else{
    return(
    <React.Fragment>
    
    <EditProfileContainer>
      <LeftSideContainer>
      <ImageCircle src={user_list[0].profile} size={150}/>
      </LeftSideContainer>
    <RightSideContainer>
    <RightSideContainer1>
      <Text>{user_list[0].nickname}</Text>
    </RightSideContainer1>
    <CountPost> {user_list[0].nickname}님은 현재 {user_list.length}개의 게시물이 있습니다! </CountPost>
    </RightSideContainer>
    </EditProfileContainer>  
    
    <PostContainer>
    {user_list.map((item)=> {
      return(
        
        <MyPost key={item.id} {...item} _id={_id} ></MyPost>
        
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
  padding-bottom: 30px;
  display: flex;
  margin-top:50px;
  border-bottom: 2px solid grey;
  @media (max-width: 914px){
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  };
`

const LeftSideContainer = styled.div`
  margin-right: 30px;
`


const RightSideContainer = styled.div`
  margin-left: 30px;
`
const RightSideContainer1 = styled.div`
  display: flex;
`

const ImageCircle = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-size: cover;
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
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 5px 10px 5px;
  @media (max-width: 914px){
    width: 100%;
    justify-content: center;
  };
`;

const NoPost = styled.div`
  margin:auto;
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
font-size: 22px;
color: black;
margin-top: 30px;
word-spacing: 1.5px;
font-weight: bold;
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
  cursor: pointer;
  font-size: 14px;
  border-radius:4px;
`

export default Userpage ;