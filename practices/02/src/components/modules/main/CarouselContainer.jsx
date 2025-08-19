import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CarouselContainer.css';
import ArticleCard from '../../ui/ArticleCard';
import cu from './CarouselUtils';
import useInterval from '../../../hooks/useInterval';
import useSwipe from '../../../hooks/useSwipe';
import useCarousel from '../../../hooks/useCarousel';



function CarouselContainer({articles, onCardClick}) {
    const [carouselCards, isAnimating, handleSlideLeft, handleSlideRight, handleTransitionEnd] = useCarousel(articles);
    const [swipeHandlers, isDragging, moveX, handleCardClick] = useSwipe({
        isAnimating,
        onSwipeLeft: handleSlideLeft,
        onSwipeRight: handleSlideRight,
        onClick: onCardClick
    });
    const intervalSlide = useInterval(handleSlideLeft, cu.AUTO_SLIDE_TIME_MS);

    useEffect(() => {
        if (!isDragging) {
            intervalSlide.start();
        }

        return () => {
            intervalSlide.stop();
        };
    }, [isDragging, intervalSlide]);

    return (
        <section className="carousel-container">
            <ul
              className={`carousel-container-wrapper ${isDragging ? 'grabbing' : ''}`}
              {...swipeHandlers}
              onTransitionEnd={handleTransitionEnd}
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
                          onCardClick={handleCardClick}
                        />
                )}
            </ul>
        </section>
    );
}

export default CarouselContainer;