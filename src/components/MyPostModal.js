import React, {useState} from 'react';
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import PostWrite from './PostWrite'
import {useSelector, useDispatch} from 'react-redux'
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import {actionCreators as commentActions} from "../redux/modules/comment"
import {history} from "../redux/configureStore";

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const MyPostModal = (props) => {
  console.log(props)
  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)
  // const _id = props.match.params.id;
  const _id = window.location.href.split("/")[4]

  

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
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>
        
      <ModalComponent>
        <ModalImg src={props.image_url} />
        <ModalRightContainer>
          <ModalHeader>
            <ModalLeftHeader>
              <ModalProfile src={props.profile} />
              <ModalAuthor>{props.nickname}</ModalAuthor>
            </ModalLeftHeader>
            <ModalRightHeader>
              {user_info.id==_id ?
              <MoreHorizIcon style={{padding: "10px 0px 0px 200px"}} height="14px" width="14px" cursor="pointer" 
              onClick={() => {setModal(true)
              }}/> :null}
            </ModalRightHeader>
          </ModalHeader>
     
       
     
        

        <CommentContainer>
        <TitleText>{props.title}</TitleText>
        <ContentsText>{props.contents}</ContentsText>
        {is_comment ? 
          comment_list.map((c, idx) => {
            
              return <ReplyBox>
                        
                       
                        <Replys>
                          <ReplyProfile src={c.profile} />
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

{/* 
        <StyleBox> 
        <PostPlace>{props.markername}</PostPlace>
        <InsertTime>{time(props.date)}</InsertTime>
        </StyleBox>  */}
        </ModalRightContainer>
        {is_modal? <PostUpdateModal boardId={props.id} markerId={props.markerId} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null}
      {is_writeModal? <PostWrite close={closeWriteModal} {...props} />
      :null}
      </ModalComponent>
    </React.Fragment>
  )
}

const Component = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0.6;
  height: 1000vh;
  width: 1000vw;
  background-color: black;
  z-index: 10;
`
const CommentContainer =styled.div`
 width: 100%;
 height: 70%;
//  background-color: black;
 margin-top: 5px;
 margin-left: 10px;
 overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`
const ExitContainer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;  
`
const ExitBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`

const ReplyBox = styled.div`
  padding: 15px 20px 0px 10px;
  display: flex;
  justify-content: space-between;
  // align-items: center;
`
const ReplyProfile = styled.img`
  border-radius: 50%;
  background-size: cover;
  height: 30px;
  width: 30px;
  margin-right: 6px;
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
  padding-left: 0px;
  margin-left: 10px;
  background: transparent;
  border: none;
  outline: none;
  
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897F0;
  opacity: 1;
  font-weight: 600;
  margin-right: 10px;
`;
const CommentInputBox = styled.div`
  width:  100%;
  height: 10%;
  margin: 4px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #EFEFEF;
`

const ModalImg = styled.img`
  width: 550px;
  height: 600px;
  @media (max-width: 950px){
    display:none;
  }
`

const ModalComponent = styled.div`
  position: fixed;
  width: 915px;
  height: 600px;
  top:50%;
  left: 50%;
  transform: translate(-49%, -50%);
  background-color: white;
  z-index: 20;
  display:flex;
  @media (max-width: 950px){
    width:350px;
  }
  @media (max-width: 350px){
    width: 100%
  }
`
const ModalRightContainer = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #EFEFEF;
`

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #EFEFEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`

const ModalRightHeader = styled.div`
  cursor: pointer;
`
const ModalAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`

const ModalProfile = styled.img`
  border-radius: 50%;
  background-size: cover;
  height: 30px;
  width: 30px;
  margin-right: 6px;
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
    font-size: 22px;
    margin: 0px 0px 10px 10px;
    
`
const ContentsText = styled.div`
    color: black;
    font-size: 18px;
    padding-left: 10px;
    margin-bottom: 30px;
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