import './CarouselContainer.css';
import ArticleCard from '../common/ArticleCard';

function CarouselContainer({articles, onCardClick}) {
    return (
        <section className="carousel-container">
            <ul className="carousel-container-wrapper">
                {articles.map((article, index) =>
                    <ArticleCard key={article.id} as="li" variant='large' articleInfo={article} />
                )}
            </ul>
        </section>
    );
}

export default CarouselContainer;