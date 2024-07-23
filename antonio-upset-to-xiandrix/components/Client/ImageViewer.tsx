'use client';
import React,{useState,useEffect,useRef, useContext} from 'react'
import '@/styles/ImageViewer.css'
import Image from 'next/image';
//import convertURLtoFile from './URLtoFileConverter';
import ImageDisplayContext from './ImageDisplayContext';
/*
    ImageViewer 컴포넌트에서는 다음과 같은 기능을 담당한다.
    - 이미지 불러오기 :
    - 이미지 내보내기 :
    - 이미지 원상태로 :
    - 이미지 디스플레이 :
    - (2차) 이미지 디스플레이 내 마우스 I/O 따라 이동, 확대/축소
*/
const ImageViewer = () =>{
    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { noImage,tempImageURL} = imageContext;

    /*
        loadImage : 이미지 file input event handler
        입력 : file input
    */
        //: React.ChangeEvent<HTMLInputElement 는 이벤트 객체의 타입 명시.(TypeScript)
        // 코드 안정성을 높이고 컴파일 에러 발견 가능
    return(
        <div className='image-display-field'>
            {tempImageURL?
            (<Image alt="loadedImage" src={tempImageURL.toString()} width={600} height={600} className="imageArea"/>):
            (<Image src={noImage} alt="no-image" width={600} height={600}  className='imageArea'/>)}
        </div>
    );
}
export default ImageViewer;