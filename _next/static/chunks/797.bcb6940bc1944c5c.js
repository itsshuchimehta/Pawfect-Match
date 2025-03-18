"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{4746:(e,t,a)=>{a.d(t,{U:()=>i});var s=a(2115);function i(e){let[t,a]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let t=window.matchMedia(e);a(t.matches);let s=()=>a(t.matches);return t.addEventListener("change",s),()=>t.removeEventListener("change",s)},[e]),null!=t&&t}},6797:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var s=a(5155),i=a(2115),n=a(4022),l=a(760),r=a(9946);let o=(0,r.A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var c=a(1976),d=a(4416);let h=(0,r.A)("Bone",[["path",{d:"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",key:"w610uw"}]]),m=(0,r.A)("Cake",[["path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8",key:"1w3rig"}],["path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1",key:"n2jgmb"}],["path",{d:"M2 21h20",key:"1nyx9w"}],["path",{d:"M7 8v3",key:"1qtyvj"}],["path",{d:"M12 8v3",key:"hwp4zt"}],["path",{d:"M17 8v3",key:"1i6e5u"}],["path",{d:"M7 4h.01",key:"1bh4kh"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M17 4h.01",key:"1upcoc"}]]),u=(0,r.A)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var x=a(2355),p=a(3052),f=a(7168),v=a(4746),b=a(1541);function g(e){var t,a;let{dogs:r,currentIndex:g,onClose:w,onPrev:y,onNext:j,isFavorite:N,onToggleFavorite:k,onPageChange:C,isFirstPage:M,isLastPage:P,isLoading:S}=e,z=document.title,A=(null===(t=document.querySelector('meta[name="description"]'))||void 0===t?void 0:t.getAttribute("content"))||"",[E,I]=(0,i.useState)(0),[L,T]=(0,i.useState)(!1),[_,q]=(0,i.useState)(!1),[$,R]=(0,i.useState)(!0),[F,H]=(0,i.useState)(!1),[U,B]=(0,i.useState)(null),D=(0,i.useRef)(r),O=(0,v.U)("(max-width: 640px)");(0,i.useEffect)(()=>{document.body.style.overflow="hidden";let e=setTimeout(()=>R(!1),3e3);return()=>{document.body.style.overflow="unset",clearTimeout(e),document.title=z;let t=document.querySelector('meta[name="description"]');t&&A&&t.setAttribute("content",A)}},[z,A]),(0,i.useEffect)(()=>{if(!S&&!_){let e=r[g];if(e&&(!U||e.id!==U.id)){B(e),T(!1);let t=new Image;t.src=e.img||"/placeholder.svg",t.onload=()=>T(!0)}}},[g,r,S,_,U]),(0,i.useEffect)(()=>{r!==D.current&&(D.current=r,q(!1))},[r]);let V=(0,i.useCallback)(async(e,t)=>{if(S||_)return;let a=0===g,s=g===r.length-1;t.offset.x>100?a?M||(q(!0),I(-1),await C("prev")):(I(-1),y()):t.offset.x<-100&&(s?P||(q(!0),I(1),await C("next")):(I(1),j()))},[g,r.length,M,P,j,C,y,S,_]),W=!(M&&0===g)&&!O,Y=!(P&&g===r.length-1)&&!O,Z=async e=>{e.stopPropagation(),S||_||(g>0?(I(-1),y()):M||(q(!0),I(-1),await C("prev")))},G=async e=>{e.stopPropagation(),S||_||(g<r.length-1?(I(1),j()):P||(q(!0),I(1),await C("next")))},J=U?"".concat(U.name," - Pawfect Match"):"Pawfect Match",K=U?"Meet ".concat(U.name,", a ").concat(U.age,"-year-old ").concat(U.breed.toLowerCase()," looking for a forever home."):"Find your perfect furry friend and give them a forever home.";return(0,s.jsxs)(n.P.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",onClick:w,children:[U&&(0,s.jsx)(b.A,{title:J,description:K,image:U.img}),(0,s.jsxs)("div",{className:"relative w-full max-w-3xl h-[80vh] max-h-[800px]",onClick:e=>e.stopPropagation(),children:[(0,s.jsx)(l.N,{initial:!1,custom:E,children:(0,s.jsxs)(n.P.div,{custom:E,variants:{enter:e=>({x:e>0?1e3:-1e3,opacity:0}),center:{x:0,opacity:1},exit:e=>({x:e<0?1e3:-1e3,opacity:0})},initial:"enter",animate:"center",exit:"exit",transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}},className:"absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden",drag:"x",dragConstraints:{left:0,right:0},dragElastic:.7,onDragEnd:V,children:[$&&(0,s.jsx)(()=>(0,s.jsx)(n.P.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},className:"absolute top-0 left-0 right-0 z-30 pointer-events-none",children:(0,s.jsx)("div",{className:"bg-gradient-to-b from-black/60 to-transparent pt-4 pb-8 px-4",children:(0,s.jsxs)("div",{className:"flex items-center justify-center space-x-2 text-white",children:[(0,s.jsx)(n.P.div,{animate:{x:[0,20,0],opacity:[0,1,0]},transition:{duration:1.5,repeat:Number.POSITIVE_INFINITY,repeatType:"loop"},className:"w-4 h-4 bg-white rounded-full"}),(0,s.jsx)("span",{className:"text-sm font-medium",children:"Swipe to view more dogs"})]})})}),{}),(0,s.jsxs)("div",{className:"absolute inset-0 bg-gray-100",children:[(0,s.jsxs)("div",{className:"w-full h-full",style:{aspectRatio:"4/3"},children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-cover bg-center blur-xl scale-110",style:{backgroundImage:"url(".concat((null==U?void 0:U.img)||"/placeholder.svg",")"),opacity:.5}}),!S&&!_&&L&&(0,s.jsx)("img",{src:(null==U?void 0:U.img)||"/placeholder.svg",alt:null==U?void 0:U.name,className:"absolute inset-0 w-full h-full object-contain"})]}),(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"})]}),(S||_||!L)&&(0,s.jsx)("div",{className:"absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",children:(0,s.jsx)(o,{className:"h-8 w-8 animate-spin text-white"})}),(0,s.jsxs)("div",{className:"absolute top-4 right-4 flex items-center gap-2 z-10",children:[(0,s.jsx)(n.P.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:e=>{e.stopPropagation(),k((null==U?void 0:U.id)||"")},className:"p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white",disabled:S||_,children:(0,s.jsx)(c.A,{className:"w-7 h-7 transition-colors ".concat(N((null==U?void 0:U.id)||"")?"text-red-500 fill-red-500":"text-gray-600")})}),(0,s.jsx)(f.$,{variant:"ghost",size:"icon",onClick:w,className:"w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600",disabled:S||_,children:(0,s.jsx)(d.A,{className:"h-5 w-5"})})]}),U&&(0,s.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 p-6 text-white",children:[(0,s.jsx)("h2",{className:"text-3xl font-bold mb-2",children:U.name}),(0,s.jsxs)("div",{className:"flex flex-wrap items-center gap-x-4 gap-y-2 mb-4",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,s.jsx)(h,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"text-sm",children:U.breed})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,s.jsx)(m,{className:"h-4 w-4"}),(0,s.jsxs)("span",{className:"text-sm",children:[U.age," ",1===U.age?"year":"years"]})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,s.jsx)(u,{className:"h-4 w-4 flex-shrink-0"}),(0,s.jsxs)("span",{className:"text-sm truncate",children:[U.city&&U.state?"".concat(U.city,", ").concat(U.state):""," ",U.zip_code]})]})]}),(0,s.jsx)("div",{className:"text-sm leading-relaxed",children:F?(0,s.jsxs)("p",{children:["Meet ",U.name,", a lovable ",U.breed.toLowerCase()," looking for a forever home. With a unique personality and a heart full of love, ",U.name," is ready to bring joy, companionship, and endless tail wags to their new family. Could you be the perfect match for this adorable pup?"]}):(0,s.jsxs)("p",{children:[(a="Meet ".concat(U.name,", a lovable ").concat(U.breed.toLowerCase()," looking for a forever home.")).length<=100?a:a.slice(0,100).trim()+"..."," ",(0,s.jsx)(f.$,{variant:"link",className:"p-0 h-auto text-sm font-medium text-white hover:text-white/90",onClick:()=>H(!0),children:"Read more"})]})}),F&&(0,s.jsx)(f.$,{variant:"ghost",className:"mt-2 text-white hover:text-white/90 p-0 h-auto text-sm font-medium hover:bg-transparent",onClick:()=>H(!1),children:"Show less"})]})]},null==U?void 0:U.id)}),(0,s.jsx)("div",{className:"absolute inset-y-0 left-0 flex items-center justify-start pointer-events-none",children:W&&(0,s.jsx)(f.$,{variant:"ghost",size:"icon",className:"ml-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto",onClick:Z,disabled:_||S,children:(0,s.jsx)(x.A,{className:"h-8 w-8"})})}),(0,s.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none",children:Y&&(0,s.jsx)(f.$,{variant:"ghost",size:"icon",className:"mr-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto",onClick:G,disabled:_||S,children:(0,s.jsx)(p.A,{className:"h-8 w-8"})})})]})]})}}}]);