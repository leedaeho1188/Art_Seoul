import React, {useState} from 'react';
import styled from "styled-components";
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import PostWrite from './PostWrite'
import {useSelector, useDispatch} from 'react-redux'
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import {actionCreators as commentActions} from "../redux/modules/comment"

//MyPost에서 진입하는 상세페이지 모달입니다
const MyPostModal = (props) => {
  
  const dispatch =useDispatch();
  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)
  const _id = window.location.href.split("/")[4]

  
  const user_info = useSelector((state) => state.user.user)
  const [comments, setComments ] = useState();
  const ok_submit = comments ? true : false
  const comment_list = useSelector((state) => state.comment.list[props.id])
  const is_comment = comment_list ? true : false
  

  const closeModal = () => {
    setModal(false)
  }
  const openWriteModal = () => {
    setWriteModal(true)
  }
  const closeWriteModal = () => {
    setWriteModal(false)
  }

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

  
  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id))
  }, [])

  
  //현재 user정보와 url뒤에 붙는 id값이 일치할 때 수정/삭제가 가능합니다(삼항연산자)
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
        <Markername>{props.markername}</Markername>
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
        </ModalRightContainer>
      </ModalComponent>

      {is_modal? <PostUpdateModal boardId={props.id} markerId={props.markerId} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null}
      {is_writeModal? <PostWrite _id={props._id} close={closeWriteModal} {...props} />
      :null}
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
 margin: 5px 10px;
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
const TitleText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 22px;
    margin: 0px 10px 10px 10px;
    
`
const ContentsText = styled.div`
    color: black;
    font-size: 18px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
`
const Markername = styled.div`
  margin-bottom: 30px;  
  text-align: right;
  margin-right: 30px;
  color: gray;
  font-size: 14px;
`
  export default MyPostModal;