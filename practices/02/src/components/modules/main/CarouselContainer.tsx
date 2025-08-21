import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CarouselContainer.css';
import { ArticleCard } from '../../ui/ArticleCard';
import cu from './CarouselUtils';
import { useInterval } from '../../../hooks/useInterval';
import { useSwipe } from '../../../hooks/useSwipe';
import { useCarousel } from '../../../hooks/useCarousel';
import { ArticleInfo } from '../../../models/ArticleInfo';

interface CarouselContainerProps {
  articles: ArticleInfo[];
  onCardClick: (articleInfo: ArticleInfo) => void;
}

export const CarouselContainer = ({
    articles,
    onCardClick
}: CarouselContainerProps) => {
    const { items: carouselCards, isAnimating, handleSlideLeft, handleSlideRight, handleTransitionEnd } = useCarousel(articles);
    const { swipeHandlers, isDragging, moveX, handleCardClick } = useSwipe({
        isAnimating,
        onSwipeLeft: handleSlideLeft,
        onSwipeRight: handleSlideRight,
        onClick: onCardClick
    });
    
    useInterval(handleSlideLeft, isDragging ? null : cu.AUTO_SLIDE_TIME_MS);

    return (
        <section className="carousel-container">
            <ul
              className={`carousel-container-wrapper ${isDragging ? 'grabbing' : ''}`}
              {...swipeHandlers}
              onTransitionEnd={handleTransitionEnd}
            >
                {carouselCards
                    .slice(0, cu.VISIBLE_CARD_COUNT + 2)
                    .map((article: any, index: any) =>
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
