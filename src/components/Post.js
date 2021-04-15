import React, {useState} from 'react';
import styled from 'styled-components'

import {time} from '../shared/Time'
import PostUpdateModal from './PostUpdateModal'
import PostWrite from './PostWrite'
import ModalDetail from './ModalDetail'

import {useSelector, useDispatch} from 'react-redux'
import {actionCreators as commentActions} from "../redux/modules/comment"

import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';


const Post = (props) => {
  const dispatch = useDispatch()
  const user_info = useSelector((state) => state.user.user)
  const [comments, setComments ] = useState();
  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)
  const [ is_detail, setDetailModal ] = useState(false)
  const ok_submit = comments ? true : false
  const comment_list = useSelector((state) => state.comment.list[props.id])
  const is_comment = comment_list ? true : false

  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id))
  }, [])

  const selectComment = (e) => {
    console.log(e.target.value)
    setComments(e.target.value)
  };

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  const openWriteModal = () => {
    setWriteModal(true)
  }
  const closeWriteModal = () => {
    setWriteModal(false)
  }

  const openDetailModal = () => {
    setDetailModal(true);
  };

  const closeDetailModal = () => {
    setDetailModal(false);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentAX(comments, props.id))
    setComments('')
  }

  const deleteComment = (id) => {
    dispatch(commentActions.deleteCommentAX(id, props.id))
  }

  return (
    <React.Fragment>
      <PostInner>

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
          <PostImage src={props.image_url} onClick={openDetailModal} />
          <PostTitle> {props.title} </PostTitle>
          <PostContents>
            {props.contents}
          </PostContents>
          {is_comment ? 
          comment_list.map((c, idx) => {
            if(idx < 2){
              return <ReplyBox>
                        <Replys>
                          <ReplyWriter>{c.nickname}</ReplyWriter>
                          <Reply>{c.comment}</Reply>
                        </Replys>
                          {c.userId === user_info.id ? 
                          <DeleteBtn onClick={() => {
                            deleteComment(c.id)
                          }}>
                            <BackspaceOutlinedIcon/>
                          </DeleteBtn>
                          :null}
                      </ReplyBox>
            }
          }) 
          :null}
          <PostBottom>
            <InsertTime>
              {time(props.date)}
            </InsertTime>
            <PostPlace>
              {props.markername}
            </PostPlace>
          </PostBottom>
        </PostBody>
        <CommentInputBox>
          <CommentInput type="text" placeholder='댓글달기...' onChange={selectComment} value={comments} onKeyPress={(e) => {
              if (e.key === 'Enter'){addComment()}
            }} />
          {ok_submit ? (
            <UploadBtn onClick={addComment} style={{cursor: 'pointer'}} >게시</UploadBtn>
          ):(               
            <UploadBtn style={{opacity: "0.3"}} >게시</UploadBtn>                  
          )}
        </CommentInputBox>
      </PostBox>
      </PostInner>
      {is_modal? <PostUpdateModal boardId={props.id} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null}
      {is_writeModal? <PostWrite close={closeWriteModal} {...props} />
      :null}
      {is_detail? <ModalDetail close={closeDetailModal} {...props} open={openModal} comment_list={comment_list} is_comment = {is_comment} user_info={user_info} deleteComment={deleteComment} />
      :null}
      
    </React.Fragment>

  )

}

const PostInner = styled.div`
  width: 900px;
  margin:auto;
  @media (max-width: 900px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const PostBox = styled.div`
  // margin: auto;
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 60px; 
  background: white;
  // padding-bottom: 20px;
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
  cursor: pointer;
`
const PostTitle = styled.div`
  padding: 15px 20px;
  font-weight: 600;
`
const PostContents = styled.div`
  padding: 0px 20px;
`

const ReplyBox = styled.div`
  padding: 15px 20px 0px 20px;
  display: flex;
  justify-content: space-between;
  // align-items: center;
`
const Replys = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
`;

const ReplyWriter = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
  white-space: nowrap;
`;

const Reply = styled.div`
  font-size: 14px;
  box-sizing: border-box;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  border-bottom: 1px solid #EFEFEF;
`

const InsertTime = styled.div`
  font-size: 12px;
  color: #999;
`

const PostPlace = styled.div`
  font-size: 12px;
  color: #999
`

const CommentInputBox = styled.div`
  width:  100%;
  height: 56px;
  margin-top: 4px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const CommentInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 90%;
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897F0;
  opacity: 1;
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  margin-right: 15px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`

export default Post