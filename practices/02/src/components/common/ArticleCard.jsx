import React from 'react';
import './ArticleCard.css';
import InitialsIcon from './InitialsIcon';

function ArticleCard({ as: Component = 'div', variant, pos, articleInfo }) {
    return (
        <Component className={`article-card ${variant} ${pos}`}>
            <a href={`#article_${articleInfo.id}`} className="article-card-wrapper">
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
            </a>
        </Component>
    );
}

export default ArticleCard;