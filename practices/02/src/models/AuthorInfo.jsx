class AuthorInfo {
  constructor(data) {
    this.name = data.name || '작성자 미상';
    this.department = data.department || '';
  }

  getInitials() {
    const names = this.name.split(' ')
    return names[0][0] + names[1][0];
  }
}

export default AuthorInfo;