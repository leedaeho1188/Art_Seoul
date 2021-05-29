import React, {useEffect, useState} from 'react' 

import Card from './Card'
import {config} from '../shared/config'

import styled from 'styled-components'
import axios from 'axios'

import Loader from "react-loader-spinner"

const Traditional = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async() => {
      setLoading(true)
      const result = await axios.get(`${config.api}/artinfo/koreansong`)
      // console.log(result)
      setData(result.data.dbs.db)
      setLoading(false)
    }
    
    get();
    props.NotDance();
    props.NotMusical();
    props.NotClassic();
    props.NotDrama();
    props.SelectTraditional();
      
      
  }, [])


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
          {/* 오픈 api에서 데이터가 한개일 때는 배열형식으로 보내지 않고 dictionary형식으로 보낸다. 
          그래서 배열이 아닐 경우에는 바로 데이터를 Card component에 보낸다. */}
          {Array.isArray(data)? data.map((d) => (
            <Card key={d.mt20id._text} {...d} />
          )): <Card {...data} />}
        </CardColumns>
      }
    </React.Fragment>
  )

}

const CardColumns = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 30px;
`

const SpinContainer = styled.div`
  margin: auto;
  margin-top: 250px;
  display: flex;
  justify-content: center;
`


export default Traditional