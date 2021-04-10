import React, {useEffect} from 'react'
import styled from 'styled-components'

const { kakao } = window;

const Map = () => {

  useEffect(() => {
    const container = document.getElementById('myMap'); //지도 표시할 div
      const options = {
        center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981), //지도 중심 좌표
        level: 8 //지도의 확대 레벨
      };
    const map = new kakao.maps.Map(container, options);//지도를 생성합니다.
    
    const positions = [
      {
        title: '서울시청',
        latlng: new kakao.maps.LatLng(37.56668898308216, 126.97826745018008)
      },
      {
        title: '롯데백화점',
        latlng: new kakao.maps.LatLng(37.52645731493873, 126.94443076781533)
      }
    ]
    
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    //지도를 클릭한 위치에 표출할 마커입니다.
    positions.map((p, idx) => {

      var imageSize = new kakao.maps.Size(24, 35);

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: p.latlng,
        title: p.title,
        image: markerImage,
      });
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

      const message = '클릭한 위치의 위도는' + latlng.getLat() + '이고,'
      + '경도는' + latlng.getLng() + '입니다';

      const resultDiv = document.getElementById('ClickLatlng');
      resultDiv.innerHTML = message;
    })

    //마커에 클릭이벤트를 등록하기
    kakao.maps.event.addListener(marker, 'click', function(){
      window.alert('안녕!')
    })
  }, [])
  
  return(
    <React.Fragment>
      <MapContainer id='myMap' >
      </MapContainer>
      <div id='ClickLatlng'></div>
    </React.Fragment>
  )

}

const MapContainer = styled.div`
  margin: auto;
  margin-top: 150px;
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


export default Map