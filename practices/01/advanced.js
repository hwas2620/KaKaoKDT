document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.querySelector('.article-list ul');
    const allCards = document.querySelectorAll('.article-card');
    let virtualCards = Array.from(allCards);

    const maxCards = 3;
    
    let isAnimating = false;
    let autoSlideInterval;
    const autoSlideTime = 4000;

    let isDragging = false;
    let dragDir = 0;
    let startX = 0;
    const clickThreshold = 5;

    function updateCarousel() {
        virtualCards.forEach((card, index) => {
            switch(index) {
                case 0:
                    card.className = 'article-card pos-left';
                    break;
                case 1:
                    card.className = 'article-card pos-center';
                    break;
                case 2:
                    card.className = 'article-card pos-right';
                    break;
                default:
                    break;
            }
        });
    }

    // 왼쪽으로 드래그
    function showNextCard() {
        if (isAnimating) return;
        isAnimating = true;

        const rightCard = virtualCards[maxCards];
        if (!rightCard) { isAnimating = false; return; }

        rightCard.style.transition = 'none';
        rightCard.className = 'article-card pos-right-extra';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                rightCard.style.transition = '';
                const leftCard = virtualCards.shift();
                leftCard.className = 'article-card pos-left-extra';
                virtualCards.push(leftCard);
                updateCarousel();
            });
        });
    }

    // 오른쪽으로 드래그
    function showPrevCard() {
        if (isAnimating) return;
        isAnimating = true;
        
        const lastCard = virtualCards.pop();
        lastCard.style.transition = 'none';
        lastCard.className = 'article-card pos-left-extra';
        virtualCards.unshift(lastCard);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lastCard.style.transition = '';
                const rightCard = virtualCards[maxCards];
                rightCard.className = 'article-card pos-right-extra';
                updateCarousel();
            });
        });
    }
    
    function onTransitionEnd(event) {
        if (event.propertyName === 'opacity') {
            isAnimating = false;
        }
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(showNextCard, autoSlideTime);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 드래그 이벤트
    function dragStart(event) {
        event.preventDefault();
        stopAutoSlide();

        isDragging = true;
        dragDir = 0;
        startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        articleList.classList.add('grabbing');
    }

    function dragMove(event) {
        if (!isDragging) return;

        const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        const dragOffset = currentX - startX;
        const moveX = Math.max(-20, Math.min(20, dragOffset / 5));

        virtualCards.forEach((card, index) => {
            const a = card.querySelector('a');

            switch(index) {
                case 0:
                    a.style.transition = 'none';
                    a.style.transform = `translateX(${moveX}px)`;
                    break;
                case 1:
                    a.style.transition = 'none';
                    a.style.transform = `translateX(${moveX}px) scale(${(1000 - Math.abs(moveX)) / 1000})`;
                    break;
                case 2:
                    a.style.transition = 'none';
                    a.style.transform = `translateX(${moveX}px)`;
                    break;
                default:
                    break;
            }
        });
        
        if (Math.abs(dragOffset) > clickThreshold) {
            dragDir = dragOffset < 0 ? -1 : 1;
        } else {
            dragDir = 0;
        }
    }

    function dragEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        articleList.classList.remove('grabbing');

        
        virtualCards.forEach((card, index) => {
            const a = card.querySelector('a');

            a.style.transition = 'transform 0.5s ease';
            a.style.transform = '';
        });

        if (dragDir < 0) {
            showNextCard();
        } else if (dragDir > 0) {
            showPrevCard();
        }
        startAutoSlide();
    }
    
    // 이벤트 리스너 등록
    articleList.addEventListener('mousedown', dragStart);
    articleList.addEventListener('mousemove', dragMove);
    articleList.addEventListener('mouseup', dragEnd);
    articleList.addEventListener('mouseleave', dragEnd);
    articleList.addEventListener('touchstart', dragStart, { passive: false });
    articleList.addEventListener('touchmove', dragMove);
    articleList.addEventListener('touchend', dragEnd);
    articleList.addEventListener('transitionend', onTransitionEnd);

    // 아티클 카드에 클릭 이벤트 추가
    const articleCardLinks = document.querySelectorAll('.article-card > a');
    const contentArticles = document.querySelectorAll('.article-content > article');

    articleCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (dragDir !== 0) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            const clickedCard = link.closest('.article-card');

            if (clickedCard.classList.contains('pos-left')) {
                event.preventDefault();
                showPrevCard();
            } else if (clickedCard.classList.contains('pos-right')) {
                event.preventDefault();
                showNextCard();
            } else if (clickedCard.classList.contains('pos-center')) {
                event.preventDefault();
                
                contentArticles.forEach(article => {
                    article.classList.remove('visible');
                });

                const targetId = link.getAttribute('href');
                const targetArticle = document.querySelector(targetId);

                if (targetArticle) {
                    targetArticle.classList.add('visible');
                }
            }
        });
    });

    const articleContentCloseButtons = document.querySelectorAll('.article-content .close-bt');

    articleContentCloseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            resetAutoSlide();

            const articleContent = button.closest('article');

            articleContent.classList.remove("visible");
        });
    });

    // 초기 상태 설정
    updateCarousel();
    startAutoSlide();
});
