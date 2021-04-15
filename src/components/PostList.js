import React from 'react'

import styled from  'styled-components'
import { useSelector } from "react-redux"

import Post from './Post'

const PostList = () => {
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list)

  return(
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Post key={p.id} {...p} />
      })}
    </React.Fragment>
  )

}

const PostListContainer = styled.div`

`


export default PostList;