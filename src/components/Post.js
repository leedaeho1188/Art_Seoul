import React from 'react';
import styled from 'styled-components'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Post = () => {
  
  return (
    <React.Fragment>
      <PostBox>
        <PostHeader>
          <PostAuthor>
            Bradlee
          </PostAuthor>
          <MoreHorizIcon height="14px" width="14px" cursor="pointer"/>
        </PostHeader>
        <PostBody>
          <PostImage src="https://t1.daumcdn.net/liveboard/cineplay/f97e52678e7b4f78af698b3cd42dbce6.JPG" />
          <PostTitle> 🐱캣츠 40주년 내한공연 </PostTitle>
          <PostContents>
            캣츠 40주년 내한공연 너무 재미있네요 이거는 꼭 추천합니다.
          </PostContents>
          <PostBottom>
            <InsertTime>
              1시간전
            </InsertTime>
            <PostPlace>
              예술의 전당
            </PostPlace>
          </PostBottom>
        </PostBody>

      </PostBox>
    </React.Fragment>

  )

}

const PostBox = styled.div`
  margin: auto;
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px; 
  background: white;
  padding-bottom: 20px;
  @media (max-width: 614px){
    width: 100vw;
  }
`

const PostHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  box-sizing: border-box;

  @media (max-width: 614){
    width: 100%;
    heigth: 100%;
  }
`
const PostAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const PostBody = styled.div`
  // overflow: hidden;
`

const PostImage = styled.img`
  width: 100%;
  height: auto;  
  background-size: cover;
  // cursor: pointer;
`
const PostTitle = styled.div`
  padding: 25px 20px;
  font-weight: 600;
`
const PostContents = styled.div`
  padding: 0px 20px;
`
const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 20px;
`

const InsertTime = styled.div`
  font-size: 12px;
  color: #999;
`

const PostPlace = styled.div`
  font-size: 12px;
  color: #999
`

export default Post