import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import MarkerModal from './MarkerModal'
import PostWrite from './PostWrite'

import {useDispatch ,useSelector} from 'react-redux'
import {actionCreators as markerActions} from "../redux/modules/marker"
import {actionCreators as postActions} from "../redux/modules/post"

import MapIcon from '@material-ui/icons/Map';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { WorkRounded } from '@material-ui/icons'

const { kakao } = window;

const Map = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const [ is_modal, setModal ] = useState(false);
  const [ is_writeModal, setWriteModal ] = useState(false);
  const [ is_write, setWrite ] = useState(false);
  const [ is_Top, setTop ] = useState(false)
  const [ hot, setHot ] = useState(false);
  const [ markerId, setmarkerId ] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [_map, setMap ] = useState();
  const normalMarker = useSelector((state) => state.marker.normal)
  const hotMarker = useSelector((state) => state.marker.hot)
  const post_list = useSelector((state) => state.post.list)
  
  useEffect(() => {
    const container = document.getElementById('myMap'); //지도 표시할 div
      const options = {
        center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981), //지도 중심 좌표
        level: 8 //지도의 확대 레벨
      };
    const map = new kakao.maps.Map(container, options);//지도를 생성합니다.

    // useEffect밖으로 map정보를 가져오기위해 useState로 함수를 만들었습니다.
    setMap(map)

    // noraml마커와 hot마커 이미지입니다.
    var normalImageSrc = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png"
    var hotImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 게시물 수가 10개 미만인 마커를 표시합니다.
    normalMarker.map((p, idx) => {

      var imageSize = new kakao.maps.Size(35, 35);

      var markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(p.latitude, p.longitude) ,
        title: p.title,
        image: markerImage,
      });

      kakao.maps.event.addListener(markers, 'click', function(){
        markerDetail(p.id)
        setHot(false)
      })
    })

    // 게시물 수가 10개 이상인 마커를 표시합니다.
    hotMarker.map((p, idx) => {

      var imageSize = new kakao.maps.Size(30, 45);

      var markerImage = new kakao.maps.MarkerImage(hotImageSrc, imageSize);

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(p.latitude, p.longitude) ,
        title: p.title,
        image: markerImage,
      });

      kakao.maps.event.addListener(markers, 'click', function(){
        markerDetail(p.id)
        setHot(true)
      })
    })


    const marker = new kakao.maps.Marker({
      position: map.getCenter()
    })
    // marker.setMap(map);


    const infowindow = new kakao.maps.InfoWindow({zindex:1});

    var geocoder = new kakao.maps.services.Geocoder();

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도에 마커를 표시합니다.
    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            var content = `<div style="border:none ; padding:8px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
                            '<span style="font-weight: 600;">주소정보</span>' + 
                            detailAddr + 
                            '<div style="color:grey; font-size:13px; margin-top:5px; " >새 마커를 만드시고 싶으면 파란색 마커를 클릭해주세요!😀</div>'+
                          `</div>`;
      
      //클릭한 위도, 경도 정보를 가져옵니다.
      const latlng = mouseEvent.latLng;
      //마커 위치를 클릭한 위치로 옮깁니다.
      marker.setPosition(latlng);
      marker.setMap(map);

      infowindow.setContent(content);
      infowindow.open(map, marker);

      setLatitude(latlng.getLat())
      setLongitude(latlng.getLng())
        }
      });
    })

    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }
    
    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    
    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById('centerAddr');
    
            for(var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    infoDiv.innerHTML = result[i].address_name;
                    break;
                }
            }
        }    
    }

    //마커에 클릭이벤트를 등록하기
    kakao.maps.event.addListener(marker, 'click', function(){
      setModal(true)
    })
  }, [normalMarker])

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
  
  window.onscroll = function() {scrollFunction()}

  const scrollFunction = () => {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
      setTop(true)
    } else {
      setTop(false)
    }

  }

  return(
    <React.Fragment>
        <MapContainer id='myMap'>
          <MapBtnContainer>
              <MapControlBtn  onClick={zoomIn} style={{borderRight: "1px solid #919191"}} ><AddIcon/></MapControlBtn>
              <MapControlBtn  onClick={zoomOut}  ><RemoveIcon/></MapControlBtn>
          </MapBtnContainer>  
          <MapInfo style={{opacity: '0.8'}}>
              <div style={{fontWeight:'600'}}>지도중심기준 주소정보</div>
              <div id="centerAddr"></div>
          </MapInfo>
        </ MapContainer>
      {/* <div id='ClickLatlng'></div> */}
      {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} />
      : null }
      {is_write && is_login ? 
      <AddBtn>
      <Fab color="primary" aria-label="add" variant="extended" onClick={() => {
        window.scrollTo(0,0)
        setWriteModal(true)
      }}>
        <AddIcon /><Word>게시글추가</Word>
      </Fab>
      </AddBtn>
      : null}
      {is_Top ? 
        <MapBtn>
          <Fab style={{backgroundColor:"#FFCC4D"}} aria-label="add" variant="extended" onClick={() => {
            window.scrollTo(0,0)
          }}>
            <MapIcon /><Word>&nbsp;&nbsp;지도보기&nbsp;</Word>
          </Fab>
        </MapBtn>
      : null}
      {is_writeModal? <PostWrite markerId = {markerId} close={closeWriteModal} hot={hot} />
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

const MapInfo = styled.div`
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 5;
  background-color: white;
  padding: 8px;
`


const MapControlBtn = styled.div`
  width:40px;
  height:30px;
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

const MapBtn = styled.div`
  position: fixed;
  right: 30px;
  bottom: 165px;
  z-index: 10;
`

const Word = styled.span`
  @media (max-width:425px){
    display: none
  }
`

export default Map
