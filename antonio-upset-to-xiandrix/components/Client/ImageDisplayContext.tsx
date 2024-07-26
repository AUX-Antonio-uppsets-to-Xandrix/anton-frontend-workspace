import React,{createContext} from "react";

  // 기본값을 명확히 지정하여 생성
  const ImageDisplayContext = createContext<ImageDisplayContextType | null>(null);

  export default ImageDisplayContext; 