import React from "react";
import styled from "styled-components";
import Card from "../components/Card"


//해당 user가 작성한 게시글 정보를 전부 내려주면 middleware를 통해서 reducer에 정보저장
  //해당 정보를 reducer에서 useSelector로 가져오고
const Mypage = () => {

  const mypost_list=[
    {id: 0, name:"test1"},{id: 2, name:"test2"},
    {id: 3, name:"test3"},{id: 4, name:"test4"},
    {id: 6, name:"test5"}
  ];

  return(
  <React.Fragment>
  <PostContainer>
  
  {mypost_list.map((item,idx)=> {
    return(
      
      <Card key={item.id} {...item}></Card>
      
    )}
  )};
  
  </PostContainer> 
  </React.Fragment>
  )
};


const PostContainer = styled.div`
  margin:auto;
  width: 600px;
  height: 900px;
  background-color: black;
  border: 1px solid #e9ecef;
  margin-top:70px;     
`;


const Text = styled.p`
  font-size: ${(props) => (props.size ? `${props.size}` : "16px")};
  ${(props) => (props.underline ? "text-decoration: underline;" : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  margin: 4px 0px;
  text-align: left;
`;

export default Mypage;
