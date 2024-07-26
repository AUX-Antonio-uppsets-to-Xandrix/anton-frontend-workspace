'use client';
import React,{useState,useEffect,useRef, useContext} from 'react'
import Image from 'next/image';
import ImageDisplayContext from './ImageDisplayContext';
//import cv from '@techstark/opencv-js';
//import { OpenCvProvider, useOpenCv } from 'opencv-react-ts';
//import useUpdateEffect from '@/context/useUpdateEffect';
/*
    ImageViewer 컴포넌트에서는 다음과 같은 기능을 담당한다.
    - 이미지 불러오기 :
    - 이미지 내보내기 :
    - 이미지 원상태로 :
    - 이미지 디스플레이 :
    - (2차) 이미지 디스플레이 내 마우스 I/O 따라 이동, 확대/축소
*/
const ImageViewer:React.FC = () =>{
    const imageContext = useContext(ImageDisplayContext) as ImageDisplayContextType;
    const changedImage = useRef<HTMLCanvasElement>(null);
    const [isLoaded,setIsLoaded] = useState(false);
    //var cv = require('opencv.js');
    //const cv = require('opencv-react-ts');
    /*
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }*/
    const { noImage,tempImageURL,originalImageURL,imageWorkingSet} = imageContext;
   
    useEffect(()=>{
        if(originalImageURL && changedImage.current)
            ImageDrawer();
        else
            return;
    },[imageWorkingSet?.grayscale]);


    const ImageDrawer=() => {
        if (originalImageURL && changedImage.current) {
            const imgElement = document.createElement('img');
            imgElement.src = originalImageURL as string;

            imgElement.onload = () => {

                const grayscale = Number(imageWorkingSet?.grayscale);

                const img = cv.imread(imgElement);
                const dst = new cv.Mat(img.rows,img.cols,img.type());
                
                let low = new cv.Mat(img.rows, img.cols, img.type(), [0, 0, 0, 0]);
                //let high = new cv.Mat(img.rows, img.cols, img.type(), [150, 150, 150, 255]);
                let high = new cv.Mat(img.rows, img.cols, img.type(), [grayscale*2.5, grayscale*2.5, 255, 255]);
                //cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY); //순서대로 입력영상, 출력영상, 변환형식
                cv.inRange(img,low,high,dst)
                cv.imshow(changedImage.current as HTMLElement, dst);
                setIsLoaded(true);
                img.delete();
                low.delete(); high.delete();
                dst.delete();
            };
        }
    };

    /*
        loadImage : 이미지 file input event handler
        입력 : file input
    */
        //: React.ChangeEvent<HTMLInputElement 는 이벤트 객체의 타입 명시.(TypeScript)
        // 코드 안정성을 높이고 컴파일 에러 발견 가능
    return(
            <div className='image-display-field'>
                <h1>{imageWorkingSet?.grayscale}</h1>
                <button onClick={ImageDrawer}>추가하자</button>
                {originalImageURL?
                (<Image alt="loadedImage" src={originalImageURL?.toString()} width={400} height={400} className="imageArea"/>):
                (<Image src={noImage} alt="no-image" width={400} height={400}  className='imageArea'/>)}
                <div className='canvas-container'>
                    <canvas width="600" height="600" ref={changedImage}></canvas>
                </div>
            </div>
    );
}
export default ImageViewer;