const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};const e=new class{start(){this.timerId=setInterval((()=>{const e=this.getRandomHexColor();t.body.style.backgroundColor=e}),1e3)}stop(){clearInterval(this.timerId)}getRandomHexColor(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}constructor(){this.timerId=null}};t.btnStart.addEventListener("click",(()=>{e.start(),t.btnStart.setAttribute("disabled",!0)})),t.btnStop.addEventListener("click",(()=>{e.stop(),t.btnStart.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.cb3c2d6e.js.map