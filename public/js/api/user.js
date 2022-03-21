class User {
  #id;
  #email;
  #password;
  #firstName;
  #lastName;
  #birthday;
  #city;
  #interests;
  #aboutUser;
  #gender;

  constructor() {
    this.#id = -1;
  }

  async logout() {
    this.#id = -1;
  }

  setId(newId) {
    this.#id = newId;
  }

  setEmail(newEmail) {
    this.#email = newEmail;
  }

  setPassword(newPassword) {
    this.#password = newPassword;
  }

  setFirstName(newFirstName) {
    this.#firstName = newFirstName;
  }

  setLastName(newLastName) {
    this.#lastName = newLastName;
  }

  setBirthday(newBirthday) {
    this.#birthday = newBirthday;
  }

  setCity(newCity) {
    this.#city = newCity;
  }

  setInterests(newInterests) {
    this.#interests = newInterests;
  }

  setInfo(newInfo) {
    this.#aboutUser = newInfo;
  }

  setGender(newGender) {
    this.#gender = newGender;
  }

  getId() {
    return this.#id;
  }

  getEmail() {
    return this.#email;
  }

  getPassword() {
    return this.#password;
  }

  getFirstName() {
    return this.#firstName;
  }

  getLastName() {
    return this.#lastName;
  }

  getBirthday() {
    return this.#birthday;
  }

  getCity() {
    return this.#city;
  }

  getInterests() {
    return this.#interests;
  }

  getInfo() {
    return this.#aboutUser;
  }

  getGender() {
    return this.#gender;
  }
}

const activeUser = new User();
export default activeUser;