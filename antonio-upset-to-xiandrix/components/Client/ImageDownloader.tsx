import React,{useState,useEffect,useContext} from "react";
import ImageDisplayContext from "./ImageDisplayContext";
import { blob } from "stream/consumers";

const ImageDownloader=()=>{
    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { noImage, tempImageURL, displayCanvas,  
        originalImageURL, setOriginalImageURL,imageWorkingSet } = imageContext;


    const exportImage = () => {

        /*
        이미지를 내보낼 logic이 필요하다.
        1) (Client) 현재까지의 작업 내용을 저장한 배열을 useContext로 부터 불러온다.
        2) (Client) 작업 내용에 따라 서버로 api call을 작업내용과 함께 던진다.
        3) (Server) 넘어온 작업내용에 대해 opencv 연산을 File에 수행한다.
        4) (Server) Opencv 연산을 수행한 이미지를 원래 경로 파일에 저장한다.
        4) (Client) response success 가 넘어올 때 까지 fetch 에 대해 await 한다.
        5) (Client) response success 넘어올 시 원래 갖고 있던 경로에 download를 수행한다.
        */
        
        
        if(!displayCanvas.current)
            return;
        displayCanvas.current.toBlob((blobImg)=>{
            if(blobImg){
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blobImg);
                var arSplitUrl=tempImageURL?.toString().split("/");
                if(arSplitUrl!==undefined){ 
                    var nArLength=arSplitUrl.length;
                    var arFileName=arSplitUrl[nArLength-1];
                    link.download = arFileName;
                }
                link.click();
            }
        })


        /*
        const link = document.createElement('a');
        link.href = tempImageURL as string;
        link.download = 'temp-image-notfound.png';
        var arSplitUrl=tempImageURL?.toString().split("/");//   "/" 로 전체 url 을 나눈다 
        if(arSplitUrl!==undefined){ 
            var nArLength=arSplitUrl.length;
            var arFileName=arSplitUrl[nArLength-1];
            link.download = arFileName;
        }
        link.click();
        */
    };


    return(
        <div className="imagedownloader-container">
            <label onClick={exportImage} className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">이미지 내보내기</label>
        </div>
    )
        
}
export default ImageDownloader;