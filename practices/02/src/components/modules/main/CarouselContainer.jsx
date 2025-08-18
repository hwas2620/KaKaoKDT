import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CarouselContainer.css';
import ArticleCard from '../../ui/ArticleCard';
import cu from './CarouselUtils';
import useInterval from '../../../hooks/useInterval';

function CarouselContainer({articles, onCardClick}) {
    const [carouselCards, setCarouselCards] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [moveX, setMoveX] = useState(0);

    const dragDirRef = useRef(0);
    const startXRef = useRef(0);
    
    const handleSlideLeft = useCallback(() => {
        setCarouselCards(prevCards => {
            const [first, ...rest] = prevCards;

            return [...rest, first];
        });
    }, []);

    const handleSlideRight = useCallback(() => {
        setCarouselCards(prevCards => {
            const last = prevCards.at(-1);
            const rest = prevCards.slice(0, -1);

            return [last, ...rest];
        });
    }, []);

    const intervalSlide = useInterval(handleSlideLeft, cu.AUTO_SLIDE_TIME_MS);

    const handleDragStart = useCallback((event) => {
        intervalSlide.stop();
        setIsDragging(true);

        startXRef.current = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        dragDirRef.current = 0;

    }, [intervalSlide]);

    const handleDragMove = useCallback((event) => {
        if (!isDragging) return;

        const curruntX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        const dragOffset = curruntX - startXRef.current;
        const moveX = Math.max(-30, Math.min(30, dragOffset / 5));

        setMoveX(moveX);

        if (Math.abs(dragOffset) > cu.CLICK_THRESHOLD_PX) {
            dragDirRef.current = dragOffset < 0 ? -1 : 1;
        } else {
            dragDirRef.current = 0;
        }
    }, [isDragging, startXRef]);

    const handleDragEnd = useCallback((event) => {
        if (!isDragging) return;

        if (dragDirRef.current < 0) {
            handleSlideLeft();
        } else if (dragDirRef.current > 0) {
            handleSlideRight();
        }

        setIsDragging(false);
        setMoveX(0);
        intervalSlide.reset();
    }, [isDragging, handleSlideLeft, handleSlideRight, intervalSlide]);

    const handleCardClickWrapper = useCallback((articleInfo) => {
        console.log(dragDirRef.current);
        if (dragDirRef.current === 0) {
            onCardClick(articleInfo);
        }
    }, [onCardClick]);

    useEffect(() => {
        if (articles.length > 0) {
            setCarouselCards(articles.slice(0, cu.CAROUSEL_ITEM_LIMIT));
        }
    }, [articles]);

    useEffect(() => {
        intervalSlide.start();
    }, [intervalSlide]);

    return (
        <section className="carousel-container">
            <ul
              className={`carousel-container-wrapper ${isDragging ? 'grabbing' : ''}`}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseMove={handleDragMove}
              onTouchMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchEnd={handleDragEnd}
              onDragStart={(e) => e.preventDefault()}
            >
                {carouselCards
                    .slice(0, cu.VISIBLE_CARD_COUNT + 2)
                    .map((article, index) =>
                        <ArticleCard
                          key={article.id}
                          as="li"
                          variant="large"
                          articleInfo={article}
                          index={index}
                          moveX={moveX}
                          onCardClick={handleCardClickWrapper}
                        />
                )}
            </ul>
        </section>
    );
}

export default CarouselContainer;