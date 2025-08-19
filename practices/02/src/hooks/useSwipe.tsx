import { useState, useRef, useCallback, useMemo } from 'react';
import cu from '../components/modules/main/CarouselUtils';

const useSwipe = ({ isAnimating, onSwipeLeft, onSwipeRight, onClick }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [moveX, setMoveX] = useState(0);

    const dragDirRef = useRef(0);
    const startXRef = useRef(0);

    const handleDragStart = useCallback((event) => {
        if (isAnimating) return;

        setIsDragging(true);
        startXRef.current = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        dragDirRef.current = 0;
    }, [isAnimating]);

    const handleDragMove = useCallback((event) => {
        if (!isDragging) return;

        const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
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

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;

        if (dragDirRef.current < -1) {
            onSwipeLeft();
        } else if (dragDirRef.current > 1) {
            onSwipeRight();
        }

        setIsDragging(false);
        setMoveX(0);
    }, [isDragging, onSwipeLeft, onSwipeRight]);

    const handleCardClick = useCallback((...args) => {
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
        onDragStart: (e) => e.preventDefault(),
    }), [handleDragStart, handleDragMove, handleDragEnd]);

    return [swipeHandlers, isDragging, moveX, handleCardClick];
};

export default useSwipe;