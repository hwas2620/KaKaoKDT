import { useState, useEffect, useCallback } from 'react';
import cu from '../components/modules/main/CarouselUtils';

export const useCarousel = <T,>(initialItems: T[] = []) => {
    const [items, setItems] = useState<T[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (initialItems.length > 0) {
            setItems(initialItems.slice(0, cu.CAROUSEL_ITEM_LIMIT));
        }
    }, [initialItems]);

    const handleSlideLeft = useCallback(() => {
        setItems(prev => {
            if (prev.length <= 1) return prev;
            
            return [...prev.slice(1), prev[0]];
        });
        setIsAnimating(true);
    }, []);

    const handleSlideRight = useCallback(() => {
        setItems(prev => {
            if (prev.length <= 1) return prev;

            return [prev[prev.length - 1], ...prev.slice(0, -1)];
        });
        setIsAnimating(true);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        setIsAnimating(false);
    }, []);

    return { items, isAnimating, handleSlideLeft, handleSlideRight, handleTransitionEnd };
};
