var h=Object.defineProperty;var m=(a,s,t)=>s in a?h(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;var i=(a,s,t)=>(m(a,typeof s!="symbol"?s+"":s,t),t);import{a as u,d as n,b as c}from"./firebase.e814b12e.js";class f{constructor(s,t,e,o,r){i(this,"firstName");i(this,"lastName");i(this,"id");i(this,"scanTimes");i(this,"shopHours");i(this,"firebaseDoc");this.firstName=s,this.lastName=t,this.id=e,this.scanTimes=o,this.shopHours=r,this.firebaseDoc=u(n,"students/"+this.id)}serialize(){return{firstName:this.firstName,lastName:this.lastName,id:this.id,scanTimes:this.scanTimes,shopHours:this.shopHours}}shown(s){return(this.firstName.toLowerCase()+" "+this.lastName.toLowerCase()).includes(s)||this.id.toString().includes(s)}valueOf(){return this.shopHours}async update(){await c(this.firebaseDoc,{scanTimes:this.scanTimes,shopHours:this.shopHours})}}export{f as S};