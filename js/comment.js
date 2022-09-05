//creating a new class that controls whaat new element will look like
//includes what attributes are needed and how they are presented
//also include a style tag with style rules (optional)
class Comment extends HTMLElement {
  constructor() {
    super();
  }

  //overriding the connected callback method with my own html
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<section class = "comment">
    
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
      </style>`;
  }
}

//custome-elem
customElements.define("custom-comment", Comment);
