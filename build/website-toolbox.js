!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self)["website-toolbox"]=e()}(this,function(){"use strict";var t=function(o){return{get:function(t,e){if(!t[e])throw new Error("[website-toolbox]: property ".concat(e," does not exist on Component.data"));return t[e]},set:function(t,e){if(!t[e])throw new Error("[website-toolbox]: Cannot assign a value to an undeclared data property");e=Reflect.set.apply(Reflect,arguments);return"function"==typeof o.hooks.updated&&o.hooks.updated.apply(o,[t]),e}}},n=function(r){return{get:function(t,e){var n=t[e];return function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return n.apply(r,e)}}}};return function(e){var r,i,s,o=this;return Object.keys(e).forEach(function(t){return o[t]=e[t]}),e.root&&(this.root=document.querySelector(this.root)),this.nodes=(r=this.root,i=this.nodes,s={},Object.keys(i).forEach(function(t){var e=i[t],o=Array.isArray(e),n=o?"querySelectorAll":"querySelector";s[t]=o||"string"==typeof e?r[n](e):null}),s),this.data=new Proxy(this.data,t(this)),this.methods=new Proxy(this.methods,n(this)),"function"==typeof this.hooks.setup&&this.hooks.setup.apply(this),this._reset=function(){},function(){return o}}});