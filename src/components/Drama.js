import React, {useEffect} from 'react'

import Card from './Card'

import styled from 'styled-components'
import axios from 'axios'


const Drama = (props) => {
  useEffect(() => {
    axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=48bd7b02f3e54e9396629c5f1c959bf6&stdate=20210101&eddate=20210630&rows=10&cpage=1&signgucode=11&prfstate=02&shcate=AAAA`)
      .then((response) => {
        console.log(response)
      })
  }, [])


  return(
    <React.Fragment>
      <CardColumns>
        <Card/>
      </CardColumns>
    </React.Fragment>
  )

}

const CardColumns = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 150px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 30px;
`



export default Drama
