export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._descEl = document.querySelector(descriptionSelector);
    this._avatarEl = avatarSelector ? document.querySelector(avatarSelector) : null;
  }

  getUserInfo() {
    return {
      name: this._nameEl?.textContent || "",
      description: this._descEl?.textContent || "",
      avatar: this._avatarEl?.src || "",
    };
  }

  setUserInfo({ name, description, avatar }) {
    if (typeof name === "string" && this._nameEl) this._nameEl.textContent = name;
    if (typeof description === "string" && this._descEl) this._descEl.textContent = description;
    if (avatar && this._avatarEl) {
      this._avatarEl.src = avatar;
      this._avatarEl.alt = name ? `Avatar of ${name}` : (this._avatarEl.alt || "User avatar");
    }
  }

  setAvatar(avatarUrl) {
    if (this._avatarEl && avatarUrl) this._avatarEl.src = avatarUrl;
  }
}
