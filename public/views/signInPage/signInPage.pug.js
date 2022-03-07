function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function x(){};

export default function signInPageComponent(locals) {var pug_html = "", pug_mixins = {}, pug_interp;let source = '../../static/images/';
let imgSrc = [source + 'vk.svg', source + 'google.svg', source + 'facebook.svg'];











pug_mixins["createInput"] = pug_interp = function(iType, iClass){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([iClass], [true]), false, false)+pug_attr("type", iType, true, false)) + "\u002F\u003E";
};
pug_mixins["createP"] = pug_interp = function(text, pClass){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cp" + (pug_attr("class", pug_classes([pClass], [true]), false, false)) + "\u003E" + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"main__content\"\u003E\u003Cdiv class=\"overlay\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content__authorize\"\u003E \u003Cdiv class=\"authorize__logo\"\u003E\u003Cimg" + (" class=\"logo__img\""+pug_attr("src", `${source}logo.png`, true, false)) + "\u002F\u003E\u003Ch1 class=\"logo__text\"\u003EOnlySocial\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"authorize__form\"\u003E \u003Cform id=\"form\" action=\"#\"\u003E";
pug_mixins["createP"].call({
block: function(){
pug_html = pug_html + " ";
}
}, 'Email', 'form__text__email');
pug_mixins["createInput"]('text', 'form__login form__input__require');
pug_html = pug_html + "\u003Cdiv class=\"form__error\"\u003E";
pug_mixins["createP"].call({
block: function(){
pug_html = pug_html + " ";
}
}, 'Error: wrong email', 'form__login__error form__input__error');
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_mixins["createP"].call({
block: function(){
pug_html = pug_html + " ";
}
}, 'Password', 'form__text__password');
pug_mixins["createInput"].call({
block: function(){
pug_html = pug_html + " ";
}
}, 'password', 'form__password form__input__require');
pug_html = pug_html + "\u003Cdiv class=\"form__error\"\u003E ";
pug_mixins["createP"]('Error: wrong password', 'form__password__error form__input__error');
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cbutton class=\"form__button\" type=\"submit\"\u003ESign in\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form__create-new-account\"\u003E";
pug_mixins["createP"]('Don\'t have account?', '');
pug_html = pug_html + "\u003Ca href=\"\u002Fregistration\"\u003ECreate account\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}