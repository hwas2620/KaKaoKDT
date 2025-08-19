import React, { useMemo } from 'react';
import './GridContainer.css';
import ArticleCard from '../../ui/ArticleCard';

function GridContainer({articles, onCardClick}) {
    const bestArticles = useMemo(() => {
        return articles
            .toSorted((a, b) => b.viewCount - a.viewCount)
            .slice(0, 4);
    }, [articles]);

    return (
        <section className="grid-container">
            <h1 className="grid-title">Best Content</h1>
            <ul className="grid-container-wrapper">
                {bestArticles.map((article, index) =>
                    <ArticleCard
                        key={article.id}
                        as="li"
                        variant='medium'
                        articleInfo={article}
                        index={index}
                        onCardClick={onCardClick} />
                )}
            </ul>
        </section>
    );
}

export default GridContainer;