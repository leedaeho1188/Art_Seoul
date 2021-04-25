import React from 'react'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image"

const ProfileUpload = (props) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.profile_preview)
  const is_uploading = useSelector(state => state.image.uploading)
  const fileInput = React.useRef();
    
  const selectFile = (e) => {
    props.setImage(fileInput.current.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0]

    if (file === undefined){
      dispatch(imageActions.profilePreview (preview))
      return
    }
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader.result);
      dispatch(imageActions.profilePreview (reader.result))
    }
  }

  return (
    <Button
        variant="outlined"
        component="label"
        color="default"
        startIcon={<CloudUploadIcon/>}
        size = "small">
  
        <input id={"file-input"} multiple style={{ display: 'none' }} type="file" name="imageFile"
          onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
          
        Picture
    </Button>     
  ) 
}

export default ProfileUpload;