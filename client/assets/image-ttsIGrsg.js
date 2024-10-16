import{r,j as f}from"./jsx-runtime-CbkKSL4Y.js";import{c as R,g as N,t as L,h as C,a as P,n as E,u as q,B as Q,I as J}from"./heading-DYNvZadC.js";const X="/assets/gotham-bold-italic-C_msAlmW.woff2",Y="/assets/gotham-bold-D1kvQ7KV.woff2",Z="/assets/gotham-book-italic-Bm2IEtSK.woff2",ee="/assets/gotham-book-Bnaws0Ef.woff2",te="/assets/gotham-medium-italic-Dok430ou.woff2",oe="/assets/gotham-medium-0VT3RO8I.woff2",ae="/assets/ipa-gothic-DimHCOud.woff2",z=r.createContext({}),Ie=({theme:e="dark",children:t,className:n,as:a="div",toggleTheme:i,...s})=>{const o=W(),c=!o.theme;return f.jsxs(z.Provider,{value:{theme:e,toggleTheme:i||o.toggleTheme},children:[c&&t,!c&&f.jsx(a,{className:R(n),"data-theme":e,...s,children:t})]})};function W(){return r.useContext(z)}function p(e){return e.replace(/\s\s+/g," ")}function j(e){return p(Object.keys(e).map(t=>`--${t}: ${e[t]};`).join(`

`))}function se(){return p(Object.keys(N).map(e=>`
        @media (max-width: ${N[e]}px) {
          :root {
            ${j(L[e])}
          }
        }
      `).join(`
`))}const ne=p(`
  @layer theme, base, components, layout;
`),re=p(`
  :root {
    ${j(L.base)}
  }

  ${se()}

  [data-theme='dark'] {
    ${j(C.dark)}
  }

  [data-theme='light'] {
    ${j(C.light)}
  }
`),ce=p(`
  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${ee}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${Z}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${oe}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${te}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${Y}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${X}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: IPA Gothic;
    font-weight: 400;
    src: url(${ae}) format('woff2');
    font-display: swap;
    font-style: normal;
  }
`),$e=p(`
  ${ne}

  @layer theme {
    ${re}
    ${ce}
  }
`);function ie(){const[e,t]=r.useState(!1);return r.useEffect(()=>{t(!0)},[]),e}function le(e,t,n={},a=!0){const[i,s]=r.useState(!1),[o,c]=r.useState(!1);return r.useEffect(()=>{if(!(e!=null&&e.current))return;const l=new IntersectionObserver(([u])=>{const{isIntersecting:m,target:h}=u;s(m),m&&t&&(l.unobserve(h),c(!0))},n);return!o&&a&&l.observe(e.current),()=>l.disconnect()},[e,t,n,o,a]),i}async function fe({src:e,srcSet:t,sizes:n}){return new Promise((a,i)=>{try{if(!e&&!t)throw new Error("No image src or srcSet provided");let s=new Image;e&&(s.src=e),t&&(s.srcset=t),n&&(s.sizes=n);const o=()=>{s.removeEventListener("load",o);const c=s.currentSrc;s=null,a(c)};s.addEventListener("load",o)}catch(s){i(`Error loading ${t}: ${s}`)}})}async function ue(e=1,t=1){return new Promise(n=>{const a=document.createElement("canvas"),i=a.getContext("2d");a.width=e,a.height=t,i.fillStyle="rgba(0, 0, 0, 0)",i.fillRect(0,0,e,t),a.toBlob(async s=>{if(!s)throw new Error("Video thumbnail failed to load");const o=URL.createObjectURL(s);a.remove(),n(o)})})}async function me({srcSet:e,sizes:t}){const n=await Promise.all(e.split(", ").map(async o=>{const[c,l]=o.split(" "),u=Number(l.replace("w","")),m=await ue(u);return{src:c,image:m,width:l}})),a=n.map(({image:o,width:c})=>`${o} ${c}`).join(", "),i=await fe({srcSet:a,sizes:t});return n.find(o=>o.image===i).src}const de="_image_1yz75_3",he="_container_1yz75_83",ye="_elementWrapper_1yz75_97",pe="_placeholder_1yz75_141",ge="_element_1yz75_97",we="_button_1yz75_207",y={image:de,container:he,elementWrapper:ye,placeholder:pe,element:ge,button:we},ke=({className:e,style:t,reveal:n,delay:a=0,raised:i,src:s,srcSet:o,placeholder:c,...l})=>{const[u,m]=r.useState(!1),{theme:h}=W(),g=r.useRef(),w=s||o.split(" ")[0],S=le(g,!D(w)),v=r.useCallback(()=>{m(!0)},[]);return f.jsx("div",{className:R(y.image,e),"data-visible":S||u,"data-reveal":n,"data-raised":i,"data-theme":h,style:P({delay:E(a)},t),ref:g,children:f.jsx(ve,{delay:a,onLoad:v,loaded:u,inViewport:S,reveal:n,src:w,srcSet:o,placeholder:c,...l})})},ve=({onLoad:e,loaded:t,inViewport:n,srcSet:a,placeholder:i,delay:s,src:o,alt:c,play:l=!0,restartOnPause:u,reveal:m,sizes:h,width:g,height:w,noPauseButton:S,cover:v,...G})=>{const I=q(),[F,U]=r.useState(!0),[T,$]=r.useState(!I),[_,V]=r.useState(),[B,A]=r.useState(!1),O=r.useRef(),d=r.useRef(),b=D(o),M=n,H=ie();r.useEffect(()=>{b&&a?(async()=>{const x=await me({srcSet:a,sizes:h});V(x)})():b&&V(o)},[b,h,o,a]),r.useEffect(()=>{if(!d.current||!_)return;const k=()=>{$(!0),d.current.play()},x=()=>{$(!1),d.current.pause()};l||(x(),u&&(d.current.currentTime=0)),!B&&(n?n&&!I&&l&&k():x())},[n,l,I,u,B,_]);const K=k=>{k.preventDefault(),A(!0),d.current.paused?($(!0),d.current.play()):($(!1),d.current.pause())};return f.jsxs("div",{className:y.elementWrapper,"data-reveal":m,"data-visible":n||t,style:P({delay:E(s+1e3)}),children:[b&&H&&f.jsxs(r.Fragment,{children:[f.jsx("video",{muted:!0,loop:!0,playsInline:!0,className:y.element,"data-loaded":t,"data-cover":v,autoPlay:!I,onLoadStart:e,src:_,"aria-label":c,ref:d,...G}),!S&&f.jsxs(Q,{className:y.button,onClick:K,children:[f.jsx(J,{icon:T?"pause":"play"}),T?"Pause":"Play"]})]}),!b&&f.jsx("img",{className:y.element,"data-loaded":t,"data-cover":v,onLoad:e,decoding:"async",src:M?o:void 0,srcSet:M?a:void 0,width:g,height:w,alt:c,sizes:h,...G}),F&&f.jsx("img",{"aria-hidden":!0,className:y.placeholder,"data-loaded":t,"data-cover":v,style:P({delay:E(s)}),ref:O,src:i,width:g,height:w,onTransitionEnd:()=>U(!1),decoding:"async",loading:"lazy",alt:"",role:"presentation"})]})};function D(e){return typeof e=="string"&&e.includes(".mp4")}export{oe as G,ke as I,Ie as T,W as a,ee as b,me as r,$e as t,le as u};
