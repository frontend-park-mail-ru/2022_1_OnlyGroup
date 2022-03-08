function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function x(){};

export default function appComponent(locals) {var pug_html = "", pug_mixins = {}, pug_interp;let source = "/static/images/";
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
pug_mixins["createMessage"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"message__block\"\u003E\u003Cdiv class=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info\"\u003E \u003Cp class=\"username\"\u003EUsername \u003C\u002Fp\u003E\u003Cp class=\"message\"\u003EVery long message \u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"quantity__block\"\u003E\u003Cp class=\"quantity\"\u003E1\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E \u003Cdiv class=\"content__profile\"\u003E\u003Cdiv class=\"profile__user\"\u003E\u003Cdiv class=\"user__avatar\"\u003E \u003Cimg" + (" class=\"avatar__img\""+pug_attr("src", avatar, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"user__info\"\u003E\u003Cdiv class=\"info\"\u003E";
pug_mixins["userInfo"]("David Jones, " ,23, "New York");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"settings\"\u003E\u003Cdiv class=\"settings__link\"\u003E\u003Cimg" + (" class=\"link__img\""+pug_attr("src", `${settings}`, true, false)) + "\u002F\u003E\u003Ca class=\"settings__edit\" href=\"\u002Fprofile\u002Fsettings\"\u003EEdit profile\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"profile__navigation\"\u003E\u003Cdiv class=\"navigation__buttons\"\u003E\u003Cdiv class=\"buttons__message\"\u003E \u003Cimg" + (" class=\"buttons__message__icon\""+pug_attr("src", `${MsgLight}`, true, false)) + "\u002F\u003E\u003Ca class=\"message__link\" href=\"#\"\u003EMessage\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"buttons__matches\"\u003E \u003Cimg" + (" class=\"buttons__matches__icon\""+pug_attr("src", `${Matches}`, true, false)) + "\u002F\u003E\u003Ca class=\"matches__link\" href=\"#\"\u003EMatches\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"navigation__field\"\u003E ";
pug_mixins["createMessage"]();
pug_mixins["createMessage"]();
pug_mixins["createMessage"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content__feed\"\u003E\u003Cdiv class=\"feed__people\"\u003E\u003Cdiv class=\"people__photo\"\u003E\u003Cimg" + (pug_attr("src", `${source}userPhoto.png`, true, false)) + "\u002F\u003E\u003Cdiv class=\"navigation__icons\"\u003E";
pug_mixins["createNavIcons"](navIcons);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"feed__info\"\u003E \u003Cdiv class=\"info__name\"\u003E";
pug_mixins["userInfo"]("Sandra May, ", 23, "New York");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__description\"\u003E\u003Cp class=\"info__title\"\u003EAbout me \u003C\u002Fp\u003E\u003Cp class=\"description\"\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum lorem vel nibh porttitor, in fermentum nisi egestas. Maecenas pellentesque sem felis, sed iaculis neque porta ac. Sed consectetur eros sed sodales iaculis. Donec eu mattis ante. \u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__interests\"\u003E\u003Cp class=\"title\"\u003EInterests \u003C\u002Fp\u003E";
pug_mixins["createBlock"](interests);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"info__horoscope\"\u003E\u003Cp class=\"horoscopeTitle\"\u003EHoroscope compatibility\u003C\u002Fp\u003E\u003Cdiv class=\"horoscope__block\"\u003E\u003Cimg" + (pug_attr("src", `${horoscopeImg}`, true, false)) + "\u002F\u003E\u003Cp class=\"horoscope__description\"\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum lorem vel nibh porttitor, in fermentum nisi egestas. \u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}