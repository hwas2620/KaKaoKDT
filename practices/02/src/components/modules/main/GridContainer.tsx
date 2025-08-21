import React, { useMemo } from 'react';
import './GridContainer.css';
import { ArticleCard } from '../../ui/ArticleCard';
import { ArticleInfo } from '../../../models/ArticleInfo';

interface GridContainerProps {
  articles: ArticleInfo[];
  onCardClick: (articleInfo: ArticleInfo) => void;
}

export const GridContainer = ({
    articles,
    onCardClick
}: GridContainerProps) => {
    const bestArticles = useMemo(() => {
        return articles
            .toSorted((a: any, b: any) => b.viewCount - a.viewCount)
            .slice(0, 4);
    }, [articles]);

    return (
        <section className="grid-container">
            <h1 className="grid-title">Best Content</h1>
            <ul className="grid-container-wrapper">
                {bestArticles.map((article: any, index: any) =>
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
