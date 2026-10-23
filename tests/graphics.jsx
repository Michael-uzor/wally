// Development-only harness; Vite's production entry does not include this file.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {_roots} from '@react-three/fiber';
import Core from '../src/Core.jsx';
import s from '../src/style.module.css';

const mode = new URLSearchParams(location.search).get('mode') || 'normal';
const realMedia = window.matchMedia.bind(window);
const listeners = new Set();
let reduced = mode === 'reduced';
window.matchMedia = query => query === '(prefers-reduced-motion: reduce)' ? {
  get matches(){return reduced}, media:query,
  addEventListener(type, fn){listeners.add(fn)},
  removeEventListener(type, fn){listeners.delete(fn)},
} : realMedia(query);
if (mode === 'unsupported') {
  const realContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, ...args) {
    return /^webgl/.test(type) ? null : realContext.call(this, type, ...args);
  };
}
function toggleMotion(){reduced=!reduced;listeners.forEach(fn=>fn({matches:reduced}));}
function hideTab(){Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));}
function showTab(){Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));}
function loseContext(){const canvas=document.querySelector('canvas');const state=_roots.get(canvas)?.store.getState();state?.gl.getContext().getExtension('WEBGL_lose_context')?.loseContext();}
function Harness(){const [mounted,setMounted]=React.useState(true);return <><header style={{padding:20}}><h1>Graphics checks: {mode}</h1><button onClick={toggleMotion}>Toggle reduced motion</button><button onClick={hideTab}>Simulate hidden tab</button><button onClick={showTab}>Simulate visible tab</button><button onClick={loseContext}>Lose WebGL context</button><button onClick={()=>setMounted(v=>!v)}>Toggle scene mount</button><a href="#offscreen">Move scene offscreen</a><a href="#">Back to scene</a><output id="stats" style={{display:'block',whiteSpace:'pre-wrap',marginTop:20}}>Waiting for renderer…</output></header><div style={{height:600,position:'relative'}}>{mounted&&<><div className={s.fallback}/><Core/></>}</div><div style={{height:1200}}/><div id="offscreen">Scene is offscreen</div></>}
createRoot(document.getElementById('root')).render(<Harness/>);
setInterval(()=>{
  const canvas=document.querySelector('canvas');
  const state=_roots.get(canvas)?.store.getState();
  const group=state?.scene.children.find(child=>child.isGroup);
  document.querySelector('#stats').textContent=JSON.stringify({
    mode,reduced,canvas:!!canvas,rootCount:_roots.size,
    frame:state?.gl.info.render.frame,loop:state?.frameloop,
    rotation:group?.rotation.toArray().slice(0,3),
    geometries:state?.gl.info.memory.geometries,
    canvasWidth:canvas?.width,canvasHeight:canvas?.height,
    fallback:!!document.querySelector('[class*="fallback"]'),
  });
},200);
