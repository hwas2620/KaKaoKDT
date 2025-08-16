import './Main.css';
import React, { useEffect, useState } from 'react';
import Article from '../ui/Article';
import ArticleInfo from '../../models/ArticleInfo';
import articlesData from '../../datas/articles.json';
import CarouselContainer from '../modules/main/CarouselContainer';
import GridContainer from '../modules/main/GridContainer';

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