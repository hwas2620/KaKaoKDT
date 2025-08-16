const carouselUtils ={
    VISIBLE_CARD_COUNT: 3,
    CAROUSEL_ITEM_LIMIT: 8,
    AUTO_SLIDE_TIME_MS: 3000,
    CLICK_THRESHOLD_PX: 5,
    POSITION_CLASSES: {
        0: 'pos-left-extra is-out',
        1: 'pos-left',
        2: 'pos-center',
        3: 'pos-right',
        4: 'pos-right-extra is-out'
    },

    getPositionClass(index) {
        return this.POSITION_CLASSES[index] ?? 'is-out';
    }
}

export default carouselUtils;