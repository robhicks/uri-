var Path=function(t,r){return void 0===r&&(r={}),this.ctx=r,this._path=[],this.parse(t)};Path.prototype.append=function(t){return this._path.push(t),this},Path.prototype.delete=function(t){if(!t)return this._path.pop(),this},Path.prototype.get=function(){return this._path},Path.prototype.parse=function(t){void 0===t&&(t="");var r=decodeURIComponent(t),e=r.split("/");return Array.isArray(e)&&(r.match(/^\//)&&e.shift(),e.length>1&&r.match(/\/$/)&&e.pop(),this._path=e),this},Path.prototype.replace=function(t,r){return"file"===r?(this._path.splice(this._path.length-1,1,t),this):Number.isInteger(r)?(this._path.splice(r,1,t),this):this.parse(t)},Path.prototype.toString=function(t){return t?this.ctx.toString():Array.isArray(this._path)?this._path.join("/"):""};var Query=function(t,r){return void 0===r&&(r={}),Object.assign(this,r),this.ctx=r,this.set(t),this};Query.prototype.add=function(t){return void 0===t&&(t={}),this._query=this._convert(t,this._query[0],this._query[1]),this},Query.prototype.clear=function(){return this._query=[[],[]],this},Query.prototype._convert=function(t,r,e){void 0===r&&(r=[]),void 0===e&&(e=[]);for(var i in t)if(Array.isArray(t[i]))for(var n=0;n<t[i].length;n++){var s=t[i][n];r.push(i),e.push(s)}else t[i]&&(r.push(i),e.push(t[i]));return[r,e]},Query.prototype.get=function(){for(var t={},r=this._query,e=0;e<r[0].length;e++){var i=r[0][e],n=r[1][e];t[i]?t[i].push(n):t[i]=[n]}return t},Query.prototype.getUrlTemplateQuery=function(){return this._urlTemplateQueryString},Query.prototype.merge=function(t){var r=this._query[0],e=this._query[1];for(var i in t)for(var n=!1,s=0;s<r.length;s++)if(i===r[s]){if(n){r.splice(s,1),e.splice(s,1);continue}Array.isArray(t[i])?e[s]=t[i].shift():void 0===t[i]||null===t[i]?(r.splice(s,1),e.splice(s,1),delete t[i]):(e[s]=t[i],delete t[i]),n=!0}return this._query=this._convert(t,this._query[0],this._query[1]),this},Query.prototype._parse=function(t){var r=this;void 0===t&&(t="");for(var e=[[],[]],i=t.split(/&|;/),n=0;n<i.length;n++){var s=i[n].match(r.qRegEx);if(s&&void 0!==s[s.length-1]){s.shift();for(var h=0;h<s.length;h++){var o=s[h];e[h].push(decodeURIComponent(o.replace("+"," ","g")))}}}return e},Query.prototype.set=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];var e=[].concat(t);if(1===e.length)"object"==typeof e[0]?this._query=this._convert(e[0]):this._query=this._parse(e[0]);else if(0===e.length)this.clear();else{var i={};i[e[0]]=e[1],this.merge(i)}return this},Query.prototype.setUrlTemplateQuery=function(t){this._urlTemplateQueryString=t},Query.prototype.toString=function(t){if(t)return this.ctx.toString();for(var r=[],e=this._query[0],i=this._query[1],n=0;n<e.length;n++)r.push(encodeURIComponent(e[n])+"="+encodeURIComponent(i[n]));return r.join("&")};var StringBuilder=function(t){this.string=t&&void 0!==t?String(t):String("")};StringBuilder.prototype.toString=function(){return this.string},StringBuilder.prototype.append=function(t){return this.string+=t,this},StringBuilder.prototype.insert=function(t,r){this.string.length;var e=this.string.slice(0,t),i=this.string.slice(t);return this.string=e+r+i,this};var Uri=function(t){return this.uriRegEx=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,this.authRegEx=/^([^\@]+)\@/,this.portRegEx=/:(\d+)$/,this.qRegEx=/^([^=]+)(?:=(.*))?$/,this.urlTempQueryRegEx=/\{\?(.*?)\}/,this.parse(t)};Uri.prototype.authority=function(t){if(void 0===t&&(t=""),""!==t){var r=t.match(this.authRegEx);this._authority=t,r&&(t=t.replace(this.authRegEx,""),this.userInfo(r[1]));var e=t.match(this.portRegEx);return e&&(t=t.replace(this.portRegEx,""),this.port(e[1])),this.host(t.replace("{","")),this}var i=this.userInfo();i&&(t=i+"@"),t+=this.host();var n=this.port();return n&&(t+=":"+n),t},Uri.prototype.fragment=function(t){return void 0===t&&(t=""),this.gs(t,"_fragment")},Uri.prototype.gs=function(t,r,e){return void 0!==t?(this[r]=t,this):e?e(this[r]):this[r]?this[r]:""},Uri.prototype.host=function(t){return this.gs(t,"_host")},Uri.prototype.parse=function(t){var r=t?t.match(this.uriRegEx):[],e=t?t.match(this.urlTempQueryRegEx):[];return this.path=new Path(r[5],this),this.scheme(r[2]),this.authority(r[4]),this.fragment(r[9]),this.query=new Query(r[7],this),e&&this.query.setUrlTemplateQuery(e[1]),this},Uri.prototype.port=function(t){return this.gs(t,"_port")},Uri.prototype.protocol=function(t){return this.scheme.toLowerCase()},Uri.prototype.scheme=function(t){return this.gs(t,"_scheme")},Uri.prototype.userInfo=function(t){return this.gs(t,"_userinfo",function(t){return t?encodeURI(t):t})},Uri.prototype.toString=function(){var t=this.query.toString(),r=this.path.toString(),e=(this.fragment(),this.scheme());return(new StringBuilder).append(e?e+"://":"").append(this.authority()).append("/").append(r).append(""!==t?"?":"").append(t).toString().replace("/?","?").replace(/\/$/,"")};export default Uri;
