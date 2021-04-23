import React, {useState} from 'react'

import Drama from '../components/Drama'
import Musical from '../components/Musical'
import Classic from '../components/Classic'
import Traditional from '../components/Traditional'
import Dance from '../components/Dance'

import styled from 'styled-components'

const PerformInfo = () => {

  const [drama, setDrama] = useState(true)
  const [musical, setMusical] = useState(false)
  const [classic, setClassic] = useState(false)
  const [traditional, setTraditional] = useState(false)
  const [dance, setDance] = useState(false)
  
  // 해당 카테고리가 선택되었을 때 그 카테고리만 style을 주기위한 코드입니다.
  const SelectDrama = () => {
    document.getElementById('drama').style.fontWeight = '600'
    document.getElementById('drama').style.textDecoration = 'underline'
  }

  const SelectMusical = () => {
    document.getElementById('musical').style.fontWeight = '600'
    document.getElementById('musical').style.textDecoration = 'underline'
  }

  const SelectClassic = () => {
    document.getElementById('classic').style.fontWeight = '600'
    document.getElementById('classic').style.textDecoration = 'underline'
  }

  const SelectTraditional = () => {
    document.getElementById('traditional').style.fontWeight = '600'
    document.getElementById('traditional').style.textDecoration = 'underline'
  }

  const SelectDance = () => {
    document.getElementById('dance').style.fontWeight = '600'
    document.getElementById('dance').style.textDecoration = 'underline'
  }

  const NotDrama = () => {
    document.getElementById('drama').style.fontWeight = 'normal'
    document.getElementById('drama').style.textDecoration = 'none'
  }

  const NotMusical = () => {
    document.getElementById('musical').style.fontWeight = 'normal'
    document.getElementById('musical').style.textDecoration = 'none'
  }

  const NotClassic = () => {
    document.getElementById('classic').style.fontWeight = 'normal'
    document.getElementById('classic').style.textDecoration = 'none'
  }

  const NotTraditional = () => {
    document.getElementById('traditional').style.fontWeight = 'normal'
    document.getElementById('traditional').style.textDecoration = 'none'
  }

  const NotDance = () => {
    document.getElementById('dance').style.fontWeight = 'normal'
    document.getElementById('dance').style.textDecoration = 'none'
  }
  

  return(
    <React.Fragment>
      <InfoHeader>
        <Word id='drama' onClick={() => {
          setMusical(false)
          setClassic(false)
          setTraditional(false)
          setDance(false)
          setDrama(true)
        }} >연극</Word>
        <Word id='musical' onClick={() => {
          setClassic(false)
          setTraditional(false)
          setDance(false)
          setDrama(false)
          setMusical(true)
        }}>뮤지컬</Word>
        <Word id='classic' onClick={() => {
          setTraditional(false)
          setDance(false)
          setDrama(false)
          setMusical(false)
          setClassic(true)
        }}>클래식</Word>
        <Word id='traditional' onClick={() => {
          setDance(false)
          setDrama(false)
          setMusical(false)
          setClassic(false)
          setTraditional(true)
        }}>국악</Word>
        <Word id='dance' onClick={() => {
          setDrama(false)
          setMusical(false)
          setClassic(false)
          setTraditional(false)
          setDance(true)
        }}>무용</Word>
      </InfoHeader>
      {drama? <Drama SelectDrama={SelectDrama} NotDance={NotDance} NotMusical={NotMusical} NotClassic={NotClassic} NotTraditional={NotTraditional} />
      :null}
      {musical? <Musical SelectMusical={SelectMusical} NotDrama={NotDrama} NotDance={NotDance} NotClassic={NotClassic} NotTraditional={NotTraditional} />
      :null}
      {classic? <Classic SelectClassic={SelectClassic} NotDrama={NotDrama} NotDance={NotDance} NotMusical={NotMusical} NotTraditional={NotTraditional}/>
      :null}
      {traditional? <Traditional SelectTraditional={SelectTraditional} NotDrama={NotDrama} NotDance={NotDance} NotMusical={NotMusical} NotClassic={NotClassic}/>
      :null}
      {dance? <Dance SelectDance={SelectDance} NotMusical={NotMusical} NotDrama={NotDrama} NotClassic={NotClassic} NotTraditional={NotTraditional}/>
      :null}
    </React.Fragment>
  )

}

const InfoHeader = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 150px;
`

const Word = styled.div`
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    font-weight: 600;
  }
`

export default PerformInfo