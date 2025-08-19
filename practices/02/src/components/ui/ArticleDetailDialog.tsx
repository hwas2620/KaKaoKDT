// import React from 'react';
import { useState, useEffect } from 'react';
import './ArticleDetailDialog.css';

function ArticleDetailDialog({ onClose, articleInfo }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose();
        }
    };
    
    const startClosing = () => {
        console.log(isClosing)
        setIsClosing(true);
    };

    useEffect(() => {
        document.body.classList.add('dialog-open');

        return () => {
            document.body.classList.remove('dialog-open');
        };
    }, []);

    return (
        <div className="dialog-overlay" onClick={startClosing}>
            <article
              className={`dialog-content ${isClosing ? 'closing' : ''}`}
              onClick={(e) => e.stopPropagation()}
              onAnimationEnd={handleAnimationEnd}
            >
                <header>
                    <h2>{articleInfo.title}</h2>
                    <button className="close-bt" onClick={startClosing}>X</button>
                </header>
                <main>
                    <img src={articleInfo.thumbnail} alt={articleInfo.thumbnailAlt} />
                    <p className="contents">{articleInfo.content}</p>
                </main>
            </article>
        </div>
    );
}

export default ArticleDetailDialog;