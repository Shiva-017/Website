import{r as l,j as $}from"./jsx-runtime-CbkKSL4Y.js";import{i as G,E as C,A as K,D as Q,S as Z,d as H,l as q,p as X,b as ee,r as te,m as re,e as ne,f as oe,g as ie,R as ae,h as le,j as se}from"./components-CqEMrTkd.js";/**
 * @remix-run/react v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */class de extends l.Component{constructor(t){super(t),this.state={error:t.error||null,location:t.location}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location?{error:t.error||null,location:t.location}:{error:t.error||r.error,location:r.location}}render(){return this.state.error?l.createElement(z,{error:this.state.error}):this.props.children}}function z({error:e}){if(console.error(e),G(e))return l.createElement(O,{title:"Unhandled Thrown Response!"},l.createElement("h1",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},e.status," ",e.statusText));let t;if(e instanceof Error)t=e;else{let r=e==null?"Unknown Error":typeof e=="object"&&"toString"in e?e.toString():JSON.stringify(e);t=new Error(r)}return l.createElement(O,{title:"Application Error!"},l.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},l.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),l.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},t.stack)))}function O({title:e,children:t}){return l.createElement("html",{lang:"en"},l.createElement("head",null,l.createElement("meta",{charSet:"utf-8"}),l.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),l.createElement("title",null,e)),l.createElement("body",null,t,l.createElement("script",{dangerouslySetInnerHTML:{__html:`
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `}})))}/**
 * @remix-run/react v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ue(e){if(!e)return null;let t=Object.entries(e),r={};for(let[o,n]of t)if(n&&n.__type==="RouteErrorResponse")r[o]=new C(n.status,n.statusText,n.data,n.internal===!0);else if(n&&n.__type==="Error"){if(n.__subType){let s=window[n.__subType];if(typeof s=="function")try{let d=new s(n.message);d.stack=n.stack,r[o]=d}catch{}}if(r[o]==null){let s=new Error(n.message);s.stack=n.stack,r[o]=s}}else r[o]=n;return r}/**
 * @remix-run/react v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ce(e){return e.headers.get("X-Remix-Catch")!=null}function fe(e){return e.headers.get("X-Remix-Error")!=null}function me(e){return U(e)&&e.status>=400&&e.headers.get("X-Remix-Error")==null&&e.headers.get("X-Remix-Catch")==null&&e.headers.get("X-Remix-Response")==null}function we(e){return e.headers.get("X-Remix-Redirect")!=null}function he(e){var t;return!!((t=e.headers.get("Content-Type"))!==null&&t!==void 0&&t.match(/text\/remix-deferred/))}function U(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function _e(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}async function N(e,t,r=0){let o=new URL(e.url);o.searchParams.set("_data",t);let n={signal:e.signal};if(e.method!=="GET"){n.method=e.method;let a=e.headers.get("Content-Type");a&&/\bapplication\/json\b/.test(a)?(n.headers={"Content-Type":a},n.body=JSON.stringify(await e.json())):a&&/\btext\/plain\b/.test(a)?(n.headers={"Content-Type":a},n.body=await e.text()):a&&/\bapplication\/x-www-form-urlencoded\b/.test(a)?n.body=new URLSearchParams(await e.text()):n.body=await e.formData()}r>0&&await new Promise(a=>setTimeout(a,5**r*10));let s=window.__remixRevalidation,d=await fetch(o.href,n).catch(a=>{if(typeof s=="number"&&s===window.__remixRevalidation&&(a==null?void 0:a.name)==="TypeError"&&r<3)return N(e,t,r+1);throw a});if(fe(d)){let a=await d.json(),i=new Error(a.message);return i.stack=a.stack,i}if(me(d)){let a=await d.text(),i=new Error(a);return i.stack=void 0,i}return d}const ye="__deferred_promise:";async function Re(e){if(!e)throw new Error("parseDeferredReadableStream requires stream argument");let t,r={};try{let o=pe(e),s=(await o.next()).value;if(!s)throw new Error("no critical data");let d=JSON.parse(s);if(typeof d=="object"&&d!==null)for(let[a,i]of Object.entries(d))typeof i!="string"||!i.startsWith(ye)||(t=t||{},t[a]=new Promise((u,_)=>{r[a]={resolve:c=>{u(c),delete r[a]},reject:c=>{_(c),delete r[a]}}}));return(async()=>{try{for await(let a of o){let[i,...u]=a.split(":"),_=u.join(":"),c=JSON.parse(_);if(i==="data")for(let[h,f]of Object.entries(c))r[h]&&r[h].resolve(f);else if(i==="error")for(let[h,f]of Object.entries(c)){let x=new Error(f.message);x.stack=f.stack,r[h]&&r[h].reject(x)}}for(let[a,i]of Object.entries(r))i.reject(new K(`Deferred ${a} will never be resolved`))}catch(a){for(let i of Object.values(r))i.reject(a)}})(),new Q({...d,...t})}catch(o){for(let n of Object.values(r))n.reject(o);throw o}}async function*pe(e){let t=e.getReader(),r=[],o=[],n=!1,s=new TextEncoder,d=new TextDecoder,a=async()=>{if(o.length>0)return o.shift();for(;!n&&o.length===0;){let u=await t.read();if(u.done){n=!0;break}r.push(u.value);try{let c=d.decode(T(...r)).split(`

`);if(c.length>=2&&(o.push(...c.slice(0,-1)),r=[s.encode(c.slice(-1).join(`

`))]),o.length>0)break}catch{continue}}return o.length>0||r.length>0&&(o=d.decode(T(...r)).split(`

`).filter(_=>_),r=[]),o.shift()},i=await a();for(;i;)yield i,i=await a()}function T(...e){let t=new Uint8Array(e.reduce((o,n)=>o+n.length,0)),r=0;for(let o of e)t.set(o,r),r+=o.length;return t}/**
 * @remix-run/react v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ve(){return l.createElement("html",{lang:"en"},l.createElement("head",null,l.createElement("meta",{charSet:"utf-8"}),l.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"})),l.createElement("body",null,l.createElement(Z,null),l.createElement("script",{dangerouslySetInnerHTML:{__html:`
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            `}})," "))}/**
 * @remix-run/react v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function J(e){let t={};return Object.values(e).forEach(r=>{let o=r.parentId||"";t[o]||(t[o]=[]),t[o].push(r)}),t}function xe(e,t,r){let o=W(t),n=t.HydrateFallback&&(!r||e.id==="root")?t.HydrateFallback:e.id==="root"?ve:void 0,s=t.ErrorBoundary?t.ErrorBoundary:e.id==="root"?()=>l.createElement(z,{error:ee()}):void 0;return e.id==="root"&&t.Layout?{...o?{element:l.createElement(t.Layout,null,l.createElement(o))}:{Component:o},...s?{errorElement:l.createElement(t.Layout,null,l.createElement(s))}:{ErrorBoundary:s},...n?{hydrateFallbackElement:l.createElement(t.Layout,null,l.createElement(n))}:{HydrateFallback:n}}:{Component:o,ErrorBoundary:s,HydrateFallback:n}}function Ee(e,t,r,o,n,s){return S(t,r,o,n,s,"",J(t),e)}function b(e,t,r){if(r){let d=`You cannot call ${e==="action"?"serverAction()":"serverLoader()"} in SPA Mode (routeId: "${t.id}")`;throw console.error(d),new C(400,"Bad Request",new Error(d),!0)}let n=`You are trying to call ${e==="action"?"serverAction()":"serverLoader()"} on a route that does not have a server ${e} (routeId: "${t.id}")`;if(e==="loader"&&!t.hasLoader||e==="action"&&!t.hasAction)throw console.error(n),new C(400,"Bad Request",new Error(n),!0)}function j(e,t){let r=e==="clientAction"?"a":"an",o=`Route "${t}" does not have ${r} ${e}, but you are trying to submit to it. To fix this, please add ${r} \`${e}\` function to the route`;throw console.error(o),new C(405,"Method Not Allowed",new Error(o),!0)}function S(e,t,r,o,n,s="",d=J(e),a){return(d[s]||[]).map(i=>{let u=t[i.id];async function _(m){return i.hasLoader?F(m,i):null}async function c(m){if(!i.hasAction)throw j("action",i.id);return F(m,i)}async function h(m){let w=t[i.id],p=w?X(i,w):Promise.resolve();try{return m()}finally{await p}}let f={id:i.id,index:i.index,path:i.path};if(u){var x,k,L;Object.assign(f,{...f,...xe(i,u,n),handle:u.handle,shouldRevalidate:a?B(i.id,u.shouldRevalidate,a):u.shouldRevalidate});let m=r==null||(x=r.loaderData)===null||x===void 0?void 0:x[i.id],w=r==null||(k=r.errors)===null||k===void 0?void 0:k[i.id],p=a==null&&(((L=u.clientLoader)===null||L===void 0?void 0:L.hydrate)===!0||!i.hasLoader);f.loader=async({request:y,params:v})=>{try{return await h(async()=>(H(u,"No `routeModule` available for critical-route loader"),u.clientLoader?u.clientLoader({request:y,params:v,async serverLoader(){if(b("loader",i,n),p){if(w!==void 0)throw w;return m}let P=await _(y);return await g(P)}}):n?null:_(y)))}finally{p=!1}},f.loader.hydrate=Y(i,u,n),f.action=({request:y,params:v})=>h(async()=>{if(H(u,"No `routeModule` available for critical-route action"),!u.clientAction){if(n)throw j("clientAction",i.id);return c(y)}return u.clientAction({request:y,params:v,async serverAction(){b("action",i,n);let E=await c(y);return await g(E)}})})}else i.hasClientLoader||(f.loader=({request:m})=>h(()=>n?Promise.resolve(null):_(m))),i.hasClientAction||(f.action=({request:m})=>h(()=>{if(n)throw j("clientAction",i.id);return c(m)})),f.lazy=async()=>{let m=await be(i,t),w={...m};if(m.clientLoader){let p=m.clientLoader;w.loader=y=>p({...y,async serverLoader(){b("loader",i,n);let v=await _(y.request);return await g(v)}})}if(m.clientAction){let p=m.clientAction;w.action=y=>p({...y,async serverAction(){b("action",i,n);let v=await c(y.request);return await g(v)}})}return a&&(w.shouldRevalidate=B(i.id,m.shouldRevalidate,a)),{...w.loader?{loader:w.loader}:{},...w.action?{action:w.action}:{},hasErrorBoundary:w.hasErrorBoundary,shouldRevalidate:w.shouldRevalidate,handle:w.handle,Component:w.Component,ErrorBoundary:w.ErrorBoundary}};let D=S(e,t,r,o,n,i.id,d,a);return D.length>0&&(f.children=D),f})}function B(e,t,r){let o=!1;return n=>o?t?t(n):n.defaultShouldRevalidate:(o=!0,r.has(e))}async function be(e,t){let r=await q(e,t);return await X(e,r),{Component:W(r),ErrorBoundary:r.ErrorBoundary,clientAction:r.clientAction,clientLoader:r.clientLoader,handle:r.handle,links:r.links,meta:r.meta,shouldRevalidate:r.shouldRevalidate}}async function F(e,t){let r=await N(e,t.id);if(r instanceof Error)throw r;if(we(r))throw ge(r);if(ce(r))throw r;return he(r)&&r.body?await Re(r.body):r}function g(e){if(_e(e))return e.data;if(U(e)){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.json():e.text()}return e}function ge(e){let t=parseInt(e.headers.get("X-Remix-Status"),10)||302,r=e.headers.get("X-Remix-Redirect"),o={},n=e.headers.get("X-Remix-Revalidate");n&&(o["X-Remix-Revalidate"]=n);let s=e.headers.get("X-Remix-Reload-Document");return s&&(o["X-Remix-Reload-Document"]=s),te(r,{status:t,headers:o})}function W(e){if(e.default==null)return;if(!(typeof e.default=="object"&&Object.keys(e.default).length===0))return e.default}function Y(e,t,r){return r&&e.id!=="root"||t.clientLoader!=null&&(t.clientLoader.hydrate===!0||e.hasLoader!==!0)}let R,M=!1;let A,Ae=new Promise(e=>{A=e}).catch(()=>{});function Ce(e){if(!R){let s=window.__remixContext.url,d=window.location.pathname;if(s!==d&&!window.__remixContext.isSpaMode){let u=`Initial URL (${s}) does not match URL at time of hydration (${d}), reloading page...`;return console.error(u),window.location.reload(),l.createElement(l.Fragment,null)}let a=S(window.__remixManifest.routes,window.__remixRouteModules,window.__remixContext.state,window.__remixContext.future,window.__remixContext.isSpaMode),i;if(!window.__remixContext.isSpaMode){i={...window.__remixContext.state,loaderData:{...window.__remixContext.state.loaderData}};let u=re(a,window.location);if(u)for(let _ of u){let c=_.route.id,h=window.__remixRouteModules[c],f=window.__remixManifest.routes[c];h&&Y(f,h,window.__remixContext.isSpaMode)&&(h.HydrateFallback||!f.hasLoader)?i.loaderData[c]=void 0:f&&!f.hasLoader&&(i.loaderData[c]=null)}i&&i.errors&&(i.errors=ue(i.errors))}R=ne({routes:a,history:oe(),basename:window.__remixContext.basename,future:{v7_normalizeFormMethod:!0,v7_fetcherPersist:window.__remixContext.future.v3_fetcherPersist,v7_partialHydration:!0,v7_prependBasename:!0,v7_relativeSplatPath:window.__remixContext.future.v3_relativeSplatPath},hydrationData:i,mapRouteProperties:ie}),R.state.initialized&&(M=!0,R.initialize()),R.createRoutesForHMR=Ee,window.__remixRouter=R,A&&A(R)}let[t,r]=l.useState(void 0),[o,n]=l.useState(R.state.location);return l.useLayoutEffect(()=>{M||(M=!0,R.initialize())},[]),l.useLayoutEffect(()=>R.subscribe(s=>{s.location!==o&&n(s.location)}),[o]),l.createElement(ae.Provider,{value:{manifest:window.__remixManifest,routeModules:window.__remixRouteModules,future:window.__remixContext.future,criticalCss:t,isSpaMode:window.__remixContext.isSpaMode}},l.createElement(de,{location:o},l.createElement(le,{router:R,fallbackElement:null,future:{v7_startTransition:!0}})))}var V,I=se;I.createRoot,V=I.hydrateRoot;l.startTransition(()=>{V(document,$.jsx(l.StrictMode,{children:$.jsx(Ce,{})}))});
