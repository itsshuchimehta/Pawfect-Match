"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[217],{1541:(e,t,o)=>{o.d(t,{A:()=>n});var r=o(2115);let a={title:"Pawfect Match",description:"Find your perfect furry friend and give them a forever home.",ogTitle:"Pawfect Match",ogDescription:"Find your perfect furry friend and give them a forever home.",ogImage:""};function n(e){let{title:t,description:o,image:n}=e;return(0,r.useEffect)(()=>{var e,r,i,s;document.title,null===(e=document.querySelector('meta[name="description"]'))||void 0===e||e.getAttribute("content"),null===(r=document.querySelector('meta[property="og:image"]'))||void 0===r||r.getAttribute("content"),null===(i=document.querySelector('meta[property="og:title"]'))||void 0===i||i.getAttribute("content"),null===(s=document.querySelector('meta[property="og:description"]'))||void 0===s||s.getAttribute("content"),t&&(document.title=t);let l=[];if(o){let e=document.querySelector('meta[name="description"]');if(e instanceof HTMLMetaElement)e.setAttribute("content",o),l.push(e);else{let e=document.createElement("meta");e.name="description",e.content=o,document.head.appendChild(e),l.push(e)}}if(n){let e=document.querySelector('meta[property="og:image"]');if(e instanceof HTMLMetaElement)e.setAttribute("content",n),l.push(e);else{let e=document.createElement("meta");e.setAttribute("property","og:image"),e.content=n,document.head.appendChild(e),l.push(e)}}if(t){let e=document.querySelector('meta[property="og:title"]');if(e instanceof HTMLMetaElement)e.setAttribute("content",t),l.push(e);else{let e=document.createElement("meta");e.setAttribute("property","og:title"),e.content=t,document.head.appendChild(e),l.push(e)}}if(o){let e=document.querySelector('meta[property="og:description"]');if(e instanceof HTMLMetaElement)e.setAttribute("content",o),l.push(e);else{let e=document.createElement("meta");e.setAttribute("property","og:description"),e.content=o,document.head.appendChild(e),l.push(e)}}return()=>{document.title=a.title,l.forEach(e=>{try{e&&e.parentNode&&("description"===e.getAttribute("name")?e.setAttribute("content",a.description):"og:image"===e.getAttribute("property")&&a.ogImage?e.setAttribute("content",a.ogImage):"og:title"===e.getAttribute("property")?e.setAttribute("content",a.ogTitle):"og:description"===e.getAttribute("property")&&e.setAttribute("content",a.ogDescription))}catch(e){console.error("Error cleaning up meta tag:",e)}})}},[t,o,n]),null}},3999:(e,t,o)=>{o.d(t,{cn:()=>n});var r=o(2596),a=o(9688);function n(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return(0,a.QP)((0,r.$)(t))}},6958:(e,t,o)=>{o.d(t,{A:()=>s});var r=o(5155),a=o(4022),n=o(1962),i=o(2115);function s(){let[e,t]=(0,i.useState)([]);return(0,i.useEffect)(()=>{let e=[];for(let t=0;t<5;t++)for(let o=0;o<5;o++)e.push({x:20*o+12*Math.random(),y:20*t+12*Math.random(),size:20*Math.random()+20,delay:5*Math.random()});t(e)},[]),(0,r.jsx)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:e.map((e,t)=>(0,r.jsx)(a.P.div,{className:"absolute text-primary/5 dark:text-primary/[0.03]",style:{top:"".concat(e.y,"%"),left:"".concat(e.x,"%")},animate:{scale:[1,1.2,1],rotate:[0,10,-10,0]},transition:{duration:5,repeat:Number.POSITIVE_INFINITY,repeatType:"reverse",ease:"easeInOut",delay:e.delay},children:(0,r.jsx)(n.A,{size:e.size,strokeWidth:1.5,className:"drop-shadow-sm"})},t))})}},7168:(e,t,o)=>{o.d(t,{$:()=>c});var r=o(5155),a=o(2115),n=o(9708),i=o(2085),s=o(3999);let l=(0,i.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,t)=>{let{className:o,variant:a,size:i,asChild:c=!1,...d}=e,u=c?n.DX:"button";return(0,r.jsx)(u,{className:(0,s.cn)(l({variant:a,size:i,className:o})),ref:t,...d})});c.displayName="Button"},7480:(e,t,o)=>{o.d(t,{JX:()=>u,X8:()=>c,iD:()=>m,ri:()=>p,s5:()=>s,tp:()=>d,ux:()=>i,w1:()=>l,z:()=>g});let r="https://frontend-take-home-service.fetch.com",a=new Map;async function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=await fetch(e,{...t,credentials:"include"});if(401===o.status)throw localStorage.removeItem("isAuthenticated"),localStorage.removeItem("authExpiration"),localStorage.removeItem("userName"),Error("Unauthorized, redirecting to login");if(!o.ok){let e=await o.text();throw Error("Request failed: ".concat(o.status," ").concat(e))}return o}async function i(e){let t;if("string"==typeof e)t=e.startsWith(r)?e:"".concat(r).concat(e);else{let o=new URLSearchParams;e.from&&o.set("from",e.from),e.size&&o.set("size",e.size.toString()),void 0!==e.ageMin&&o.set("ageMin",e.ageMin.toString()),void 0!==e.ageMax&&o.set("ageMax",e.ageMax.toString()),e.breeds&&e.breeds.length>0&&e.breeds.forEach(e=>o.append("breeds",e)),e.zipCodes&&e.zipCodes.length>0&&e.zipCodes.forEach(e=>o.append("zipCodes",e)),e.sort&&o.set("sort",e.sort),t="".concat(r,"/dogs/search?").concat(o)}return(await n(t)).json()}async function s(e){return(await n("".concat(r,"/dogs"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function l(){if(a.has("breeds"))return a.get("breeds");try{let e=await n("".concat(r,"/dogs/breeds")),t=await e.json();return a.set("breeds",t),t}catch(e){return console.error("Failed to fetch breeds:",e),[]}}async function c(e){return(await n("".concat(r,"/locations/search"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function d(e){return e.length?(await n("".concat(r,"/locations"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json():[]}async function u(e){let t=await n("".concat(r,"/dogs/match"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),{match:o}=await t.json();return o}async function m(e,t){await n("".concat(r,"/auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t})}),localStorage.setItem("isAuthenticated","true"),localStorage.setItem("authExpiration",(Date.now()+36e5).toString()),localStorage.setItem("userName",e),localStorage.setItem("loginTimestamp",Date.now().toString())}async function p(){try{await n("".concat(r,"/auth/logout"),{method:"POST"})}catch(e){console.error("Error during logout:",e)}finally{localStorage.clear()}}function g(){try{let e=localStorage.getItem("isAuthenticated"),t=localStorage.getItem("authExpiration"),o=localStorage.getItem("userName");if(e&&t){if(Date.now()<Number(t))return{isAuthenticated:!0,userName:o};localStorage.removeItem("isAuthenticated"),localStorage.removeItem("authExpiration"),localStorage.removeItem("userName"),localStorage.removeItem("favorites"),localStorage.removeItem("searchFilters"),localStorage.removeItem("selectedLocation")}}catch(e){console.error("Error checking auth status:",e)}return{isAuthenticated:!1,userName:null}}},7875:(e,t,o)=>{o.d(t,{A:()=>d});var r=o(5155),a=o(4022),n=o(1962),i=o(2138),s=o(7168),l=o(6958),c=o(3999);function d(e){let{isAuthenticated:t,onGetStarted:o,onLearnMore:d,className:u}=e;return(0,r.jsxs)("section",{className:(0,c.cn)("relative pt-16 pb-24 px-4 sm:pt-20 sm:pb-32 md:pt-24 md:pb-40",u),children:[(0,r.jsx)(l.A,{}),(0,r.jsx)("div",{className:"container mx-auto max-w-6xl relative z-10",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsxs)(a.P.div,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:260,damping:20},className:"inline-block mb-6 md:mb-8",children:[(0,r.jsx)("svg",{width:"0",height:"0",className:"absolute",children:(0,r.jsx)("defs",{children:(0,r.jsxs)("linearGradient",{id:"heroGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,r.jsx)("stop",{offset:"0%",stopColor:"#9333EA"}),(0,r.jsx)("stop",{offset:"50%",stopColor:"#D946EF"}),(0,r.jsx)("stop",{offset:"100%",stopColor:"#EC4899"})]})})}),(0,r.jsx)(n.A,{className:"h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 stroke-[url(#heroGradient)] stroke-[1.5]"})]}),(0,r.jsxs)(a.P.h1,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 md:mb-8",children:["Find Your"," ",(0,r.jsx)("span",{className:"bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent",children:"Fur-ever"})," ","Friend"]}),(0,r.jsx)(a.P.p,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4 sm:px-0",children:t?"Browse our selection of adorable, adoptable dogs and start your journey to unconditional love today.":"Begin your journey to unconditional love. Discover your perfect companion among our adorable adoptable dogs."}),!t&&(0,r.jsxs)(a.P.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"flex flex-col sm:flex-row gap-4 justify-center",children:[(0,r.jsxs)(s.$,{size:"lg",className:"bg-[#9333EA] hover:bg-[#7E22CE] text-white font-semibold px-8 py-3 rounded-full w-full sm:w-auto md:text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105",onClick:o,children:["Get Started",(0,r.jsx)(i.A,{className:"ml-2 h-5 w-5"})]}),(0,r.jsx)(s.$,{size:"lg",variant:"outline",className:"border-[#9333EA] text-[#9333EA] dark:text-[#D8B4FE] dark:border-[#D8B4FE] hover:text-[#7E22CE] hover:border-[#7E22CE] dark:hover:text-[#F0ABFC] dark:hover:border-[#F0ABFC] font-semibold px-8 py-3 rounded-full w-full sm:w-auto md:text-lg transition-transform duration-300 hover:scale-105 hover:bg-transparent [&:hover]:bg-transparent",onClick:d,children:"Learn More"})]})]})})]})}},9852:(e,t,o)=>{o.d(t,{p:()=>i});var r=o(5155),a=o(2115),n=o(3999);let i=a.forwardRef((e,t)=>{let{className:o,type:a,...i}=e;return(0,r.jsx)("input",{type:a,className:(0,n.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",o),ref:t,...i})});i.displayName="Input"}}]);