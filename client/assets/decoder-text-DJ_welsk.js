import{r as l,j as y}from"./jsx-runtime-CbkKSL4Y.js";import{V as j}from"./visually-hidden-BhZA3Ayq.js";import{u as M,c as V}from"./heading-BOd0dRLC.js";import{u as G}from"./use-spring-CcHJnz-D.js";async function R(e){return new Promise(t=>setTimeout(t,e))}const T="_text_81hf5_3",E="_glyph_81hf5_17",N="_value_81hf5_31",p={text:T,glyph:E,value:N},v=["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ー","ラ","リ","ル","レ","ロ","ワ","ヰ","ヱ","ヲ","ン","ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ"],r={Glyph:"glyph",Value:"value"};function S(e,t,s){return e.map((i,a)=>{if(a<s)return{type:r.Value,value:i};if(s%1<.5){const n=Math.floor(Math.random()*v.length);return{type:r.Glyph,value:v[n]}}return{type:r.Glyph,value:t[a].value}})}const I=l.memo(({text:e,start:t=!0,delay:s=0,className:i,...a})=>{const n=l.useRef([{type:r.Glyph,value:""}]),d=l.useRef(),f=M(),h=G(0,{stiffness:8,damping:5});return l.useEffect(()=>{const x=d.current,o=e.split("");let _;const g=()=>{const c=n.current.map(u=>`<span class="${p[u.type]}">${u.value}</span>`);x.innerHTML=c.join("")},m=h.on("change",c=>{n.current=S(o,n.current,c),g()});return t&&!_&&!f&&(async()=>{await R(s),h.set(o.length)})(),f&&(n.current=o.map((c,u)=>({type:r.Value,value:o[u]})),g()),()=>{m==null||m()}},[h,f,t,s,e]),y.jsxs("span",{className:V(p.text,i),...a,children:[y.jsx(j,{className:p.label,children:e}),y.jsx("span",{"aria-hidden":!0,className:p.content,ref:d})]})});export{I as D};
