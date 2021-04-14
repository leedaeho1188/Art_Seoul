import React from "react";
import styled from "styled-components";
import MyPost from "../components/MyPost";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/post";


//해당 user가 작성한 게시글 정보를 전부 내려주면 middleware를 통해서 reducer에 정보저장
  //해당 정보를 reducer에서 useSelector로 가져오고
const Mypage = () => {
 //순서 너무 중요하다...
  const dispatch = useDispatch();
  const my_list = useSelector((state) => state.post.mylist);
 
  
  React.useEffect(() => {
      dispatch(userActions.getmyPostAX());
  },[]);


  return(
  <React.Fragment>
  <PostContainer>
 
  {my_list.map((item)=> {
    return(
      <MyPost key={item.id} {...item}></MyPost>
    )}
  )}
  
  </PostContainer> 
  </React.Fragment>
  )
};


const PostContainer = styled.div`
  margin:auto;
  width: 600px;

  background-color: black;
  border: 1px solid #e9ecef;
  margin-top:70px;     
  display:flex;
  
  // 줄바꿈 자동으로 되도록 + flex-item간의 간격이 줄어들도록!
  flex-wrap: wrap;
  align-content:flex-start;
  padding-bottom: 20px;

  
`;



export default Mypage;
