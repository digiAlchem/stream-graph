(this["webpackJsonpstream-graph-overlay"]=this["webpackJsonpstream-graph-overlay"]||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var a=n(1),c=n.n(a),r=n(6),i=n.n(r),o=(n(12),n(7)),u=n(2),s=(n(13),n(0));function l(){var t=function(){var t=Object(a.useState)(0),e=Object(u.a)(t,2),n=(e[0],e[1]);return function(){return n((function(t){return t+1}))}}(),e=Object(a.useState)([]),n=Object(u.a)(e,2),c=n[0],r=n[1],i=Object(a.useState)(""),l=Object(u.a)(i,2),j=l[0],d=l[1],h=Object(a.useState)(""),b=Object(u.a)(h,2),m=b[0],p=b[1],g=Object(a.useState)(""),v=Object(u.a)(g,2),O=v[0],f=v[1],x=function(t){var e=t.target.value,n=c;n[parseInt(t.target.getAttribute("data-index"))].name=e,r(n)},C=function(t){var e=t.target.value,n=c;n[parseInt(t.target.getAttribute("data-index"))].count=parseInt(e),console.log(n),r(n)};return Object(s.jsxs)("div",{className:"chart",style:{color:O},children:[Object(s.jsxs)("div",{className:"main-chart",children:[Object(s.jsx)("div",{className:"graph-title",children:j}),function(){var t=0;return c.forEach((function(e){e&&(t+=e.count||0)})),c.map((function(e,n){if(e.name&&e.count){var a=(e.count||0)/t*100+"%";return Object(s.jsxs)("div",{className:"graph-item",children:[Object(s.jsxs)("div",{className:"graph-info",children:[e.name?e.name:""," ",Object(s.jsx)("span",{className:"graph-count",children:e.count?"(".concat(e.count,")"):""})]}),Object(s.jsx)("div",{className:"graph-bar",style:{maxWidth:a,backgroundColor:m},children:"\u2003"})]},"graph-bar-".concat(n))}return""}))}()]}),Object(s.jsxs)("div",{className:"chart-options",children:[Object(s.jsxs)("div",{className:"title-form",children:[Object(s.jsx)("input",{value:j,placeholder:"Graph Title",onChange:function(t){return function(t){var e=t.target.value;d(e)}(t)}}),Object(s.jsx)("input",{value:m,placeholder:"Bar Colour",onChange:function(t){return function(t){var e=t.target.value;p(e)}(t)}}),Object(s.jsx)("input",{value:O,placeholder:"Text Colour",onChange:function(t){return function(t){var e=t.target.value;f(e)}(t)}})]}),c.map((function(t,e){return Object(s.jsxs)("div",{className:"form-item",children:[Object(s.jsx)("input",{"data-index":e,onChange:x,placeholder:"Item name"},"graph-item-".concat(e,"-name")),Object(s.jsx)("input",{"data-index":e,type:"number",min:"0",onChange:C,placeholder:"Item value"},"graph-item-".concat(e,"-count"))]})})),Object(s.jsx)("button",{onClick:function(){r([].concat(Object(o.a)(c),[{}]))},children:"Add New Item"}),Object(s.jsx)("button",{onClick:function(){return t()},children:"Update Values"})]})]})}var j=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,i=e.getTTFB;n(t),a(t),c(t),r(t),i(t)}))};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(l,{})}),document.getElementById("root")),j()}},[[15,1,2]]]);
//# sourceMappingURL=main.d2374094.chunk.js.map