import{S as Y}from"../chunks/Student.85f26ea6.js";import{g as ee,c as te,d as se}from"../chunks/firebase.e814b12e.js";import{s as K,f as v,l as S,a as y,g as w,h as I,m as L,c as M,d as x,j as _,i as B,y as d,n as Z,x as O,A as j,B as P,C as q,D as le,z as ne,e as A}from"../chunks/scheduler.e3f9b2bc.js";import{S as Q,i as R,a as V,c as W,t as E,g as X,b as ae,d as oe,m as re,e as ie}from"../chunks/index.6579c2a1.js";import{e as $}from"../chunks/each.e59479a4.js";import{w as ce}from"../chunks/index.fd035dfc.js";async function ue({params:r}){const e=[];return(await ee(te(se,"students"))).forEach(t=>{if(t.exists()){let s=t.data();e.push(new Y(s.firstName,s.lastName,s.id,s.scanTimes,s.shopHours))}}),{students:e}}const Ce=Object.freeze(Object.defineProperty({__proto__:null,load:ue},Symbol.toStringTag,{value:"Module"}));function fe(r){let e,n="Check Out",t,s;return{c(){e=v("button"),e.textContent=n,this.h()},l(l){e=w(l,"BUTTON",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-h4zrf1"&&(e.textContent=n),this.h()},h(){_(e,"class","bg-red-600 p-1 w-full mt-2 flex-row rounded-lg")},m(l,o){B(l,e,o),t||(s=P(e,"click",r[3]),t=!0)},p:O,d(l){l&&x(e),t=!1,s()}}}function de(r){let e,n="Check In",t,s;return{c(){e=v("button"),e.textContent=n,this.h()},l(l){e=w(l,"BUTTON",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-1gcboqg"&&(e.textContent=n),this.h()},h(){_(e,"class","bg-green-500 p-1 w-full mt-2 flex-row rounded-lg")},m(l,o){B(l,e,o),t||(s=P(e,"click",r[2]),t=!0)},p:O,d(l){l&&x(e),t=!1,s()}}}function he(r){let e,n,t=r[0].firstName+"",s,l,o=r[0].lastName+"",h,b,k,m,T=r[0].id+"",g,D;function N(a,p){if(!a[1])return de;if(a[1])return fe}let C=N(r),u=C&&C(r);return{c(){e=v("div"),n=v("h1"),s=S(t),l=y(),h=S(o),b=y(),k=v("h2"),m=S("ID: "),g=S(T),D=y(),u&&u.c(),this.h()},l(a){e=w(a,"DIV",{class:!0});var p=I(e);n=w(p,"H1",{class:!0});var i=I(n);s=L(i,t),l=M(i),h=L(i,o),i.forEach(x),b=M(p),k=w(p,"H2",{class:!0});var f=I(k);m=L(f,"ID: "),g=L(f,T),f.forEach(x),D=M(p),u&&u.l(p),p.forEach(x),this.h()},h(){_(n,"class","text-2xl"),_(k,"class","text-xl"),_(e,"class","bg-white min-w-min p-sm-md rounded-lg w-full")},m(a,p){B(a,e,p),d(e,n),d(n,s),d(n,l),d(n,h),d(e,b),d(e,k),d(k,m),d(k,g),d(e,D),u&&u.m(e,null)},p(a,[p]){p&1&&t!==(t=a[0].firstName+"")&&Z(s,t),p&1&&o!==(o=a[0].lastName+"")&&Z(h,o),p&1&&T!==(T=a[0].id+"")&&Z(g,T),C===(C=N(a))&&u?u.p(a,p):(u&&u.d(1),u=C&&C(a),u&&(u.c(),u.m(e,null)))},i:O,o:O,d(a){a&&x(e),u&&u.d()}}}function me(r,e,n){let{student:t}=e,s=t.scanTimes.length%2!=0;function l(){t.scanTimes.push(Date.now()),n(1,s=t.scanTimes.length%2!=0),t.update()}function o(){t.scanTimes.push(Date.now()),n(0,t.shopHours+=(t.scanTimes[t.scanTimes.length-1]-t.scanTimes[t.scanTimes.length-2])/36e5,t),n(1,s=t.scanTimes.length%2!=0),t.update()}return r.$$set=h=>{"student"in h&&n(0,t=h.student)},[t,s,l,o]}class pe extends Q{constructor(e){super(),R(this,e,me,he,K,{student:0})}}function F(r,e,n){const t=r.slice();return t[5]=e[n],t}function G(r){let e,n;return e=new pe({props:{student:r[5]}}),{c(){ae(e.$$.fragment)},l(t){oe(e.$$.fragment,t)},m(t,s){re(e,t,s),n=!0},p(t,s){const l={};s&2&&(l.student=t[5]),e.$set(l)},i(t){n||(V(e.$$.fragment,t),n=!0)},o(t){E(e.$$.fragment,t),n=!1},d(t){ie(e,t)}}}function J(r){let e=r[5].shown(r[0].toLowerCase()),n,t,s=e&&G(r);return{c(){s&&s.c(),n=A()},l(l){s&&s.l(l),n=A()},m(l,o){s&&s.m(l,o),B(l,n,o),t=!0},p(l,o){o&3&&(e=l[5].shown(l[0].toLowerCase())),e?s?(s.p(l,o),o&3&&V(s,1)):(s=G(l),s.c(),V(s,1),s.m(n.parentNode,n)):s&&(X(),E(s,1,1,()=>{s=null}),W())},i(l){t||(V(s),t=!0)},o(l){E(s),t=!1},d(l){l&&x(n),s&&s.d(l)}}}function _e(r){let e,n,t='<h1 class="text-white font-bold flex text-center mx-auto pt-12 text-8xl pl-2xl-3xl">Check In</h1> <a href="/adminView" class="text-white font-bold flex text-left mt-12 text-8xl hover:bg-[#00000033] rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"></path></svg></a>',s,l,o,h,b='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',k,m,T,g,D,N,C,u=$(r[1]),a=[];for(let i=0;i<u.length;i+=1)a[i]=J(F(r,u,i));const p=i=>E(a[i],1,1,()=>{a[i]=null});return{c(){e=v("div"),n=v("div"),n.innerHTML=t,s=y(),l=v("div"),o=v("div"),h=v("div"),h.innerHTML=b,k=y(),m=v("input"),T=y(),g=v("div");for(let i=0;i<a.length;i+=1)a[i].c();this.h()},l(i){e=w(i,"DIV",{class:!0});var f=I(e);n=w(f,"DIV",{class:!0,"data-svelte-h":!0}),j(n)!=="svelte-12g7eg2"&&(n.innerHTML=t),s=M(f),l=w(f,"DIV",{class:!0});var c=I(l);o=w(c,"DIV",{class:!0});var H=I(o);h=w(H,"DIV",{class:!0,"data-svelte-h":!0}),j(h)!=="svelte-1lzoipy"&&(h.innerHTML=b),k=M(H),m=w(H,"INPUT",{class:!0,placeholder:!0,id:!0,autocomplete:!0,"data-search":!0}),H.forEach(x),T=M(c),g=w(c,"DIV",{class:!0});var U=I(g);for(let z=0;z<a.length;z+=1)a[z].l(U);U.forEach(x),c.forEach(x),f.forEach(x),this.h()},h(){_(n,"class","flex"),_(h,"class","grid place-items-center mx-3xs h-full min-w-min text-gray-300"),_(m,"class","peer h-full w-full outline-none text-sm text-gray-700 pr-2"),_(m,"placeholder","Enter Name or ID Number"),_(m,"id","searchBar"),_(m,"autocomplete","off"),_(m,"data-search",""),_(o,"class","relative flex items-center mx-auto md:w-2/3 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"),_(g,"class","grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-sm my-sm"),_(l,"class","sm:w-2/3 w-full mx-auto my-3xs-2xs p-md-lg bg-slate-900 h-3/4 rounded-lg overflow-scroll"),_(e,"class","bg-blue-300 h-screen")},m(i,f){B(i,e,f),d(e,n),d(e,s),d(e,l),d(l,o),d(o,h),d(o,k),d(o,m),q(m,r[0]),d(l,T),d(l,g);for(let c=0;c<a.length;c+=1)a[c]&&a[c].m(g,null);D=!0,N||(C=P(m,"input",r[4]),N=!0)},p(i,[f]){if(f&1&&m.value!==i[0]&&q(m,i[0]),f&3){u=$(i[1]);let c;for(c=0;c<u.length;c+=1){const H=F(i,u,c);a[c]?(a[c].p(H,f),V(a[c],1)):(a[c]=J(H),a[c].c(),V(a[c],1),a[c].m(g,null))}for(X(),c=u.length;c<a.length;c+=1)p(c);W()}},i(i){if(!D){for(let f=0;f<u.length;f+=1)V(a[f]);D=!0}},o(i){a=a.filter(Boolean);for(let f=0;f<a.length;f+=1)E(a[f]);D=!1},d(i){i&&x(e),le(a,i),N=!1,C()}}}function ge(r,e,n){let t,{data:s}=e;const l=ce(s.students);ne(r,l,b=>n(1,t=b));let o="";function h(){o=this.value,n(0,o)}return r.$$set=b=>{"data"in b&&n(3,s=b.data)},[o,t,l,s,h]}class De extends Q{constructor(e){super(),R(this,e,ge,_e,K,{data:3})}}export{De as component,Ce as universal};