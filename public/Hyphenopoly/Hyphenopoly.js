/**
 * @license Hyphenopoly 3.0.2 - client side hyphenation for webbrowsers
 * ©2019  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 */
!function(e){"use strict";const n=String.fromCharCode(173);function t(){return Object.create(null)}function r(e,n){return{configurable:(4&n)>0,enumerable:(2&n)>0,writable:(1&n)>0,value:e}}Math.imul=Math.imul||function(e,n){const t=65535&e,r=65535&n;return t*r+((e>>>16&65535)*r+t*(n>>>16&65535)<<16>>>0)|0},function(e){const o=Object.create(null,{defaultLanguage:r("en-us",2),dontHyphenate:r(function(){const e=t();return"abbr,acronym,audio,br,button,code,img,input,kbd,label,math,option,pre,samp,script,style,sub,sup,svg,textarea,var,video".split(",").forEach(function(n){e[n]=!0}),e}(),2),dontHyphenateClass:r("donthyphenate",2),exceptions:r(t(),2),normalize:r(!1,2),safeCopy:r(!0,2),timeout:r(1e3,2)}),a=Object.create(o),i=Object.create(null,{compound:r("hyphen",2),hyphen:r(n,2),leftmin:r(0,2),leftminPerLang:r(0,2),minWordLength:r(6,2),orphanControl:r(1,2),rightmin:r(0,2),rightminPerLang:r(0,2)});Object.keys(e.setup).forEach(function(n){if("selectors"===n){const n=Object.keys(e.setup.selectors);Object.defineProperty(a,"selectors",r(n,2)),n.forEach(function(n){const o=t();Object.keys(e.setup.selectors[n]).forEach(function(t){o[t]=r(e.setup.selectors[n][t],2)}),Object.defineProperty(a,n,r(Object.create(i,o),2))})}else if("dontHyphenate"===n){const i=t();Object.keys(e.setup.dontHyphenate).forEach(function(n){i[n]=r(e.setup.dontHyphenate[n],2)}),Object.defineProperty(a,n,r(Object.create(o.dontHyphenate,i),3))}else Object.defineProperty(a,n,r(e.setup[n],3))}),e.c=a}(Hyphenopoly),function(o){const a=o.c;let i=null,c=null;function s(e,n){try{return e.getAttribute("lang")?e.getAttribute("lang").toLowerCase():"html"===e.tagName.toLowerCase()?n?i:null:s(e.parentNode,n)}catch(e){return null}}function l(){c=function(){const e=new Map,n=[0];return{add:function(t,r,o){const a={element:t,selector:o};return e.has(r)||e.set(r,[]),e.get(r).push(a),n[0]+=1,a},counter:n,each:function(n){e.forEach(function(e,t){n(t,e)})},list:e,rem:function(t){let r=0;e.has(t)&&(r=e.get(t).length,e.delete(t),n[0]-=r,0===n[0]&&o.events.dispatch("hyphenopolyEnd"))}}}();const t=function(){let e="."+o.c.dontHyphenateClass,n=null;for(n in a.dontHyphenate)a.dontHyphenate[n]&&(e+=", "+n);return e}(),r=a.selectors.join(", ")+", "+t;function i(e,t,l,u){u=u||!1;const h=function(e,n){return e.lang&&"string"==typeof e.lang?e.lang.toLowerCase():n&&""!==n?n.toLowerCase():s(e,!0)}(e,t);"H9Y"===o.clientFeat.langs[h]?(c.add(e,h,l),!u&&a.safeCopy&&function(e){e.addEventListener("copy",function(e){e.preventDefault();const t=window.getSelection().toString();e.clipboardData.setData("text/plain",t.replace(new RegExp(n,"g"),""))},!0)}(e)):o.clientFeat.langs[h]||o.events.dispatch("error",{lvl:"warn",msg:"Element with '"+h+"' found, but '"+h+".hpb' not loaded. Check language tags!"});const f=e.childNodes;Array.prototype.forEach.call(f,function(e){1!==e.nodeType||function(e,n){return e.matches||(e.matches=e.msMatchesSelector||e.webkitMatchesSelector),e.matches(n)}(e,r)||i(e,h,l,!0)})}a.selectors.forEach(function(n){const t=e.document.querySelectorAll(n);Array.prototype.forEach.call(t,function(e){i(e,s(e,!0),n,!1)})}),o.elementsReady=!0}const u=new Map;function h(e,n,t){const r=a[t],i=r.hyphen;function c(a){let c=e.cache.get(t).get(a);return c||(e.exceptions.has(a)?c=e.exceptions.get(a).replace(/-/g,r.hyphen):-1===a.indexOf("-")?a.length>61?(o.events.dispatch("error",{lvl:"warn",msg:"found word longer than 61 characters"}),c=a):c=e.hyphenateFunction(a,i,r.leftminPerLang[n],r.rightminPerLang[n]):c=function(o){const a=String.fromCharCode(8203);let i=null,c=null;return"auto"===r.compound||"all"===r.compound?(c=h(e,n,t),i=o.split("-").map(function(e){return e.length>=r.minWordLength?c(e):e}),o="auto"===r.compound?i.join("-"):i.join("-"+a)):o=o.replace("-","-"+a),o}(a),e.cache.get(t).set(a,c)),c}return e.cache.set(t,new Map),u.set(n+"-"+t,c),c}const f=new Map;function p(e,n,t){const r=o.languages.get(e),i=a[n],s=i.minWordLength,l=a.normalize&&Boolean(String.prototype.normalize),p=e+"-"+n,g=u.has(p)?u.get(p):h(r,e,n),m=f.has(n)?f.get(n):function(e){function n(n,t,r,o){const i=a[e];let c=i.hyphen;return-1!==".\\+*?[^]$(){}=!<>|:-".indexOf(i.hyphen)&&(c="\\"+i.hyphen),3===i.orphanControl&&" "===t&&(t=String.fromCharCode(160)),t+r.replace(new RegExp(c,"g"),"")+o}return f.set(e,n),n}(n),d=r.genRegExps.get(n);function y(e){let n=null;return n=l?e.normalize("NFC").replace(d,g):e.replace(d,g),1!==i.orphanControl&&(n=n.replace(/(\u0020*)(\S+)(\s*)$/,m)),n}let w=null;return"string"==typeof t?w=y(t):t instanceof HTMLElement&&function(n){o.events.dispatch("beforeElementHyphenation",{el:n,lang:e});const t=n.childNodes;Array.prototype.forEach.call(t,function(e){3===e.nodeType&&e.data.length>=s&&(e.data=y(e.data))}),c.counter[0]-=1,o.events.dispatch("afterElementHyphenation",{el:n,lang:e})}(t),w}function g(e,n){n?n.forEach(function(n){p(e,n.selector,n.element)}):o.events.dispatch("error",{lvl:"warn",msg:"engine for language '"+e+"' loaded, but no elements found."}),0===c.counter[0]&&o.events.dispatch("hyphenopolyEnd")}function m(e,n,i,c,s){i=i.replace(/-/g,"");const l=function(e){return o.languages||(o.languages=new Map),o.languages.has(e)||o.languages.set(e,t()),o.languages.get(e)}(e);l.engineReady||(l.cache=new Map,o.c.exceptions.global&&(o.c.exceptions[e]?o.c.exceptions[e]+=", "+o.c.exceptions.global:o.c.exceptions[e]=o.c.exceptions.global),o.c.exceptions[e]?(l.exceptions=function(e){const n=new Map;return e.split(", ").forEach(function(e){const t=e.replace(/-/g,"");n.set(t,e)}),n}(o.c.exceptions[e]),delete o.c.exceptions[e]):l.exceptions=new Map,l.genRegExps=new Map,l.leftmin=c,l.rightmin=s,l.hyphenateFunction=n,a.selectors.forEach(function(n){const o=a[n];0===o.leftminPerLang&&Object.defineProperty(o,"leftminPerLang",r(t(),2)),0===o.rightminPerLang&&Object.defineProperty(o,"rightminPerLang",r(t(),2)),o.leftminPerLang[e]?o.leftminPerLang[e]=Math.max(l.leftmin,o.leftmin,o.leftminPerLang[e]):o.leftminPerLang[e]=Math.max(l.leftmin,o.leftmin),o.rightminPerLang[e]?o.rightminPerLang[e]=Math.max(l.rightmin,o.rightmin,o.rightminPerLang[e]):o.rightminPerLang[e]=Math.max(l.rightmin,o.rightmin),l.genRegExps.set(n,new RegExp("[\\w"+i+String.fromCharCode(8204)+"-]{"+o.minWordLength+",}","gi"))}),l.engineReady=!0),Hyphenopoly.events.dispatch("engineReady",{msg:e})}function d(e){if(o.clientFeat.wasm)return 65536*Math.ceil(e/65536);const n=Math.ceil(Math.log2(e));return n<=12?4096:n<24?1<<n:Math.ceil(e/(1<<24))*(1<<24)}o.createHyphenator=function(e){return function(n,t){return p(e,t=t||".hyphenate",n)}},o.unhyphenate=function(){c.each(function(e,n){n.forEach(function(e){const n=e.element.firstChild,t=a[e.selector].hyphen;n.data=n.data.replace(new RegExp(t,"g"),"")})})};const y=function(){if(window.TextDecoder){const e=new TextDecoder("utf-16le");return function(n){return e.decode(n)}}return function(e){return String.fromCharCode.apply(null,e)}}();function w(e){const n=new Uint32Array(e).subarray(0,8);if(40005736!==n[0])throw o.events.dispatch("error",{lvl:"error",msg:"Pattern file format error: "+new Uint8Array(Uint32Array.of(n[0]).buffer)}),new Error("Pattern file format error!");const t=n[7],r=1280+t+(4-(1280+t)%4),a=r+4*n[6];return{ho:a+512,hp:a+192,hs:Math.max(d(a+512+n[2]+n[3]),2097152),hw:a+256,lm:n[4],pl:n[3],po:a+512+n[2],pt:r,rm:n[5],to:a+512+n[1],tw:a+128,vs:1280,wo:a}}function b(e,n){const t=o.clientFeat.wasm?e.wasmMemory.buffer:e.heapBuffer,r=new Uint16Array(t).subarray(e.wo>>1,64+(e.wo>>1)),a=e.lm,i=e.rm,c=new Uint16Array(t).subarray(e.hw>>1,128+(e.hw>>1));return r[0]=95,function(e,t,o,s){let l=0,u=e.charCodeAt(l);for(o=o||a,s=s||i;u;)r[l+=1]=u,u=e.charCodeAt(l);return r[l+1]=95,r[l+2]=0,1===n(o,s)&&(e=y(c.subarray(1,c[0]+1)),"­"!==t&&(e=e.replace(/\u00AD/g,t))),e}}function v(e){Promise.all([o.binaries.get(e),o.binaries.get("hyphenEngine")]).then(function(n){const t=n[0],r=w(t),a=n[1],i=o.specMems.get(e),c=i.buffer.byteLength>=r.hs?i:new WebAssembly.Memory({initial:r.hs/65536,maximum:256});new Uint32Array(c.buffer).set(new Uint32Array(t),r.ho>>2),r.wasmMemory=c,WebAssembly.instantiate(a,{env:{memory:r.wasmMemory,memoryBase:0},x:r}).then(function(n){const t=n.exports.convert();m(e,b(r,n.exports.hyphenate),y(new Uint16Array(c.buffer).subarray(385,384+t)),r.lm,r.rm)})})}function E(e){const n=o.binaries.get(e),t=w(n),r=o.specMems.get(e),a=r.byteLength>=t.hs?r:new ArrayBuffer(t.hs),i=new Uint8Array(a),c=new Uint8Array(n);i.set(c,t.ho),t.heapBuffer=a;const s=asmHyphenEngine({Int32Array:window.Int32Array,Math:Math,Uint16Array:window.Uint16Array,Uint8Array:window.Uint8Array},t,t.heapBuffer),l=s.convert();m(e,b(t,s.hyphenate),y(new Uint16Array(a).subarray(385,384+l)),t.lm,t.rm)}let x=null;const L=[];function M(e,n){"*"===e?("wasm"===n?x=v:"asm"===n&&(x=E),L.forEach(function(e){x(e)})):x?x(e):L.push(e)}o.events.define("contentLoaded",function(){!function(){const n=e.document.getElementsByTagName("html")[0];(i=s(n,!1))||""===a.defaultLanguage||(i=a.defaultLanguage)}(),l(),o.events.dispatch("elementsReady")},!1),o.events.define("elementsReady",function(){c.each(function(e,n){o.languages&&o.languages.has(e)&&o.languages.get(e).engineReady&&g(e,n)})},!1),o.events.define("engineLoaded",function(e){M("*",e.msg)},!1),o.events.define("hpbLoaded",function(e){M(e.msg,"*")},!1),o.events.define("loadError",function(e){"wasm"!==e.msg&&c.rem(e.name)},!1),o.events.define("engineReady",function(e){o.elementsReady&&g(e.msg,c.list.get(e.msg))},!1),o.events.define("hyphenopolyStart",null,!0),o.events.define("hyphenopolyEnd",function(){e.clearTimeout(a.timeOutHandler),"none"!==o.c.hide&&o.toggle("on")},!1),o.events.define("beforeElementHyphenation",null,!0),o.events.define("afterElementHyphenation",null,!0),o.events.tempRegister.forEach(function(e){o.events.addListener(e.name,e.handler,!1)}),delete o.events.tempRegister,o.events.dispatch("hyphenopolyStart",{msg:"Hyphenopoly started"}),e.clearTimeout(o.c.timeOutHandler),Object.defineProperty(a,"timeOutHandler",r(e.setTimeout(function(){o.events.dispatch("timeout",{delay:a.timeout})},a.timeout),2)),o.events.deferred.forEach(function(e){o.events.dispatch(e.name,e.data)}),delete o.events.deferred}(Hyphenopoly)}(window);