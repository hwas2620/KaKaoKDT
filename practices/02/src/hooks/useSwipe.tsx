import { useState, useRef, useCallback, useMemo } from 'react';
import type { MouseEvent, TouchEvent, DragEvent } from 'react';
import cu from '../components/modules/main/CarouselUtils';

const getClientX = (event: MouseEvent | TouchEvent): number => {
    if ('touches' in event) {
        return event.touches[0]!.clientX;
    }

    return event.pageX!;
};

export interface UseSwipeProps<T extends unknown[]> {
    isAnimating: boolean;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    onClick?: (...args: T) => void; // onClick은 선택사항이며, 여러 인자를 받을 수 있습니다.
}

export const useSwipe = <T extends unknown[] = never[], E extends HTMLElement = HTMLElement>({
    isAnimating,
    onSwipeLeft,
    onSwipeRight,
    onClick
}: UseSwipeProps<T>) => {
    const [isDragging, setIsDragging] = useState(false);
    const [moveX, setMoveX] = useState(0);

    const dragDirRef = useRef(0);
    const startXRef = useRef(0);

    const handleDragStart = useCallback((event: MouseEvent<E> | TouchEvent<E>) => {
        if (isAnimating) return;

        setIsDragging(true);
        startXRef.current = getClientX(event);
        dragDirRef.current = 0;
    }, [isAnimating]);

    const handleDragMove = useCallback((event: MouseEvent<E> | TouchEvent<E>) => {
        if (!isDragging) return;

        const currentX = getClientX(event);
        const dragOffset = currentX - startXRef.current;
        const moveX = Math.max(-cu.MOVE_X_LIMIT_PX, Math.min(cu.MOVE_X_LIMIT_PX, dragOffset / cu.DRAG_DAMPING));
        setMoveX(moveX);

        if (Math.abs(dragOffset) > cu.SWIPE_THRESHOLD_PX) {
            dragDirRef.current = dragOffset < 0 ? -2 : 2;
        } else if (Math.abs(dragOffset) > cu.CLICK_THRESHOLD_PX) {
            dragDirRef.current = dragOffset < 0 ? -1 : 1;
        } else {
            dragDirRef.current = 0;
        }
    }, [isDragging]);

    const handleDragEnd = useCallback((event: MouseEvent<E> | TouchEvent<E>) => {
        if (!isDragging) return;

        if (dragDirRef.current < -1) {
            onSwipeLeft();
        } else if (dragDirRef.current > 1) {
            onSwipeRight();
        }

        setIsDragging(false);
        setMoveX(0);
    }, [isDragging, onSwipeLeft, onSwipeRight]);

    const handleCardClick = useCallback((...args: T) => {
        if (dragDirRef.current !== 0) return;

        onClick?.(...args);
    }, [onClick, dragDirRef]);

    const swipeHandlers = useMemo(() => ({
        onMouseDown: handleDragStart,
        onTouchStart: handleDragStart,
        onMouseMove: handleDragMove,
        onTouchMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onTouchEnd: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onDragStart: (e: DragEvent<E>) => e.preventDefault(),
    }), [handleDragStart, handleDragMove, handleDragEnd]);

    return { swipeHandlers, isDragging, moveX, handleCardClick };
};
