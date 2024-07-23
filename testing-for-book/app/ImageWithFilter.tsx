"use client"; // Next.js 환경에서 클라이언트 사이드에서만 실행되는 표현 -> 공부하면서 보셨나요?

import React, { useState, ChangeEvent, useRef } from 'react';
//import styles from './ImageWithFilter.module.css'; 
// CSS 그레이 스케일 css 임의 가져옴 추후 AI 붙여 css 대신 AI 입히므로 import만 변경하면 됨

// ImageWithFilter 컴포넌트 정의
const ImageWithFilter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null); 
  // 업로드된 이미지 소스를 변수명에 상태로 저장해놓음 
  const [isGrayscale, setIsGrayscale] = useState(false); 
  // 그레이스케일 상태를 저장해서 원본 이미지 저장과 그레일 스케일 상태 저장해 언제든 다운로드 할 수 있도록 함
  const canvasRef = useRef<HTMLCanvasElement | null>(null); 
  // 캔버스 요소에 대한 참조를 저장해서 리렌더링되었을 때 src 날아감 방지

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 업로드된 파일을 가져옴
    if (file) {
      const reader = new FileReader(); // FileReader 객체 생성
      reader.onload = () => {
        setImageSrc(reader.result); // 파일을 읽은 후 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  // 그레이스케일 토글 함수
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale); // 그레이스케일 상태를 토글
  };

  // 이미지 저장 함수
  const saveImage = (isGray: boolean) => {
    const canvas = canvasRef.current; // 캔버스 요소를 가져옴
    const img = new Image(); // 새로운 이미지 객체 생성
    img.src = imageSrc?.toString() || ''; // 이미지 소스를 설정
    img.onload = () => {
      if (canvas) {
        const ctx = canvas.getContext('2d'); // 캔버스의 2D 컨텍스트를 가져옴
        if (ctx) {
          canvas.width = img.width; // 캔버스의 너비를 이미지의 너비로 설정
          canvas.height = img.height; // 캔버스의 높이를 이미지의 높이로 설정
          ctx.drawImage(img, 0, 0); // 이미지를 캔버스에 그림

          if (isGray) {
            ctx.filter = 'grayscale(100%)'; // 그레이스케일 필터 적용
            ctx.drawImage(img, 0, 0); // 이미지를 다시 캔버스에 그림
          }

          const link = document.createElement('a'); // 새로운 링크 요소 생성
          link.href = canvas.toDataURL(); // 캔버스의 데이터를 URL로 변환하여 설정
          link.download = isGray ? 'image_grayscale.png' : 'image.png'; // 파일명 설정 -> 파일명 원본 파일명 불러오기 후 변환하기
          link.click(); // 링크 클릭 이벤트 발생시켜 파일 다운로드
        }
      }
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} /> {/* 파일 입력 요소 */}
      {imageSrc && ( // 이미지 소스가 존재할 때만 렌더링
        <div>
          <img
            src={imageSrc.toString()}
            alt="Uploaded"
            className={isGrayscale ? 'grayscale' : ''} // 그레이스케일 상태에 따라 클래스 적용
          />
          <button onClick={toggleGrayscale}>
            {isGrayscale ? '컬러로 보기' : '흑백으로 보기'} {/* 버튼 텍스트 변경 */}
          </button>
          <button onClick={() => saveImage(false)}>원본 저장하기</button> {/* 원본 저장 버튼 */}
          <button onClick={() => saveImage(true)}>흑백으로 저장하기</button> {/* 그레이스케일 저장 버튼 */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* 캔버스 요소, 화면에 표시되지 않음 */}
        </div>
      )}
    </div>
  );
};

export default ImageWithFilter;
