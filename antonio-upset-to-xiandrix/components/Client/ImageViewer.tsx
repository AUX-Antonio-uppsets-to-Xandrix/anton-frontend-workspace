'use client';
import React,{useState,useEffect,useRef, useContext} from 'react'
import Image from 'next/image';
import ImageDisplayContext from './ImageDisplayContext';
import isEqual from 'lodash/isEqual';
import { Mat } from 'opencv-react-ts';
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
    const prevImage = useRef();
/*
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }*/
    const { noImage,tempImageURL,originalImageURL,imageWorkingSet} = imageContext;
   /*
    useEffect(()=>{
        
        if(originalImageURL && changedImage.current){
            
            ImageDrawer();
        }
        else
            return;
    },[imageWorkingSet?.grayscale]);
*/
function useCustomHook( obj: ImageManipulationType |null) {
    const prevObjRef = useRef();
  
    useEffect(() => {
      if (!isEqual(prevObjRef.current, obj)) {
        console.log('obj가 바뀌었을 때만 이 console.log가 실행됩니다.');
        ImageDrawer();
        prevObjRef.current = obj as any;
      }
    }, [obj]);
  }

    useCustomHook(imageWorkingSet);

    const ImageDrawer=() => {
        if (originalImageURL && changedImage.current) {
            const imgElement = document.createElement('img');
            imgElement.src = originalImageURL as string;

            imgElement.onload = () => {
                try{
                const grayscale = Number(imageWorkingSet?.grayscale);
                const threshold = Number(imageWorkingSet?.threshold);

                const img = cv.imread(imgElement as HTMLElement);
                const dst = new cv.Mat(img.rows,img.cols,img.type());
                
                let low = new cv.Mat(img.rows, img.cols, img.type(), [0, 0, 0, 0]);
                //let high = new cv.Mat(img.rows, img.cols, img.type(), [150, 150, 150, 255]);
                let high = new cv.Mat(img.rows, img.cols, img.type(), [grayscale*5, 255, 255, 255]);
                //cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY); //순서대로 입력영상, 출력영상, 변환형식
                cv.inRange(img,low,high,dst);
                
                cv.threshold(dst,dst,threshold*2.5,threshold*2.5,cv.THRESH_OTSU);
                //dst.resize(600);
                cv.imshow(changedImage.current as HTMLElement, dst);
                setIsLoaded(true);
                img.delete();
                low.delete(); high.delete();
                dst.delete();
                }
                catch{
                    console.log("err found on opencv load");
                }
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