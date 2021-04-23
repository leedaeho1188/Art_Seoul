import React, {useEffect, useState} from "react"
import Map from  "../components/Map"
import {actionCreators as markerActions} from "../redux/modules/marker"
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import PostList from '../components/PostList'

function Main() {
  const dispatch = useDispatch()
  const [ is_post, setPost ] = useState(false)

  //페이지가 렌더링됬을 때 서버에서 마커 정보를 가져옵니다.
  useEffect(() => {
    dispatch(markerActions.getMarkerAX())
  }, [])

  // <PostList>는 마커를 눌렀을 때 보여줘야되기 때문에 showPost함수를 Map 컴포넌트에다가 전달했습니다.
  const showPost = () => {
    setPost(true)
  }

  return (
    <React.Fragment>
      <Map showPost = {showPost} />
      {is_post ?
        <PostList/>
      : null }
    </React.Fragment>
  )
}


export default Main;
