import React, { useEffect } from 'react'

import Upload from '../shared/Upload'

import { useDispatch, useSelector } from "react-redux";
import {actionCreators as markerActions} from "../redux/modules/marker"

import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const PostWrite = (props) => {
  const dispatch = useDispatch()
  const marker_info = useSelector((state) => state.marker.list)
  const marker_id = props.match.params.id
  const idx = marker_info.findIndex(m => m.id === marker_id )
  const marker = marker_info[idx]
  const preview = useSelector((state) => state.image.preview)
  
  useEffect(() => {
    console.log("야호")
    dispatch(markerActions.getMarkerAX())
  }, [])
  
  return (
    <React.Fragment>
      <WriteBox>
        <WriteHeader>
          <WriteHeaderLeft>
            <PostAuthor>
              user_name
            </PostAuthor>
          </WriteHeaderLeft>
          {marker? marker.title :null}
        </WriteHeader>
        <WriteContent>
          <WriteUpload>
            <Upload/>
          </WriteUpload>
          <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"} />
          <WriteTitle>
            <TextField id="standard-basic" label="📝글 제목" style={{width: "100%"}} />
          </WriteTitle>
          <TextField
                id="outlined-multiline-static"
                label="📝글 작성"
                multiline
                rows={6}
                variant="outlined"
                // value={contents}
                // onChange = {changeContents}
              />
          <WriteSubmit onClick={() => {

          }} >
            게시글 작성
          </WriteSubmit>
        </WriteContent>
      </WriteBox>
    </React.Fragment>
  )

}

const WriteBox = styled.div`
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 60px; 
  margin-top: 130px;
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
  padding: 0px 20px;
`

const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const PostAuthor = styled.div`
  font-size: 14px;
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



export default PostWrite