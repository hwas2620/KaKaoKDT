import { useRef, useCallback, useEffect, useMemo } from 'react';

type IntervalCallback = () => void;

export const useInterval = (callback: IntervalCallback, delay: number | null) => {
    const callbackRef = useRef<IntervalCallback>(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay !== null) {
            const tick = () => {
                callbackRef.current();
            };

            const id = setInterval(tick, delay);
            
            // 7. 중요: useEffect의 cleanup 함수.
            // 컴포넌트가 언마운트되거나, delay가 변경되기 직전에 반드시 실행됩니다.
            // 이를 통해 메모리 누수를 완벽하게 방지합니다.
            return () => clearInterval(id);
        }
    }, [delay]);
};
