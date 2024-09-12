"use client"
import React,{useContext, useEffect} from "react";
import { uploadFile } from "../Server/Uploadfile"
import ImageDisplayContext from "./ImageDisplayContext";

const ImageUploader=()=> {

  const imageContext = useContext(ImageDisplayContext) as ImageDisplayContextType;
  const { noImage, tempImageURL, setTempImageURL,
        originalImageURL, setOriginalImageURL,imageWorkingSet,setImageWorkingSet } = imageContext;
/*
LoadImage : 사용자가 이미지를 불러오는 순간 서버에 이미지를 업로드한다.
서버 파일시스템에 업로드 된 이미지는 DB에 그 경로가 저장된다.
*/
const loadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; //typescript 문법. nullcheck 후 null 일시 undefined 할당
  if (file) {
      const fileReader = new FileReader();
      fileReader.onload=()=>{
        setOriginalImageURL(fileReader.result);
        if(imageWorkingSet)
          setImageWorkingSet({
            ...imageWorkingSet,
            stateChanged: Number(imageWorkingSet.stateChanged+1),
            rotation:0
        });
      }
      fileReader.readAsDataURL(file); //Original File에 접근할 수 있는 URL 제공

      const serverForm = new FormData();
      serverForm.append("file",file);

        const tempUrl = await uploadFile(serverForm); //서버에서는 접근 할 수 있는 file 경로가 넘어온다.
        if(tempUrl !== null)
          setTempImageURL("/"+tempUrl); //서버에 저장되는 TempImageURL 제공
  }
  else return;
};

    return (
      <div className="imageUploader-container">
        <label htmlFor='loadImageInput' >이미지 불러오기</label>
        <input type='file' accept='image/*' id='loadImageInput' onChange={loadImage} style={{display:'none'}} />
      </div>
    );
  }
  export default ImageUploader;