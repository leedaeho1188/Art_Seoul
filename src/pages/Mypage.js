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
  }, []);

  console.log(my_list)

  

  const mypost_list=[
    {id: 0, src:"https://images.unsplash.com/photo-1618199784928-4aae3694f03f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {id: 2, src:"https://images.unsplash.com/photo-1549439602-43ebca2327af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {id: 3, src:"https://images.unsplash.com/photo-1446822775955-c34f483b410b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {id: 4, src:"https://images.unsplash.com/photo-1519868343531-805e97cbda3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"},
    {id: 6, src:"https://images.unsplash.com/photo-1476886188504-fd741bfc8e8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80"}, 
    {id: 7, src:"https://images.unsplash.com/photo-1476886188504-fd741bfc8e8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80"}, 
  ];

  return(
  <React.Fragment>
  <PostContainer>
 
  {mypost_list.map((item,idx)=> {
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
