import React, { useEffect, useState } from 'react'

import Upload from '../shared/Upload'

import { useDispatch, useSelector } from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image"
import {actionCreators as markerActions} from "../redux/modules/marker"
import {actionCreators as postActions} from "../redux/modules/post"
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const PostWrite = (props) => {
  const dispatch = useDispatch()
  const post_id = props.id;
  const is_edit = post_id ? true : false;
  const [title, setTitle] = useState(is_edit? props.title:"")
  const [contents, setContents] = useState(is_edit? props.contents:"")
  const [image, setImage] = useState()
  const marker_list = useSelector((state) => state.marker.list)
  const idx = marker_list.findIndex(m => m.id === props.markerId)
  const marker = marker_list[idx]
  const preview = useSelector((state) => state.image.preview)


  
  useEffect(() => {
    {is_edit? dispatch(imageActions.setPreview(props.image_url))
      : dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))}
  }, [])
  
  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  const addPost = () => {
    console.log(marker)
    let post = {
      markername: marker.title,
      markerId: props.markerId,
      title: title,
      contents: contents,
      image: image
    }
    console.log(post)
    dispatch(postActions.addPostAX(post))
    props.close()
    window.scrollTo(0,0)
  }

  const editPost = () => {
    let post ={
      title: title,
      contents: contents,
      image: image,
    }
    console.log(post)
    
    dispatch(postActions.editPostAX(post, post_id))
    dispatch(postActions.editMyPostAX(post, post_id))
    props.close()
    window.scrollTo(0.0)
  }

  return (
    <React.Fragment>
      <WriteBackground onClick={props.close} />
      <WriteBox>
        <WriteContent>
          <WriteUpload>
            <Upload setImage={setImage} />
          </WriteUpload>
          <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"} />
          <WriteTitle>
            <TextField id="standard-basic" value={title} label="📝글 제목" style={{width: "100%"}} onChange={changeTitle} />
          </WriteTitle>
          <TextField
                id="outlined-multiline-static"
                label="📝글 작성"
                multiline
                rows={6}
                variant="outlined"
                value={contents}
                onChange = {changeContents}
              />
          {is_edit ? <WriteSubmit onClick={editPost}>
            게시글 수정
          </WriteSubmit>
          :<WriteSubmit onClick={addPost}>
          게시글 작성
        </WriteSubmit> }
          
        </WriteContent>
      </WriteBox>
    </React.Fragment>
  )

}

const WriteBackground = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 30;
  
`
const WriteContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  padding: 55px 0px;
  z-index: 20;
`
const WriteBox = styled.div`
  position: absolute;
  z-index: 40;
  top: 55px;
  left: 50%;
  transform: translate(-50%);
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin: auto;
  background: white;
  padding-bottom: 20px;
  @media (max-width: 614px){
    width: 100vw;
  }
`
const WriteHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
`

const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const PostAuthor = styled.div`
  font-size: 18px;
  font-weight: 600;
`
const WriteContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const WriteUpload = styled.div`
  width: 100%;
  padding: 10px 20px;
  margin-top: 20px;
`
const WriteImg = styled.img`
  width: 100%;
  height: auto;
  margin: 10px 0;
  box-sizing: border-box;
`
const WriteTitle = styled.div`
  width: 50%;
  margin-bottom: 30px;
  margin-left: 15px;
`


const WriteSubmit = styled.button`
  margin: auto;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  background-color: #FFE812;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
`



export default PostWrite;