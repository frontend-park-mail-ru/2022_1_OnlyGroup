function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function x(){};

export default function editProfilePageComponent(locals) {var pug_html = "", pug_mixins = {}, pug_interp;let source = "/static/images/";
let avatar = source + "avatar.png";
let MsgLight = source + "MsgLight.png";
let Matches = source + "CardsDark.png";
let location = source + "location.png";
let settings = source + "settings.png";
let horoscopeImg = source + "horoscope1.png";
let imgSrc = [source + "google.svg", source + "vk.svg", source + "facebook.svg", source + "twitter.svg"];
let navIcons = [source + "favorite.png", source + "like.png", source + "dislike.png"];
let interests = ["Music", "Reading a books", "Watching films", "Walking with friends"];
pug_mixins["userInfo"] = pug_interp = function(fullName, age, city){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cp class=\"fullname\"\u003E" + (pug_escape(null == (pug_interp = fullName + age) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"info__city\"\u003E\u003Cimg" + (pug_attr("src", `${location}`, true, false)) + "\u002F\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = city) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
};











pug_mixins["createNavIcons"] = pug_interp = function(navIcons){
var block = (this && this.block), attributes = (this && this.attributes) || {};
// iterate navIcons 
;(function(){
  var $$obj = navIcons ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var iNav = $$obj[pug_index1];
pug_html = pug_html + "\u003Ca href=\"#\"\u003E\u003Cimg" + (" class=\"navIcons\""+pug_attr("src", iNav, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var iNav = $$obj[pug_index1];
pug_html = pug_html + "\u003Ca href=\"#\"\u003E\u003Cimg" + (" class=\"navIcons\""+pug_attr("src", iNav, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
    }
  }
}).call(this);

};
pug_mixins["createBlock"] = pug_interp = function(buffer){
var block = (this && this.block), attributes = (this && this.attributes) || {};
// iterate buffer 
;(function(){
  var $$obj = buffer ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var iBlock = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv class=\"block\"\u003E \u003Cp\u003E" + (pug_escape(null == (pug_interp = iBlock) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var iBlock = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv class=\"block\"\u003E \u003Cp\u003E" + (pug_escape(null == (pug_interp = iBlock) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

};




pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E \u003Cdiv class=\"content__profile\"\u003E\u003Cdiv class=\"profile__user\"\u003E\u003Cdiv class=\"user__avatar\"\u003E \u003Cimg" + (" class=\"avatar__img\""+pug_attr("src", avatar, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"user__info__block\"\u003E\u003Cdiv class=\"user__info\"\u003E";
pug_mixins["userInfo"]("David Jones, " ,23, "New York");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"user__settings\"\u003E\u003Cdiv class=\"settings\"\u003E\u003Cimg" + (pug_attr("src", `${settings}`, true, false)) + "\u002F\u003E\u003Ca class=\"settings__edit\" href=\"\u002Fprofile\u002Fsettings\"\u003EEdit profile\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"profile__navigation\"\u003E\u003Cdiv class=\"navigation__profile\"\u003E \u003Cform id=\"editProfile\"\u003E\u003Cdiv class=\"nameBlock\"\u003E\u003Cdiv class=\"block\"\u003E \u003Cp class=\"nameP\"\u003EName: \u003C\u002Fp\u003E\u003Cinput class=\"nameInput form__input__require\" type=\"text\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"error\"\u003E\u003Cp class=\"nameInput__error _error\"\u003EError\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"surnameBlock\"\u003E\u003Cdiv class=\"block\"\u003E \u003Cp class=\"surnameP\"\u003ESurname: \u003C\u002Fp\u003E\u003Cinput class=\"surnameInput form__input__require\" type=\"text\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"error\"\u003E \u003Cp class=\"surnameInput__error _error\"\u003EError\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ageBlock\"\u003E\u003Cdiv class=\"block\"\u003E \u003Cp class=\"ageP\"\u003EAge: \u003C\u002Fp\u003E\u003Cinput class=\"ageInput form__input__require\" type=\"text\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"error\"\u003E \u003Cp class=\"ageInput__error _error\"\u003EError\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cityBlock\"\u003E\u003Cdiv class=\"block\"\u003E \u003Cp class=\"cityP\"\u003ECity: \u003C\u002Fp\u003E\u003Cinput class=\"cityInput form__input__require\" type=\"text\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"error\"\u003E \u003Cp class=\"cityInput__error _error\"\u003EError\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"photoBlock\"\u003E\u003Cp class=\"photoP\"\u003EChange photo: \u003C\u002Fp\u003E\u003Cinput class=\"photo\" type=\"file\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"buttonsBlock\"\u003E\u003Cbutton class=\"cancel\" type=\"submit\"\u003ECancel \u003C\u002Fbutton\u003E\u003Cbutton class=\"save\" type=\"submit\"\u003ESave changes\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content__feed\"\u003E\u003Cdiv class=\"feed__people\"\u003E\u003Cdiv class=\"people__photo\"\u003E\u003Cimg" + (pug_attr("src", `${source}userPhoto.png`, true, false)) + "\u002F\u003E\u003Cdiv class=\"navigation__icons\"\u003E";
pug_mixins["createNavIcons"](navIcons);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"feed__info\"\u003E \u003Cdiv class=\"info__name\"\u003E";
pug_mixins["userInfo"]("Sandra May, ", 23, "New York");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__description\"\u003E\u003Cp class=\"info__title\"\u003EAbout me \u003C\u002Fp\u003E\u003Cp class=\"description\"\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum lorem vel nibh porttitor, in fermentum nisi egestas. Maecenas pellentesque sem felis, sed iaculis neque porta ac. Sed consectetur eros sed sodales iaculis. Donec eu mattis ante. \u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__interests\"\u003E\u003Cp class=\"title\"\u003EInterests \u003C\u002Fp\u003E";
pug_mixins["createBlock"](interests);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__horoscope\"\u003E\u003Cp class=\"horoscopeTitle\"\u003EHoroscope compatibility\u003C\u002Fp\u003E\u003Cdiv class=\"horoscope__block\"\u003E\u003Cimg" + (pug_attr("src", `${horoscopeImg}`, true, false)) + "\u002F\u003E\u003Cp class=\"horoscope__description\"\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum lorem vel nibh porttitor, in fermentum nisi egestas. \u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}