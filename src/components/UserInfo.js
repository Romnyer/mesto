export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this.name = document.querySelector(nameSelector);
    this.info = document.querySelector(infoSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      //Name of property = name of input in form edit profile
      fieldName: this.name.textContent,
      fieldInfo: this.info.textContent
    };
    return userInfo;
  }

  setUserInfo({name, about, avatar, _id}) {
    this.setProfileInfo(name, about);
    this.setAvatar(avatar);
    this.id = _id;
  }

  setProfileInfo(name, about) {
    this.name.textContent = name;
    this.info.textContent = about;
  }

  setAvatar(avatar) {
    this.avatar.src = avatar;
  }
}
