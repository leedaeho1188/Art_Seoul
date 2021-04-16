import React from 'react'

import styled from  'styled-components'
import { useSelector, useDispatch } from "react-redux"
import {actionCreators as postActions} from "../redux/modules/post"

import InfinityScroll from "../shared/InfinityScroll";
import Post from './Post'

const PostList = () => {
  const dispatch = useDispatch()
  const post_list = useSelector((state) => state.post.list);
  const lastPost = post_list[post_list.length -1]
  const next = useSelector((state) => state.post.next)
  const is_loading = useSelector((state) => state.post.is_loading)
  // console.log(post_list ,lastPost)

  return(
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          // console.log("하이")
          dispatch(postActions.getPostAX(lastPost.markerId, lastPost.id))
        }}
        is_next={next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          return <Post key={p.id} {...p} />
        })}
      </InfinityScroll>
    </React.Fragment>
  )

}

const PostListContainer = styled.div`

`


export default PostList;