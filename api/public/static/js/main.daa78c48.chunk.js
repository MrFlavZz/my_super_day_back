(this.webpackJsonpmy_super_day=this.webpackJsonpmy_super_day||[]).push([[6],{23:function(e,t,r){e.exports=r(33)},33:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(14),u=r.n(c),s=r(15),i=r(2),o=r.n(i),l=r(5);function p(){var e=JSON.parse(window.localStorage.getItem("users"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}function f(){return b.apply(this,arguments)}function b(){return(b=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"GET",headers:p()},e.next=3,fetch("".concat(window.url,"/mysuperday/api/users/verifyToken"),t).then((function(e){return console.log("j'aime les pommes"),403!==e.status&&401!==e.status&&500!==e.status}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d={login:function(e){var t=this;return Object(l.a)(o.a.mark((function r(){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:window.localStorage.setItem("users",JSON.stringify(e)),t.currentUser=e,t.callback&&t.callback(e);case 3:case"end":return r.stop()}}),r)})))()},getCurrentUser:function(){return this.currentUser},isConnected:function(){return Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f().then((function(e){return e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},deconnected:function(){var e=this;return Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(window.localStorage),delete e.currentUser,window.localStorage.clear(),t.next=5,e.callback;case 5:if(!t.sent){t.next=7;break}e.callback(void 0);case 7:console.log(window.localStorage);case 8:case"end":return t.stop()}}),t)})))()},subscribe:function(e){var t=this;return this.callback=e,function(){t.callback=void 0}}};try{d.currentUser=JSON.parse(window.localStorage.getItem("users"))}catch(k){}var h=r(1),m=Object(h.b)(Object(h.h)({"/mysuperday/dashboard/biorythme":Object(h.f)(function(){var e=Object(l.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.authService.isConnected();case 2:if(!e.sent){e.next=6;break}e.t0=Object(h.j)({getView:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var c,u,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(0),r.e(1),r.e(2),r.e(5)]).then(r.bind(null,377));case 2:return c=e.sent,u=c.Dashboard,e.next=6,Promise.all([r.e(0),r.e(4),r.e(9),r.e(13)]).then(r.bind(null,379));case 6:return s=e.sent,i=s.Biorythm,e.abrupt("return",a.a.createElement(u,{authService:n.authService},a.a.createElement(i,null)));case 9:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()}),e.next=7;break;case 6:e.t0=Object(h.i)("/mysuperday/users/signin");case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),"/mysuperday/dashboard/calculatrice":Object(h.f)(function(){var e=Object(l.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.authService.isConnected();case 2:if(!e.sent){e.next=6;break}e.t0=Object(h.j)({getView:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var c,u,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(0),r.e(1),r.e(2),r.e(5)]).then(r.bind(null,377));case 2:return c=e.sent,u=c.Dashboard,e.next=6,Promise.all([r.e(0),r.e(1),r.e(3),r.e(4),r.e(8)]).then(r.bind(null,370));case 6:return s=e.sent,i=s.Calculator,e.abrupt("return",a.a.createElement(u,{authService:n.authService},a.a.createElement(i,null)));case 9:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()}),e.next=7;break;case 6:e.t0=Object(h.i)("/mysuperday/users/signin");case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),"/mysuperday/dashboard":Object(h.f)(function(){var e=Object(l.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.authService.isConnected();case 2:if(!e.sent){e.next=6;break}e.t0=Object(h.j)({getView:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(0),r.e(1),r.e(2),r.e(5)]).then(r.bind(null,377));case 2:return c=e.sent,u=c.Dashboard,e.abrupt("return",a.a.createElement(u,{authService:n.authService}));case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()}),e.next=7;break;case 6:e.t0=Object(h.i)("/mysuperday/users/signin");case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),"/mysuperday/users/signup":Object(h.j)({getView:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(0),r.e(1),r.e(3),r.e(4),r.e(11)]).then(r.bind(null,371));case 2:return c=e.sent,u=c.SignUp,e.abrupt("return",a.a.createElement(u,{authService:n.authService}));case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()}),"/mysuperday/users/signin":Object(h.f)(function(){var e=Object(l.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.authService.isConnected();case 2:if(!e.sent){e.next=6;break}e.t0=Object(h.i)("/mysuperday/dashboard"),e.next=7;break;case 6:e.t0=Object(h.j)({getView:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(0),r.e(1),r.e(3),r.e(12)]).then(r.bind(null,380));case 2:return c=e.sent,u=c.SignIn,e.abrupt("return",a.a.createElement(u,{authService:n.authService}));case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()});case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),"/":Object(h.i)("/mysuperday/users/signin"),"/mysuperday":Object(h.i)("/mysuperday/users/signin")})),v=r(9),y=r(20);function w(){return a.a.createElement("div",null,"Erreur 404")}function j(e){var t=e.children,r=Object(v.f)();return a.a.createElement("div",{className:"Layout"},a.a.createElement(y.a,{isBusy:!!r,delayMs:200}),a.a.createElement("main",null,a.a.createElement(v.b,{render:w},t)))}function x(){var e=Object(n.useState)((function(){return d.getCurrentUser()})),t=Object(s.a)(e,2),r=t[0],c=t[1];return Object(n.useEffect)((function(){return d.subscribe(c)}),[]),a.a.createElement(v.c,{routes:m,context:{authService:d,currentUser:r}},a.a.createElement(j,null,a.a.createElement(n.Suspense,{fallback:null},a.a.createElement(v.d,null))))}window.url="http://localhost:9000";var O=r(21);u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(O.a,null,a.a.createElement(x,null))),document.getElementById("root"))}},[[23,7,10]]]);
//# sourceMappingURL=main.daa78c48.chunk.js.map