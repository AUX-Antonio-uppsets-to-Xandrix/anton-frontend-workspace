import React,{useState,useEffect,useContext} from "react";
import ImageDisplayContext from "./ImageDisplayContext";

const ImageDownloader=()=>{
    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { noImage, tempImageURL, setTempImageURL, tempImage, setTempImage, 
        originalImageURL, setOriginalImageURL } = imageContext;


    const exportImage = () => {
        console.log("tempImageUrl", tempImageURL);
        console.log("tempImage", tempImage);
        const fileReader = new FileReader();
        if(tempImage!=null){
            fileReader.readAsDataURL(tempImage);
            fileReader.onload=(e)=>{
                if(typeof e.target?.result ==="string")
                    setTempImageURL(e.target?.result);
            }
        }
        else{
            alert("내보낼 이미지가 없습니다.");
            return;
        }
        const link = document.createElement('a');
        link.href = tempImageURL as string;
        link.download = 'temp-image.png';
        link.click();
    };


    return(
        <label onClick={exportImage} className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">이미지 내보내기</label>
    )
        
}
export default ImageDownloader;