export interface AuthorData {
  name?: string;
  department?: string;
}

export class AuthorInfo {
  name?: string = '작성자 미상';
  department?: string = '';

  constructor(data: Partial<AuthorData> = {}) {
    Object.assign(this, data);
  }

  getInitials(): string {
    if (!this.name) return '??';

    const names = this.name.split(' ');

    if (names.length === 1) {
      return (names[0]?.[0] ?? '').toUpperCase();
    }

    return ((names[0]?.[0] ?? '') + (names[1]?.[0] ?? '')).toUpperCase();
  }
}
