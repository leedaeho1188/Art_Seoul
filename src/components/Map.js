import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import MarkerModal from './MarkerModal'
import PostWrite from './PostWrite'

import {useDispatch ,useSelector} from 'react-redux'
import {actionCreators as markerActions} from "../redux/modules/marker"
import {actionCreators as postActions} from "../redux/modules/post"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MapIcon from '@material-ui/icons/Map';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const { kakao } = window;

const Map = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const is_session = sessionStorage.getItem('JWT') ? true : false;
  const [ is_modal, setModal ] = useState(false);
  const [ is_writeModal, setWriteModal ] = useState(false);
  const [ is_write, setWrite ] = useState(false);
  const [ is_Top, setTop ] = useState(false)
  const [ hot, setHot ] = useState(false);
  const [ address, setAddress ] = useState();
  const [ roadAddress, setRoad ] = useState("");
  const [ markerId, setmarkerId ] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [_map, setMap ] = useState();
  const normalMarker = useSelector((state) => state.marker.normal)
  const hotMarker = useSelector((state) => state.marker.hot)
  
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
        image: markerImage,
      });

      var iwContent =   `<div style="padding:8px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
                        `<div style="font-weight: 600; margin-bottom: 3px;">${p.title}</div>` +
                        `<div>${p.address}</div>` +
                        `</div>`

      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent
      });

      kakao.maps.event.addListener(markers, 'mouseover', function(){
          infowindow.open(map, markers)
      })
      
      kakao.maps.event.addListener(markers, 'mouseout', function(){
        infowindow.close(map, markers)
      })

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

      var iwContent =   `<div style="padding:8px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
                        `<div style="font-weight: 600; margin-bottom: 3px;">${p.title}</div>` +
                        `<div>${p.address}</div>` +
                        `</div>`

      var _infowindow = new kakao.maps.InfoWindow({
          content : iwContent
      });

      kakao.maps.event.addListener(markers, 'mouseover', function(){
        _infowindow.open(map, markers)
      })
      
      kakao.maps.event.addListener(markers, 'mouseout', function(){
        _infowindow.close(map, markers)
      })
    })

    // 파란색 기본 마커입니다.
    const marker = new kakao.maps.Marker({
      position: map.getCenter()
    })

    // 마커위에 뜨는 정보창입니다.
    const infowindow = new kakao.maps.InfoWindow({zindex:1});

    // 해당 위치 값이 어딘지 알게해주는 역할
    var geocoder = new kakao.maps.services.Geocoder();
    


    const address = document.getElementById("address")
    
    address.addEventListener('click', function(){
      const road = document.getElementById("road").value
      geocoder.addressSearch( road , function(result, status) {
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          searchDetailAddrFromCoords(coords, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                
                
    
                var content = `<div style="border:none ; padding:8px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
                                `<div style="display:flex; justify-content: space-between; margin-bottom: 5px;">` +
                                  '<span style="font-weight: 600;">주소정보</span>' + 
                                `</div>`+
                                detailAddr + 
                                '<div style="color:grey; font-size:13px; margin-top:5px; " >새 마커를 만들고 싶으면 파란색 마커를 클릭해주세요!😀</div>'+
                              `</div>`;

              infowindow.setContent(content);
              setAddress(result[0].address.address_name)
            }
          })
          console.log(coords, road)
          marker.setPosition(coords);
          marker.setMap(map);
          map.setCenter(coords)
          setLatitude(coords.Ma)
          setLongitude(coords.La)
          setRoad("")
        }
      })
    })

    // 지도에 마커를 표시합니다.
    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            

            var content = `<div style="border:none ; padding:8px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
                            `<div style="display:flex; justify-content: space-between; margin-bottom: 5px;">` +
                              '<span style="font-weight: 600;">주소정보</span>' + 
                            `</div>`+
                            detailAddr + 
                            '<div style="color:grey; font-size:13px; margin-top:5px; " >새 마커를 만들고 싶으면 파란색 마커를 클릭해주세요!😀</div>'+
                          `</div>`;
      
      //클릭한 위도, 경도 정보를 가져옵니다.
      const latlng = mouseEvent.latLng;
      //마커 위치를 클릭한 위치로 옮깁니다.
      marker.setPosition(latlng);
      marker.setMap(map);

      infowindow.setContent(content);

      setAddress(result[0].address.address_name)

      //위도 경도 값을 useState를 이용해서 useEffect 밖으로 빼냅니다.
      setLatitude(latlng.getLat())
      setLongitude(latlng.getLng())

      
        }
      });
    })
    
    
    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    
    //마커에 클릭이벤트를 등록하기
    kakao.maps.event.addListener(marker, 'click', function(){
      //로그인 한 사람만 마커를 생성할 수 있게한다.
      //is_login을 사용했을 때는 리렌더링할 때 is_login false에서 true로 되기 때문에
      //map이 is_login을 false로 인식할 수도 있습니다.
      if(is_session){

        //마커 생성 모달창을 띄워준다. 
        setModal(true)

      }else{
        window.alert("로그인해야 마커를 생성할 수 있어요!🙂")
      }
    })

    kakao.maps.event.addListener(marker, 'mouseover', function(){
      infowindow.open(map, marker);
    })

    kakao.maps.event.addListener(marker, 'mouseout', function(){
      infowindow.close(map, marker);
    })
    // 마커가 생성될때 바로 화면상에 새로생성된 마커를 보여주기 위해 배열안에 normalMarker를 넣어놨습니다.
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
  

  const changeRoadAddress = (e) => {
    setRoad(e.target.value)
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
        <MapSearch>
          <TextField id="road" label="주소를 입력해주세요😀" style={{width: "60%"}} value={roadAddress} onChange={changeRoadAddress} />
          &nbsp;<Button id="address" style={{backgroundColor:"#FFCC4D"}} variant="contained" disableElevation><span style={{fontWeight:"600"}}>주소입력</span></Button>
        </MapSearch>
        <MapLinkContainer>
          <MapLink href="https://www.juso.go.kr/openIndexPage.do" target="_blank" >정확한 주소를 모른다면 클릭해주세요!</MapLink>
        </MapLinkContainer>
        <MapContainer id='myMap'>
          <MapBtnContainer>
              <MapControlBtn  onClick={zoomIn} style={{borderRight: "1px solid #919191"}} ><AddIcon/></MapControlBtn>
              <MapControlBtn  onClick={zoomOut}  ><RemoveIcon/></MapControlBtn>
          </MapBtnContainer>
        </ MapContainer>

      {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} address={address} />
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
  margin-bottom: 60px;
  width: 900px;
  height: 500px;
  @media (max-width: 1000px){
    width: 85%;
  };
  @media (max-width: 450px){
    width: 95%;
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

const MapSearch = styled.div`
  margin: auto;
  margin-top: 150px;
  width: 900px;
  display: flex;
  // align-items: center;
  @media (max-width: 1000px){
    width: 85%;
  };
  @media (max-width: 450px){
    width: 95%;
  }
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

const MapLinkContainer = styled.div`
  width: 900px;
  margin: auto;
  margin-bottom: 15px;
  @media (max-width: 1000px){
    width: 85%;
  };
  @media (max-width: 450px){
    width: 95%;
  }
`

const MapLink = styled.a`
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  opacity: 0.7;
  text-decoration: none;
  &:hover{
    opacity: 1;
    font-weight: 600
  }
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
  @media (max-width:614px){
    display: none
  }
`


export default Map
