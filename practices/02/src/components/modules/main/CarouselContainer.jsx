import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CarouselContainer.css';
import ArticleCard from '../../ui/ArticleCard';
import cu from './CarouselUtils';
import useInterval from '../../../hooks/useInterval';

function CarouselContainer({articles, onCardClick}) {
    const [carouselCards, setCarouselCards] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const autoSlideIntervalIdRef = useRef(null);
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

    const intervalSlide = useInterval(handleSlideRight, cu.AUTO_SLIDE_TIME_MS);

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
            <ul className="carousel-container-wrapper">
                {carouselCards
                    .slice(0, cu.VISIBLE_CARD_COUNT + 2)
                    .map((article, index) =>
                        <ArticleCard
                          key={article.id}
                          as="li"
                          variant="large"
                          articleInfo={article}
                          index={index}
                          onCardClick={onCardClick}
                        />
                )}
            </ul>
        </section>
    );
}

export default CarouselContainer;