import React from 'react' 

import styled from 'styled-components'

const Card = (props) => {

  return(
    <React.Fragment>
      <CardBox>
        <CardImg>
          <CardImgTop src={props.poster._text} />
        </CardImg>
        <CardBody>
          <CardTitle>{props.prfnm._text}</CardTitle>
          <Hr/>
          <CardDate>{props.prfpdfrom._text} ~ {props.prfpdto._text}</CardDate>
        </CardBody>
        <CardFooter>
          <CardLocation>{props.fcltynm._text}</CardLocation>
        </CardFooter>
      </CardBox>
    </React.Fragment>

  )

}

const CardBox = styled.div`
  border-radius: 4px;
  display: grid;
  grid-template-rows: 400px max-content max-content;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  background-color: white;
  &:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    transform: translateY(-8px);
  };
`

const CardImg = styled.div`
  width: 100%;  
  overflow: hidden;
`

const CardImgTop = styled.img`
  width: 100%;
  object-fit: cover;
`

const CardBody = styled.div`
  padding: 12px 20px;
`
const CardTitle = styled.div`
  color: black;
  font-size: 18px;
  font-weight: bold;
`
const CardDate = styled.div`
  font-size: 16px;
`

const CardFooter = styled.div`
  padding: 0 20px 20px 20px;

`

const CardLocation = styled.div`
  font-size: 14px;
  -webkit-line-clamp: 1;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`

const Hr = styled.hr`
  border-width: 0;
  height: 1px;
  color: gray;
  background-color: gray;
`

export default Card