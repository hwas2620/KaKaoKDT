import React, { ElementType, useMemo } from 'react';
import './ArticleCard.css';
import { ArticleInfo } from '../../models/ArticleInfo';
import { InitialsIcon } from './InitialsIcon';

interface InnerArticleCardProps {
  variant?: 'large' | 'medium' | 'small';
  articleInfo: ArticleInfo;
  index?: number | null;
  moveX?: number;
  onCardClick?: (articleInfo: ArticleInfo) => void;
}

type ArticleCardProps<C extends ElementType> = InnerArticleCardProps & {
  as?: C;
}

const _ArticleCard = <C extends ElementType = 'div'>({
    as: Component,
    variant,
    articleInfo,
    index = null,
    moveX = 0,
    onCardClick
}: ArticleCardProps<C>) => {
    const Tag = Component || 'div';
    const cardStyle = useMemo(() => ({
        ...(index !== null && {
            '--index': index
        }),
        ...(moveX !== 0 && {
            '--moveX': `${moveX}px`,
            '--scale': `${(1000 - Math.abs(moveX)) / 1000}`
        })
    }), [index, moveX]);

    return (
        <Tag className={`article-card ${variant}`} style={cardStyle as React.CSSProperties}>
            <button className="article-card-wrapper" onClick={() => onCardClick?.(articleInfo)}>
                <div className="article-img-container">
                    <img src={articleInfo.thumbnail} alt={articleInfo.thumbnailAlt} />
                </div>
                <div className="article-title-container">
                    {variant === 'large' && (
                        <span className="category">{articleInfo.category}</span>
                    )}
                    <h2 className="title">{articleInfo.title}</h2>
                    {variant === 'medium' && (
                        <p className="excerpt">{articleInfo.getExcerpt()}</p>
                    )}
                    <div className="author">
                        {variant === 'medium' && (
                            <InitialsIcon initials={articleInfo.author.getInitials()} />
                        )}
                        <span className="name">{articleInfo.author.name}</span>
                        <span className="department">{articleInfo.author.department}</span>
                    </div>
                </div>
            </button>
        </Tag>
    );
}

export const ArticleCard = React.memo(_ArticleCard) as typeof _ArticleCard;
