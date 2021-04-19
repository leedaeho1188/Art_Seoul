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
    //넘어가서 image로 사용?
    props.setImage(fileInput.current.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0]
    
    //변경할 파일이 없는 경우 기존에 리덕스에 들어있던 미리보기 이미지로 설정하고 그게 아니면
    //FileReader 사용해서 읽어낸 파일 onloadend 사용해서 변경할 이미지를 리덕스에 넣어준다
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
        size = "small"
      >
        
        <input id={"file-input"} multiple style={{ display: 'none' }} type="file" name="imageFile"
          onChange={selectFile} ref={fileInput} disabled={is_uploading}
        />
        Picture
    </Button>     
  ) 
}

export default ProfileUpload;