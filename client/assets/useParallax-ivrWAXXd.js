import{r as m}from"./jsx-runtime-CbkKSL4Y.js";import{u as f}from"./heading-BOd0dRLC.js";function w(n,o){const a=f();m.useEffect(()=>{let e=!1,r=null;const s=()=>{const{innerHeight:i}=window,c=Math.max(0,window.scrollY)*n,l=Math.max(-i,Math.min(i,c));o(l),e=!1},t=()=>{e||(e=!0,r=requestAnimationFrame(s))};return a||(window.addEventListener("scroll",t),t()),()=>{window.removeEventListener("scroll",t),cancelAnimationFrame(r)}},[n,o,a])}export{w as u};
