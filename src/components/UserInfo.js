export class UserInfo {
  constructor(name, info) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  getUserInfo() {
    const userInfo = {
      //Name of property = name of input in form edit profile
      fieldName: this._name.textContent,
      fieldInfo: this._info.textContent
    };
    return userInfo;
  }

  setUserInfo(newName, newInfo) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}
