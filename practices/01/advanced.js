document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.querySelector('.carousel-container-wrapper');
    const allCards = articleList.querySelectorAll('.article-card.large');
    let virtualCards = Array.from(allCards);

    const maxCards = 3;
    
    let isAnimating = false;
    let autoSlideInterval;
    const autoSlideTime = 3000;

    let isDragging = false;
    let dragDir = 0;
    let startX = 0;
    const clickThreshold = 5;

    function updateCarousel(skipTransition = false) {
        virtualCards.forEach((card, index) => {
            if (skipTransition) {
                card.style.transition = 'none';
            }

            switch(index) {
                case 0:
                    card.className = 'article-card large pos-left';
                    break;
                case 1:
                    card.className = 'article-card large pos-center';
                    break;
                case 2:
                    card.className = 'article-card large pos-right';
                    break;
                default:
                    card.classList.add('is-out');
                    break;
            }

            if (skipTransition) {
                requestAnimationFrame(() => {
                    card.style.transition = '';
                });
            }
        });
    }

    // 왼쪽으로 슬라이드
    function showNextCard() {
        if (isAnimating) return;
        isAnimating = true;

        const rightCard = virtualCards[maxCards];
        if (!rightCard) { isAnimating = false; return; }

        rightCard.style.transition = 'none';
        rightCard.className = 'article-card large pos-right-extra is-out';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                rightCard.style.transition = '';
                const leftCard = virtualCards.shift();
                leftCard.className = 'article-card large pos-left-extra is-out';
                virtualCards.push(leftCard);
                updateCarousel();
            });
        });
    }

    // 오른쪽으로 슬라이드
    function showPrevCard() {
        if (isAnimating) return;
        isAnimating = true;
        
        const lastCard = virtualCards.pop();
        lastCard.style.transition = 'none';
        lastCard.className = 'article-card large pos-left-extra is-out';
        virtualCards.unshift(lastCard);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lastCard.style.transition = '';
                const rightCard = virtualCards[maxCards];
                rightCard.className = 'article-card large pos-right-extra is-out';
                updateCarousel();
            });
        });
    }
    
    function onTransitionEnd(event) {
        if (event.propertyName === 'opacity') {
            isAnimating = false;
        }
    }

    // 자동 슬라이드
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
            const articleCardWrapper = card.querySelector('.article-card-wrapper');

            switch(index) {
                case 0:
                    articleCardWrapper.style.transition = 'none';
                    articleCardWrapper.style.transform = `translateX(${moveX}px)`;
                    break;
                case 1:
                    articleCardWrapper.style.transition = 'none';
                    articleCardWrapper.style.transform = `translateX(${moveX}px) scale(${(1000 - Math.abs(moveX)) / 1000})`;
                    break;
                case 2:
                    articleCardWrapper.style.transition = 'none';
                    articleCardWrapper.style.transform = `translateX(${moveX}px)`;
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
            const articleCardWrapper = card.querySelector('.article-card-wrapper');

            articleCardWrapper.style.transition = 'transform 0.5s ease';
            articleCardWrapper.style.transform = '';
        });

        if (dragDir < 0) {
            showNextCard();
        } else if (dragDir > 0) {
            showPrevCard();
        }
        startAutoSlide();
    }

    // 아티클 카드에 클릭 이벤트 추가
    const contentArticles = document.querySelectorAll('.article-container article');

    function clickCard(event) {
        if (dragDir !== 0) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const clickedCard = this.closest('.article-card');

        if (clickedCard.classList.contains('pos-left')) {
            event.preventDefault();
            showPrevCard();
        } else if (clickedCard.classList.contains('pos-right')) {
            event.preventDefault();
            showNextCard();
        } else {
            event.preventDefault();
            
            contentArticles.forEach(article => {
                article.classList.remove('visible');
            });

            const targetId = this.getAttribute('href');
            const targetArticle = document.querySelector(targetId);

            if (targetArticle) {
                targetArticle.classList.add('visible');
            }
        }
    }

    function clickCloseButton(event) {
        resetAutoSlide();

        const articleContent = this.closest('article');

        articleContent.classList.remove("visible");
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

    const articleCards = document.querySelectorAll('.article-card .article-card-wrapper');

    articleCards.forEach(link => {
        link.addEventListener('click', clickCard);
    });

    const articleContentCloseButtons = document.querySelectorAll('.article-container .close-bt');

    articleContentCloseButtons.forEach(button => {
        button.addEventListener('click', clickCloseButton);
    });

    // 초기 상태 설정
    updateCarousel(skipTransition=true);
    startAutoSlide();
});
