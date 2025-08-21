// import React from 'react';
import { useState, useEffect } from 'react';
import './ArticleDetailDialog.css';
import { ArticleInfo } from '../../models/ArticleInfo';

interface ArticleDetailDialogProps {
  articleInfo: ArticleInfo;
  onClose: () => void;
}

export const ArticleDetailDialog = ({
    articleInfo,
    onClose
}: ArticleDetailDialogProps) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose();
        }
    };
    
    const startClosing = () => {
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
