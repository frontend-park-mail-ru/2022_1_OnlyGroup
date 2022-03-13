class User {
  constructor() {
    this.id = -1;
  }

  id;

  email;

  password;

  firstName;

  lastName;

  birthday;

  city;

  interests;

  aboutUser;

  gender;
}

let activeUser = new User();
export default activeUser;
//
// const user = new UserApi();
//
// function getProfile() {
//   getLongProfile().then((user) => {
//     alert(`OK ${user.id} ${user.aboutUser} ${user.birthday} ${user.lastName} ${user.city}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function getShortProfile() {
//   shortProfile().then((user) => {
//     alert(`OK ${user.id} ${user.lastName}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function CandidateVector() {
//   findCandidate().then((users) => {
//     alert(`OK ${users}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function userFromVector() {
//   findCandidate().then((vector) => {
//     const user1 = new UserApi();
//     user1.id = vector[0];
//     const user2 = new UserApi();
//     user2.id = vector[1];
//     const user3 = new UserApi();
//     user3.id = vector[2];
//     api.getLongProfile().then((user) => {
//       alert(`OK ${user.aboutUser}`);
//     });
//     api.getLongProfile().then((user) => {
//       alert(`OK ${user.aboutUser}`);
//     });
//     api.getLongProfile().then((user) => {
//       alert(`OK ${user.aboutUser}`);
//     });
//   });
// }
//
// function changeProfile() {
//   const user23 = new User();
//   user23.lastName = 'kdv';
//   user23.birthday = '12';
//
//   changeProfile(user23).then((users) => {
//     alert(`OK ${users.id} ${users.lastName}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function auth() {
//   Api.checkLogin().then((bool) => {
//     if (bool) {
//       alert(`OK ${user.id}`);
//     } else {
//       alert('NOT LOGGINED');
//     }
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function logUp() {
//   logUp().then((user) => {
//     alert(`OK ${user.id}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function logIn() {
//   user.password = '0';
//   user.email = 'petrenko';
//   logIn().then((user) => {
//     alert(`OK ${user.id}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
//
// function logOut() {
//   logOut().then((user) => {
//     alert(`OK ${user.id}`);
//   }).catch((msg) => {
//     alert(msg);
//   });
// }
