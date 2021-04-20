import React, {useEffect} from 'react'

import Card from './Card'

import styled from 'styled-components'
import axios from 'axios'


const Drama = (props) => {



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
