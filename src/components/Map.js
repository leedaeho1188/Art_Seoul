import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import MarkerModal from './MarkerModal'
import PostWrite from './PostWrite'

import {useDispatch ,useSelector} from 'react-redux'
import {actionCreators as markerActions} from "../redux/modules/marker"
import {actionCreators as postActions} from "../redux/modules/post"

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { TrafficRounded } from '@material-ui/icons'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const { kakao } = window;

const Map = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const [ is_modal, setModal ] = useState(false);
  const [ is_writeModal, setWriteModal ] = useState(false);
  const [ is_write, setWrite ] = useState(false);
  const [ markerId, setmarkerId ] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [ zoomIn, setZoomIn ] = useState();
  const [_map, setMap ] = useState();
  const positions = useSelector((state) => state.marker.list)
  const post_list = useSelector((state) => state.post.list)

  useEffect(() => {
    const container = document.getElementById('myMap'); //지도 표시할 div
      const options = {
        center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981), //지도 중심 좌표
        level: 8 //지도의 확대 레벨
      };
    const map = new kakao.maps.Map(container, options);//지도를 생성합니다.
    setMap(map)
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 지도를 클릭한 위치에 표출할 마커입니다.
    positions.map((p, idx) => {

      var imageSize = new kakao.maps.Size(24, 35);

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(p.latitude, p.longitude) ,
        title: p.title,
        image: markerImage,
      });

      kakao.maps.event.addListener(markers, 'click', function(){
        markerDetail(p.id)
      })
    })

    const marker = new kakao.maps.Marker({
      position: map.getCenter()
    })

    marker.setMap(map);

    // 지도에 마커를 표시합니다.
    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
      //클릭한 위도, 경도 정보를 가져옵니다.
      const latlng = mouseEvent.latLng;
      //마커 위치를 클릭한 위치로 옮깁니다.
      marker.setPosition(latlng);

      setLatitude(latlng.getLat())
      setLongitude(latlng.getLng())
    })

    //마커에 클릭이벤트를 등록하기
    kakao.maps.event.addListener(marker, 'click', function(){
      setModal(true)
    })
  }, [positions])

  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  }

  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  }
  
  const markerDetail = (id) => {
    setmarkerId(id)
    setWrite(true)
    props.showPost()
    dispatch(postActions.getPostAX(id))
  }

  const closeWriteModal = () => {
    setWriteModal(false)
  }

  const closeModal = () => {
    setModal(false)
  }
  console.log(zoomIn)
  return(
    <React.Fragment>
        <MapContainer id='myMap'>
          <MapBtnContainer>
              <MapControlBtn  onClick={zoomIn} style={{borderRight: "1px solid #919191"}} ><AddIcon/></MapControlBtn>
              <MapControlBtn  onClick={zoomOut}  ><RemoveIcon/></MapControlBtn>
          </MapBtnContainer>  
        </ MapContainer>
      <div id='ClickLatlng'></div>
      {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} />
      : null }
      {is_write && is_login ? 
      <AddBtn>
      <Fab color="primary" aria-label="add" variant="extended" onClick={() => {
        document.getElementById('root').scrollTo(0,0)
        setWriteModal(true)
      }}>
        <AddIcon /><Word>게시글추가</Word>
      </Fab>
      </AddBtn>
      : null}
      {is_writeModal? <PostWrite markerId = {markerId} close={closeWriteModal} />
      : null}
    </React.Fragment>
  )

}



const MapContainer = styled.div`
  position: relative;
  margin: auto;
  margin-top: 150px;
  margin-bottom: 60px;
  width: 900px;
  height: 500px;
  @media (max-width: 1000px){
    width: 80%;
  };
  @media (max-width: 450px){
    width: 90%;
    height: 400px;
  }
`

const MapBtnContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  z-index: 5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border:1px solid #919191;
  background-color: #F5F5F5;
`

const MapControlBtn = styled.div`
  width:50px;
  height:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
  cursor:pointer;
`


const AddBtn = styled.div`
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 10;
`
const Word = styled.span`
  @media (max-width:425px){
    display: none
  }
`

export default Map
