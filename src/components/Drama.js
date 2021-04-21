import React, {useEffect, useState} from 'react'

import Card from './Card'
import {config} from '../shared/config'

import styled from 'styled-components'
import axios from 'axios'

import Loader from "react-loader-spinner"

const Drama = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const get = async() => {
      setLoading(true)
      const result = await axios.get(`${config.api}/artinfo`)
      console.log(result)
      setData(result.data.dbs.db)
      setLoading(false)
    }
    
    get();
      
      
  }, []) 
  console.log(data)

  return(
    <React.Fragment>
      {loading ? 
        <SpinContainer>
          <Loader
            type="Oval"
            color="#3d66ba"
            height={80}
            width={80}
            timeout={2000}
          />
        </SpinContainer>
      : <CardColumns>        
          {data.map((d) => (
            <Card key={d.mt20id._text} {...d} />
          ))}
        </CardColumns>
      }
      
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

const SpinContainer = styled.div`
  margin: auto;
  margin-top: 350px;
  display: flex;
  justify-content: center;

`


export default Drama
