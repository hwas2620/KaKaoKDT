import { useRef, useCallback, useEffect, useMemo } from 'react';

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
        if (intervalIdRef.current) 
            stop();
        
        intervalIdRef.current = setInterval(() => {
            callbackRef.current();
        }, delay);
    }, [delay, stop]);

    const reset = useCallback(() => {
        stop();
        start();
    }, [start, stop]);
    
    useEffect(() => {
        return stop;
    }, [stop]);

    return useMemo(() => ({ start, stop, reset }), [start, stop, reset]);
};

export default useInterval;
