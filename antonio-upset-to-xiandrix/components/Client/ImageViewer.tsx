'use client';
import React, { useState, useEffect, useRef, useContext } from 'react'
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

const ImageViewer: React.FC = () => {
    const imageContext = useContext(ImageDisplayContext) as ImageDisplayContextType;
    const { noImage, tempImageURL, originalImageURL, imageWorkingSet,displayCanvas } = imageContext;

    function useCustomHook(obj: ImageManipulationType | null) {
        const prevObjRef = useRef();
        useEffect(() => {
            if (!isEqual(prevObjRef.current, obj)) {
                //isEqual : lodash 라이브러리 제공 함수. 객체간 키-값 깊은 비교
                console.log('obj가 바뀌었을 때만 이 console.log가 실행됩니다.');
                ImageDrawer();
                prevObjRef.current = obj as any;
            }
        }, [obj]);
    }

    const grayScaleDrawer = () => {

    }


    const ImageDrawer = () => {
        if (originalImageURL && displayCanvas.current && imageWorkingSet) {
            const imgElement = document.createElement('img');
            imgElement.src = originalImageURL as string;

            imgElement.onload = () => {
                const canvas = displayCanvas.current;
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
                    const sizeRatio = canvas.width/canvas.height;

                    const dst = new cv.Mat();
                    let dSize = new cv.Size(450*sizeRatio,450);
                    cv.resize(src,dst,dSize,0,0,cv.INTER_AREA);
                    //cv.pyrDown(src,dst,new cv.Size(0,0),cv.BORDER_DEFAULT)

                    cv.threshold(dst, dst, threshold * 2.5, 255, cv.THRESH_TOZERO);
                    //threshold 란 : 픽셀의 RGB값들에 대해 특정 기준에 대한 '문턱값' 처리를 수행
                    //문턱값이 진해질 수록 어두운 색상이 강조된다.
                    //THRESH_TOZERO : 픽셀 값이 경계값을 넘으면 유지, 아니면 0

                    for(let i=0;i<imageWorkingSet.rotation;i++){
                        console.log("imageWorkingSet : ",imageWorkingSet);
                        cv.rotate(dst,dst,cv.ROTATE_90_CLOCKWISE);
                    }
                    cv.imshow(displayCanvas.current, dst);

                    src.delete();
                    //low.delete(); high.delete();
                    dst.delete();
                    }
                    catch{
                        console.log("opencv err!");
                    }

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

    //여기부터 실제 코드가 실행되는 영역

    useCustomHook(imageWorkingSet);
    return (
        <div className='image-display-field'>
            <h1>{imageWorkingSet?.grayscale}</h1>

            {originalImageURL ?
                <div className='canvas-container'>
                    {/*<Image alt="loadedImage" src={originalImageURL?.toString()} width={400} height={400} className="imageArea" />*/}
                    <canvas width={600} height={600} ref={displayCanvas as React.RefObject<HTMLCanvasElement>} />
                </div>
                 :
                <Image src={noImage} alt="no-image" width={400} height={400} className='imageArea' />
            }

        </div>
    );
}
export default ImageViewer;