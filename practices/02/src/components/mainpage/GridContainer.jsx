import './GridContainer.css';
import ArticleCard from '../common/ArticleCard';

function GridContainer({articles, onCardClick}) {
    return (
        <section className="grid-container">
            <h1 className="grid-title">Best Content</h1>
            <ul className="grid-container-wrapper">
                {articles
                    .toSorted((a, b) => b.viewCount - a.viewCount)
                    .slice(0, 4)
                    .map((article, index) =>
                        <ArticleCard
                          key={article.id}
                          as="li"
                          variant='medium'
                          articleInfo={article}
                          onCardClick={onCardClick} />
                    )
                }
            </ul>
        </section>
    );
}

export default GridContainer;