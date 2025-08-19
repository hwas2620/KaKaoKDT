import './Main.css';
import React, { useCallback, useEffect, useState } from 'react';
import ArticleDetailDialog from '../ui/ArticleDetailDialog';
import ArticleInfo from '../../models/ArticleInfo';
import articlesData from '../../datas/articles.json';
import CarouselContainer from '../modules/main/CarouselContainer';
import GridContainer from '../modules/main/GridContainer';

function Main() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    
    useEffect(() => {
        setArticles(articlesData.map(article => new ArticleInfo(article)));
    }, []);

    const handleCardClick = useCallback((articleInfo) => {
        setSelectedArticle(articleInfo);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setSelectedArticle(null);
    }, []);


    return (
        <main>
            <CarouselContainer articles={articles} onCardClick={handleCardClick} />
            <GridContainer articles={articles} onCardClick={handleCardClick} />
            {selectedArticle && (
                <ArticleDetailDialog
                  articleInfo={selectedArticle}
                  onClose={handleCloseDialog}
                />
            )}
      </main>
    );
}

export default Main;