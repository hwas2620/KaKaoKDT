// import React from 'react';
import './Article.css';

function Article({ articleInfo }) {
    return (
        <article id={`article_${articleInfo.id}`}>
            <header>
                <h2>{articleInfo.title}</h2>
                <button className="close-bt">X</button>
            </header>
            <main>
                <img src={articleInfo.thumbnail} alt={articleInfo.thumbnailAlt} />
                <p className="contents">{articleInfo.content}</p>
            </main>
        </article>
    );
}

export default Article;