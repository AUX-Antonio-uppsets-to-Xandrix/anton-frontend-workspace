'use client';
import ImageMain from "@/components/Client/ImageMain";
import Image from "next/image";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import '@/styles/ImageMain.css';


export default function Home() {
  return (
    <div className="imageMain">
          <ImageMain/>
          <footer className="p-8 mt-5 text-lg">
            * 포띰에딧(Phothemedit) 은 이미지 테마 편집 서비스를 제공합니다.<br/>
            * `이미지 내보내기` 를 통해 사용자는 작업한 이미지를 저장할 수 있습니다. <br/>
            * `이미지 불러오기` 를 통해 사용자는 작업할 이미지를 불러올 수 있습니다(bmp, png, jpg) <br/>
            * `임시저장` 을 통해 현재까지의 작업 내용을 저장합니다. 추후 로그인 시에 자동으로 현재의 저장 내용을 로드합니다. <br/>
          <br/>
            ----------이미지 조작----------<br/>
            * 흑백화 : 입력한 % 만큼 흑백화를 진행합니다. (100% : 완전 흑백화)<br/>
            * 고대비 효과 : 입력한 % 만큼 고대비 연산을 수행합니다.<br/>
            * 밝기 : 이미지를 어둡거나 밝게 조절합니다. (50% : default 밝기)<br/>
            <br/>
           ※ 주의 ※ <br/>
           저장하지 않은 내용은 유실될 수 있습니다.
          </footer>
    </div>
  );
}
