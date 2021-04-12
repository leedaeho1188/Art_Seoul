import React, {useEffect} from "react"
import Map from  "../components/Map"
import {actionCreators as markerActions} from "../redux/modules/marker"
import {useDispatch ,useSelector} from 'react-redux'

function Main() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(markerActions.getMarkerAX())
  }, [])

  return (
    <React.Fragment>
      <Map/>
    </React.Fragment>
  )
}

export default Main;
