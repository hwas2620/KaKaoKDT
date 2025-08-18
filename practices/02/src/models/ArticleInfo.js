import AuthorInfo from './AuthorInfo';

class ArticleInfo {
  id = null;
  title = '제목 없음';
  category = '미분류';
  thumbnail = './imgs/default-thumbnail.jpg';
  thumbnailAlt = '기본 썸네일 이미지';
  author = new AuthorInfo();
  content = '';
  createdAt = new Date(); // 기본값은 현재 시간
  viewCount = 0;

  constructor(data = {}) {
    this.id = data.id ?? this.id;
    this.title = data.title ?? this.title;
    this.category = data.category ?? this.category;
    this.thumbnail = data.thumbnail ?? this.thumbnail;
    this.thumbnailAlt = data.thumbnailAlt ?? this.thumbnailAlt;
    this.author = data.author ? new AuthorInfo(data.author) : this.author;
    this.content = data.content ?? this.content;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : this.createdAt;
    this.viewCount = data.viewCount ?? this.viewCount;
  }

  getExcerpt(length = 100) {
    if (!this.content || this.content.length <= length) {
      return this.content;
    }
    
    return this.content.substring(0, length) + '...';
  }
}

export default ArticleInfo;