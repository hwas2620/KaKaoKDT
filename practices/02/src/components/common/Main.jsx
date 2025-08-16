import './Main.css';
import React, { useEffect, useState } from 'react';
import Article from './Article';
import ArticleInfo from '../../models/ArticleInfo';
import articlesData from '../../datas/articles.json';
import CarouselContainer from '../mainpage/CarouselContainer';
import GridContainer from '../mainpage/GridContainer';

function Main() {
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        setArticles(articlesData.map(article => new ArticleInfo(article)));
    }, []);

    const handleCardClick = (articleInfo) => {
        console.log(articleInfo);
    };

    return (
        <main>
          <CarouselContainer articles={articles} onCardClick={handleCardClick} />
          <GridContainer articles={articles} onCardClick={handleCardClick} />
          <section className="article-container">
                {articles.map((article, index) =>
                    <Article key={article.id} articleInfo={article} />
                )}
          </section>
      </main>
    );
}

export default Main;