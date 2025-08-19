import { useState, useEffect, useCallback, useMemo } from 'react';
import cu from '../components/modules/main/CarouselUtils';

const useCarousel = (initialItems = []) => {
    const [items, setItems] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (initialItems.length > 0) {
            setItems(initialItems.slice(0, cu.CAROUSEL_ITEM_LIMIT));
        }
    }, [initialItems]);

    const handleSlideLeft = useCallback(() => {
        setIsAnimating(true);
        setItems(prev => [...prev.slice(1), prev[0]]);
    }, []);

    const handleSlideRight = useCallback(() => {
        setIsAnimating(true);
        setItems(prev => [prev.at(-1), ...prev.slice(0, -1)]);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        setIsAnimating(false);
    }, []);

    return [items, isAnimating, handleSlideLeft, handleSlideRight, handleTransitionEnd];
};

export default useCarousel;