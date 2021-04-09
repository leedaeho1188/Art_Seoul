import React, {useEffect} from 'react'
import styled from 'styled-components'

const { kakao } = window;

const Map = () => {

  useEffect(() => {
    const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };
    const map = new kakao.maps.Map(container, options);
  }, [])

  return(
    <React.Fragment>
      <MapContainer id='myMap' >
      </MapContainer>
    </React.Fragment>
  )

}

const MapContainer = styled.div`
  margin: auto;
  margin-top: 150px;
  width: 900px;
  height: 500px;
  @media (max-width: 900px){
    width: 90%;
  };
  @media (max-width: 450px){
    width: 95%;
    height: 400px;
  }

`


export default Map
