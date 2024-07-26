  import { useEffect, useRef } from 'react';
  function useUpdateEffect(callback: () => void, deps: any) {
    const ref = useRef(false);
    useEffect(() => {
      if (ref.current) {
        callback();
      }else {
        ref.current = true;
      }
    }, [callback, deps]);
  }
  export default useUpdateEffect;
