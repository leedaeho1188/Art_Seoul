import React, {useEffect, useState} from "react"
import Map from  "../components/Map"
import {actionCreators as markerActions} from "../redux/modules/marker"
import {useDispatch ,useSelector} from 'react-redux'
import styled from 'styled-components'
import PostList from '../components/PostList'

function Main() {
  const dispatch = useDispatch()
  const [ is_post, setPost ] = useState(false)

  useEffect(() => {
    dispatch(markerActions.getMarkerAX())
  }, [])

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

const MainContainer = styled.div`
`

export default Main;
