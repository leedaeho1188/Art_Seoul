import React from 'react'

import styled from  'styled-components'

import Post from './Post'

const PostList = () => {

  return(
    <PostListContainer>
      <Post/>
    </PostListContainer>
  )

}

const PostListContainer = styled.div`
  margin-top: 20px;

`


export default PostList;