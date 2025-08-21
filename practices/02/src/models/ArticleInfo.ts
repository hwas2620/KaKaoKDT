import { AuthorInfo, AuthorData } from './AuthorInfo';

interface ArticleData {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  thumbnailAlt: string;
  author: AuthorData; // AuthorInfo 인스턴스가 아닌, 순수 데이터 객체
  content: string;
  createdAt: string | Date;
  viewCount: number;
}

export class ArticleInfo {
  id?: number = undefined;
  title: string = '제목 없음';
  category: string = '미분류';
  thumbnail: string = './imgs/default-thumbnail.jpg';
  thumbnailAlt: string = '기본 썸네일 이미지';
  author: AuthorInfo = new AuthorInfo();
  content: string = '';
  createdAt: Date = new Date();
  viewCount: number = 0;

  constructor(data: Partial<ArticleData> = {}) {
    Object.assign(this, data);
    
    if (data.author) {
      this.author = new AuthorInfo(data.author);
    }

    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  getExcerpt(length: number = 100): string {
    if (!this.content || this.content.length <= length) {
      return this.content;
    }
    
    return this.content.substring(0, length) + '...';
  }
}
