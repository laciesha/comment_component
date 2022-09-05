var d=Object.defineProperty;var b=(s,e,t)=>e in s?d(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var m=(s,e,t)=>(b(s,typeof e!="symbol"?e+"":e,t),t);const f=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};f();class g extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`<section class = "comment">
    
        <h2>
          ${this.getAttribute("name")}
          <br />
          ${this.getAttribute("email")}
          <br />
          ${this.getAttribute("timestamp")}
        </h2>
        <p>${this.getAttribute("comment")}</p>

        
      </section> 
      
      <style> 
      .comment{
        background-color: hotpink;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        margin-left: 20vw;
        margin-right: 20vw;
      }
      </style>`}}customElements.define("custom-comment",g);class h{constructor(){m(this,"readCommentsFromDataStore",e=>{var t=e.transaction("comments","readonly"),r=t.objectStore("comments"),o=r.openCursor(),n=[];o.onsuccess=function(c){c.target.result&&(n.push(c.target.result.value),c.target.result.continue())},t.oncomplete=function(c){console.log(n),this.notify("comments-loaded",n)}.bind(this)});this.comments=[],this.subscribers=[],this.loadDatabase()}loadDatabase(){let e;var t=indexedDB.open("my_app_db",2);t.onupgradeneeded=function(r){var o=r.target.result;console.log("running onupgradeneeded"),o.objectStoreNames.contains("comments")||o.createObjectStore("comments",{keyPath:"id",autoincrement:!0})},t.onsuccess=function(r){console.log("running onsuccess"),e=r.target.result,this.readCommentsFromDataStore(e)}.bind(this)}addComment(e){this.comments.push(e),console.log(this.comments),this.notify("comment-added",this.comments)}subscribe(e,t){this.subscribers.push([e,t])}notify(e,t){for(let r=0;r<this.subscribers.length;r++){const o=this.subscribers[r][0],n=this.subscribers[r][1];e===o&&n(t)}}}class p{constructor(e){e.subscribe("add comment",this.redraw.bind(this)),e.subscribe("comments-loaded",this.redraw.bind(this))}redraw(e){document.querySelector(".comments").innerHTML="",console.log(e);for(let t=0;t<e.length;t++){let r=e[t].name,o=e[t].email,n=e[t].comment,c=e[t].timestamp,u=`
                <custom-comment 
                    name="${r}" 
                    email="${o}" 
                    comment="${n}"
                    timestamp="${c}">
                </custom-comment>
            `;document.querySelector(".comments").insertAdjacentHTML("afterbegin",u)}}}class y{constructor(e){this.stateManager=e;const t=`
        <form>
    <div class="row">
      <label class="desc" for="full_name">Full Name</label>

      <input
        id="full_name"
        name="full_name"
        type="text"
        class="field text fn"
        value=""
        size="50"
        tabindex="1"
        required
      />
    </div>
    <!-- email -->
    <div class="row">
      <label class="desc" for="my_email"> Email </label>

      <input
        id="my_email"
        name="my_email"
        type="email"
        spellcheck="false"
        placeholder="enter email here"
        maxlength="255"
        tabindex="2"
        required
      />
    </div>

    <!-- message -->
    <div class="row">
      <label class="desc" id="title4" for="Field4"> Message </label>

      <textarea
        id="comment"
        name="comment"
        spellcheck="true"
        rows="10"
        cols="50"
        tabindex="4"
        required
      ></textarea>
    </div>

    <!-- select box -->

    <!-- check box -->
    <input type="checkbox" id="check" name="check" value="I agree" required />
    <label for="vehicle1"> I agree to post my comment</label><br />

    <button id="submit" type="submit">submit</button>
  </form>
        
        `;document.querySelector(".form-container").innerHTML=t,document.querySelector("form").addEventListener("submit",this.addComment.bind(this))}addComment(e){e.preventDefault();const t=new Date;let r=t.toLocaleDateString();r+=" "+t.toLocaleTimeString();const o={name:document.querySelector("#full_name").value,email:document.querySelector("#my_email").value,comment:document.querySelector("#comment").value,timestamp:r};console.log(o),this.stateManager.addComment(o)}}const l=new h;new p(l);new y(l);let a;var i=indexedDB.open("my_app_db",2);i.onupgradeneeded=function(s){var e=s.target.result;console.log("running onupgradeneeded"),e.objectStoreNames.contains("comments")||e.createObjectStore("comments",{keyPath:"id",autoincrement:!0})};i.onsuccess=function(s){console.log("running onsuccess"),a=s.target.result,S(a),v(a)};const v=s=>{var e=s.transaction(["comments"],"readwrite"),t=e.objectStore("comments");console.log(t);var r=t.add({id:12,name:"Sky",email:"mo@gmail.com",comment:"text text text text text text text text text text ",timestamp:"8/4/2022 3:15:13PM"});r.onerror=function(o){console.log("Error",o.target.error.name)},r.onsuccess=function(o){console.log("The comment has been successfully added!")},e.oncomplete=()=>{s.close()}},S=s=>{var e=s.transaction("comments","readonly"),t=e.objectStore("comments"),r=t.openCursor(),o=[];r.onsuccess=function(n){n.target.result&&(o.push(n.target.result.value),n.target.result.continue())},e.oncomplete=function(n){console.log(o)}};i.onerror=function(s){console.log("onerror!"),console.dir(s)};
