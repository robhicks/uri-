"use strict";class t{constructor(t,e={}){return this.ctx=e,this._path=[],this.parse(t)}append(t){return this._path.push(t),this.ctx}delete(t){if(!t)return this._path.pop(),this.ctx}get(){return this._path}parse(t=""){let e=decodeURIComponent(t),r=e.split("/");return Array.isArray(r)&&(e.match(/^\//)&&r.shift(),""===r[0]&&r.shift(),r.length>1&&e.match(/\/$/)&&r.pop(),this._path=r),this}replace(t,e){return"file"===e?(this._path.splice(this._path.length-1,1,t),this.ctx):Number.isInteger(e)?(this._path.splice(e,1,t),this.ctx):(this.parse(t),this.ctx)}toString(t){return t?this.ctx.toString():Array.isArray(this._path)?this._path.join("/"):""}}class e{constructor(t,e={}){return Object.assign(this,e),this.ctx=e,this.set(t),this}add(t={}){return this._query=this._convert(t,this._query[0],this._query[1]),this.ctx}clear(){return this._query=[[],[]],this.ctx}_convert(t,e=[],r=[]){for(let s in t)if(Array.isArray(t[s]))for(let i=0;i<t[s].length;i++){let h=t[s][i];e.push(s),r.push(h)}else t[s]&&(e.push(s),r.push(t[s]));return[e,r]}get(t){let e={},r=this._query;for(let t=0;t<r[0].length;t++){let s=r[0][t],i=r[1][t];e[s]?e[s].push(i):e[s]=[i]}return t?e[t]&&e[t].length?e[t][0]:null:e}getUrlTemplateQuery(){return this._urlTemplateQueryString}merge(t){let e=this._query[0],r=this._query[1];for(let s in t){let i=!1;for(let h=0;h<e.length;h++){if(s===e[h]){if(i){e.splice(h,1),r.splice(h,1);continue}Array.isArray(t[s])?r[h]=t[s].shift():void 0===t[s]||null===t[s]?(e.splice(h,1),r.splice(h,1),delete t[s]):(r[h]=t[s],delete t[s]),i=!0}}}return this._query=this._convert(t,this._query[0],this._query[1]),this.ctx}_parse(t=""){let e=[[],[]],r=t.split(/&|;/);for(let t=0;t<r.length;t++){let s=r[t].match(this.qRegEx);if(s&&void 0!==s[s.length-1]){s.shift();for(let t=0;t<s.length;t++){let r=s[t];e[t].push(decodeURIComponent(r.replace("+"," ","g")))}}}return e}set(...t){let e=[...t];if(1===e.length)this._query="object"==typeof e[0]?this._convert(e[0]):this._parse(e[0]);else if(0===e.length)this.clear();else{let t={};t[e[0]]=e[1],this.merge(t)}return this.ctx}setUrlTemplateQuery(t){this._urlTemplateQueryString=t}toString(t){if(t)return this.ctx.toString();let e=[],r=this._query[0],s=this._query[1];for(let t=0;t<r.length;t++)e.push(encodeURIComponent(r[t])+"="+encodeURIComponent(s[t]));return e.join("&")}}class r{constructor(t){this.string=String(t&&void 0!==t?t:"")}toString(){return this.string}append(t){return this.string+=t,this}insert(t,e){this.string.length;let r=this.string.slice(0,t),s=this.string.slice(t);return this.string=r+e+s,this}}class s{constructor(t){return this.uriRegEx=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,this.authRegEx=/^([^\@]+)\@/,this.portRegEx=/:(\d+)$/,this.qRegEx=/^([^=]+)(?:=(.*))?$/,this.urlTempQueryRegEx=/\{\?(.*?)\}/,this.parse(t)}authority(t=""){if(""!==t){let e=t.match(this.authRegEx);this._authority=t,e&&(t=t.replace(this.authRegEx,""),this.userInfo(e[1]));let r=t.match(this.portRegEx);return r&&(t=t.replace(this.portRegEx,""),this.port(r[1])),this.host(t.replace("{","")),this}let e=this.userInfo();e&&(t=e+"@"),t+=this.host();let r=this.port();return r&&(t=t+":"+r),t}fragment(t=""){return this.gs(t,"_fragment")}gs(t,e,r){return void 0!==t?(this[e]=t,this):r?r(this[e]):this[e]?this[e]:""}host(t){return this.gs(t,"_host")}parse(r){let s=r?r.match(this.uriRegEx):[],i=r?r.match(this.urlTempQueryRegEx):[];return this.scheme(s[2]),this.authority(s[4]),this.path=new t(s[5]?s[5].replace(/{$/,""):"",this),this.fragment(s[9]),this.query=new e(s[7]?s[7]:"",this),i&&this.query.setUrlTemplateQuery(i[1]),this}port(t){return this.gs(t,"_port")}protocol(t){return(this._scheme||"").toLowerCase()}scheme(t){return this.gs(t,"_scheme")}userInfo(t){return this.gs(t,"_userinfo",t=>t?encodeURI(t):t)}toString(){let t=this.query.toString(),e=this.path.toString();this.fragment();let s=this.scheme();return(new r).append(s?s+"://":"").append(this.authority()).append("/").append(e).append(""!==t?"?":"").append(t).toString().replace("/?","?").replace(/\/$/,"")}static clone(t){return new s(t.toString())}}module.exports=s;
