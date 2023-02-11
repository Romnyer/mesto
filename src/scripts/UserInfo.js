export class UserInfo {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.info = userInfo.info;
  }

  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      info: this.info.textContent
    };
    return userInfo;
  }

  setUserInfo(newUserInfo) {
    this.name.textContent = newUserInfo.name;
    this.info.textContent = newUserInfo.info;
  }
}
