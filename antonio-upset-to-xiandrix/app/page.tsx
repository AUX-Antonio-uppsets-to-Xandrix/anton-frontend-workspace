import ImageMain from "@/components/Client/ImageMain";
import ImageViewer from "@/components/Client/ImageViewer";
import Image from "next/image";

export default function Home() {
  return (
      <>
        <h1>이미지 파일 입출력 영역</h1>
          <ImageMain/>
      </>
  );
}
