import React, {useState} from 'react';
import styled from 'styled-components'

import {time} from '../shared/Time'
import PostUpdateModal from './PostUpdateModal'

import {useSelector} from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const Post = (props) => {
  const user_info = useSelector((state) => state.user.user)
  const [ is_modal, setModal ] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  return (
    <React.Fragment>
      <PostBox>
        <PostHeader>
          <PostAuthor>
            {props.nickname}
          </PostAuthor>
          {user_info.id === props.userId? 
          <MoreHorizIcon height="14px" width="14px" cursor="pointer" onClick={() => {
            setModal(true)
          }}  />
          : null}
        </PostHeader>
        <PostBody>
          <PostImage src={props.image_url} />
          <PostTitle> {props.title} </PostTitle>
          <PostContents>
            {props.contents}
          </PostContents>
          <PostBottom>
            <InsertTime>
              {time(props.date)}
            </InsertTime>
            <PostPlace>
              {props.markername}
            </PostPlace>
          </PostBottom>
        </PostBody>
      </PostBox>
      {is_modal? <PostUpdateModal nickname = {props.nickname} close={closeModal} />
      :null}
    </React.Fragment>

  )

}

const PostBox = styled.div`
  margin: auto;
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 60px; 
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