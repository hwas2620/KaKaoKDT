class AuthorInfo {
  name = '작성자 미상';
  department = '';

  constructor(data = {}) {
    this.name = data.name ?? this.name;
    this.department = data.department ?? this.department;
  }

  getInitials() {
    if (!this.name) return '??';

    const names = this.name.split(' ');

    if (names.length === 1) {
      return names[0][0];
    }

    return names[0][0] + names[1][0];
  }
}

export default AuthorInfo;