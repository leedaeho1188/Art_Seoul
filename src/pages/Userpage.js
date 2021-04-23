import React,{useState,useEffect} from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post";
import { Settings } from "@material-ui/icons";
import ProfileUpdateModal from "../components/ProfileUpdateModal";

// 유저가 작성한 게시물들을 모아볼 수 있으며 
// 다른 사람들의 게시물도 같은 형식으로 열람이 가능합니다
const Userpage = (props) => {
 const dispatch = useDispatch();
 const _id = props.match.params.id
 const user_list = useSelector((state) => state.post.userlist);
 const user_info = useSelector((state) => state.user.user);
 
 const [ is_modal, setDetailModal ] = useState();
    const openModal = () => {
        setDetailModal(true);
      };
    const closeModal = () => {
        setDetailModal(false);
      };

  // url에 붙어서 나오는 id를 보내서 userlist를 업데이트합니다.
  // + 해당 id가 변화할 때마다 리렌더링을 합니다. 
  React.useEffect(() => {
    dispatch(postActions.getuserPostAX(_id));
    window.scrollTo(0,0)
    },[_id]);
 
  // 현재 유저의 페이지이며 작성한 게시물이 없는 경우입니다
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

  // 현재 유저의 페이지이며 작성한 게시물이 있는 경우입니다.
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

  // 다른 유저의 페이지이며 작성한 게시물이 있는 경우입니다.
  // 다른 유저는 게시물을 클릭해서 진입하므로 작성한 게시물이 없는 경우는 없습니다.
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

  // 줄바꿈 자동으로 되도록 설정합니다
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