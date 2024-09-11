import React,{useState,useEffect,useContext} from "react";
import ImageDisplayContext from "./ImageDisplayContext";
import { blob } from "stream/consumers";
import { Mat } from 'opencv-react-ts';

const ImageDownloader=()=>{
    const imageContext = useContext(ImageDisplayContext) as ImageDisplayContextType;
    const { noImage, tempImageURL, displayCanvas, masterCanvas, 
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

        if(!masterCanvas.current)
            return;


        if (originalImageURL && masterCanvas.current && imageWorkingSet) {
            const imgElement = document.createElement('img');
            imgElement.src = originalImageURL as string;

            imgElement.onload = () => {
                const canvas = masterCanvas.current;
                if (canvas) {
                    canvas.width = imgElement.width;
                    canvas.height = imgElement.height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(imgElement, 0, 0);
                    try{
   

                    //여기서부터 이미지 색상 값 조작 영역
                    const grayscale = Number(imageWorkingSet?.grayscale);
                    const threshold = Number(imageWorkingSet?.threshold);
                    const brightness = Number(imageWorkingSet?.brightness);
                    //cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

                    //cv.픽셀 RGB 값 변경 > grayscale 조정 / brightness 조정
                    const imagePixelData = ctx?.getImageData(0,0,canvas.width,canvas.height);
                    console.log(imagePixelData);
                    const pixelData = imagePixelData?.data;
                    if(pixelData&& imagePixelData){
                    for(let i=0;i<Number(pixelData?.length);i+=4){
                        const red = pixelData[i];
                        const green = pixelData[i+1];
                        const blue = pixelData[i+2];

                        const gray = (0.299*red +0.587*green + 0.114*blue);
                        //pixelData[i] = pixelData[i+1] = pixelData[i+2] = gray;

                        //세개의 RGB값을 저장하는 인자가 하나의 색상을 구성한다.
                        for(let j=0;j<3;j++){
                            //grayscale 처리 구문 
                            pixelData[i+j] = (pixelData[i+j]*(100-grayscale)+gray*grayscale)/100;

                            //brightness 처리 구문. 255이상 넘어가지 않도록 처리
                            pixelData[i+j] *= brightness/50;
                            if(pixelData[i+j]>255)
                                pixelData[i+j] = 255;
                           // else if(pixelData[i+j]<20)
                                //pixelData[i+j] = 20;
                        }
                    }
                    ctx?.putImageData(imagePixelData,0,0);
                    }
                    //cv.threshold 지정
                    const src = cv.imread(canvas);

                    const dst = new cv.Mat();
                    let dSize = new cv.Size(canvas.width,canvas.height);
                    cv.resize(src,dst,dSize,0,0,cv.INTER_AREA);
                    cv.threshold(dst, dst, threshold * 2.5, 255, cv.THRESH_TOZERO);
                    for(let i=0;i<imageWorkingSet.rotation;i++){
                        console.log("imageWorkingSet : ",imageWorkingSet);
                        cv.rotate(dst,dst,cv.ROTATE_90_CLOCKWISE);
                    }
                    cv.imshow(masterCanvas.current,dst);
                    src.delete();
                    //low.delete(); high.delete();
                    dst.delete();

                    masterCanvas.current.toBlob((blobImg)=>{
                        if(blobImg){
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blobImg);
                            let arSplitUrl=tempImageURL?.toString().split("/");
                            if(arSplitUrl!==undefined){
                                let nArLength=arSplitUrl.length;
                                let arFileName=arSplitUrl[nArLength-1];
                                link.download = arFileName;
                            }
                            link.click();
                        }
                    },'image/jpeg',0.75);
                    }
                    catch{
                        console.log("opencv err!");
                    }

                }
            };
        }

    };


    return(
        <div className="imagedownloader-container">
            <label onClick={exportImage} >이미지 내보내기</label>
        </div>
    )
        
}
export default ImageDownloader;