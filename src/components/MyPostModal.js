import React, {useState} from 'react';
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostWrite from './PostWrite'
import {useSelector, useDispatch} from 'react-redux'
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import {actionCreators as commentActions} from "../redux/modules/comment"

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const MyPostModal = (props) => {
  console.log(props)
  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)

  //댓글
  const dispatch =useDispatch();
  const user_info = useSelector((state) => state.user.user)
  const [comments, setComments ] = useState();
  const ok_submit = comments ? true : false
  const comment_list = useSelector((state) => state.comment.list[props.id])
  const is_comment = comment_list ? true : false
  console.log(props, props.markerId)

  const closeModal = () => {
    setModal(false)
  }
  const openWriteModal = () => {
    setWriteModal(true)
  }
  const closeWriteModal = () => {
    setWriteModal(false)
  }

  //댓글

  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id))
  }, [])

  const addComment = () => {
    dispatch(commentActions.addCommentAX(comments, props.id))
    setComments('')
  }

  const deleteComment = (id) => {
    dispatch(commentActions.deleteCommentAX(id, props.id))
  }

  const selectComment = (e) => {
    console.log(e.target.value)
    setComments(e.target.value)
  };
    
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>
        <ImageContainer src={props.image_url}>
        </ImageContainer>
        
        <TextContainer>
        <MoreHorizIcon style={{padding: "10px 0px 0px 240px"}} height="14px" width="14px" cursor="pointer" 
        onClick={() => {setModal(true)
        }}/>
       
        <NicknameText>{props.nickname}</NicknameText>
        <TitleText>{props.title}</TitleText>
        <ContentsText>{props.contents}</ContentsText>

        <CommentContainer>
        {is_comment ? 
          comment_list.map((c, idx) => {
            
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
            
          }) 
          :null}
        </CommentContainer>

        {/* 댓글입력 */}
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


        <StyleBox> 
        <PostPlace>{props.markername}</PostPlace>
        <InsertTime>{time(props.date)}</InsertTime>
        </StyleBox> 
        </TextContainer>
        

      </Modal>
      {is_modal? <PostUpdateModal boardId={props.id} markerId={props.markerId} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null}
      {is_writeModal? <PostWrite close={closeWriteModal} {...props} />
      :null}
    </React.Fragment>
  )
}

const Component = styled.div`
  position: fixed;
  // 시작점
  top: 0;
  left: 0;
  opacity: 0.6;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`
const CommentContainer =styled.div`
 width: 100%;
 height: 40%;
//  background-color: black;
 margin-top: 10px;
 overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
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

const CommentInput = styled.input`
  width: 80%;
  height: 20px;
  padding-right: 5px;
  background: transparent;
  border: none;
  outline: none;
  
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897F0;
  opacity: 1;
  font-weight: 600;
`;
const CommentInputBox = styled.div`
  width:  100%;
  height: 15%;
  margin-top: 4px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const ImageContainer = styled.img`
  
  width: 60%;
  height: 100%;

`
// const ImageInModal = styled.div`
//   width: 100%;
//   height: 100%;
//   border: none;
//   background-image: url("${(props) => props.image_url}");
//   object-fit: conver;
//   //짤리는거 보완

// `;

const Modal = styled.div`
  position: fixed;
  width: 700px;
  height: 400px;
  top:50%;
  left: 50%;
  //메모..
  transform: translate(-50%, -50%);
  background-color: white;
  //다시..
  z-index: 20;
  display: flex;
`

const NicknameText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 0px 0px 10px 10px;
`
const TitleText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    margin: 0px 0px 10px 10px;
    
`
const ContentsText = styled.div`
    color: black;
    font-size: 13px;
    padding-left: 10px;
`

const TextContainer= styled.div`
   width: 40%;
   display: column;
   

`
const InsertTime = styled.div`
  font-size: 12px;
  color: #999;
`

const PostPlace = styled.div`
  font-size: 12px;
  color: #999
`

const StyleBox = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 10px 10px 0px 10px;
`


  export default MyPostModal;