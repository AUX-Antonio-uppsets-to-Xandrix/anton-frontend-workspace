"use client"
import React,{useContext} from "react";
import { uploadFile } from "../Server/Uploadfile"
import ImageDisplayContext from "./ImageDisplayContext";

const ImageUploader=()=> {

    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { noImage, tempImageURL, setTempImageURL, tempImage, setTempImage, 
        originalImageURL, setOriginalImageURL,imageWorkingSet,setImageWorkingSet } = imageContext;

const loadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; //typescript 문법. nullcheck 후 null 일시 undefined 할당
  if (file) {
      const fileReader = new FileReader();
      fileReader.onload=()=>{
        setOriginalImageURL(fileReader.result);
        if(imageWorkingSet)
          setImageWorkingSet({
            ...imageWorkingSet,
            stateChanged: Number(e.target.value)
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
        <label htmlFor='loadImageInput' className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">이미지 불러오기</label>
        <input type='file' accept='image/*' id='loadImageInput' onChange={loadImage} style={{display:'none'}} />
      </div>
    );
  }
  export default ImageUploader;