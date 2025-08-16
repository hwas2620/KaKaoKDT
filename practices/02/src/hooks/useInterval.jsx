import { useRef, useCallback, useEffect } from 'react';

const useInterval = (callback, delay) => {
    const callbackRef = useRef(callback);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const stop = useCallback(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }, []);

    const start = useCallback(() => {
        if (intervalIdRef.current) return;
        
        intervalIdRef.current = setInterval(() => {
            callbackRef.current();
        }, delay);
    }, [delay]);

    const reset = useCallback(() => {
        stop();
        start();
    }, [start, stop]);

    // 컴포넌트가 사라질 때 타이머를 자동으로 정리
    useEffect(() => {
        return stop;
    }, [stop]);

    return { start, stop, reset };
};

export default useInterval;
