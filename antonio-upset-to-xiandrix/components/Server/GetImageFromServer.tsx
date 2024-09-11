import type { NextApiRequest, NextApiResponse } from 'next';

interface ImageUrlResponse {
    url?: string;
    error?: string;
}

export default function getImageFromServer(imageName: string): string | null{

    if (!imageName) {
      return null;
  }

    // 이미지 URL 생성 (정적 경로를 통해 접근 가능)
    const imageUrl = `http://localhost:3000${imageName}`;
    console.log('imageUrl  :',imageUrl);
    return imageUrl;
    // 이미지가 존재하는지 확인하는 과정이 필요할 수도 있음
    // 여기서는 간단히 URL만 반환
   // res.status(200).json({ url: imageUrl });
}