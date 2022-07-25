//creating a new class that controls whaat new element will look like
//includes what attributes are needed and how they are presented
//also include a style tag with style rules (optional)
class Comment extends HTMLElement {
    constructor() {
      super();
    }

    //overriding the connected callback method with my own html
    connectedCallback(){
        this.innerHTML = `<section class = "comment">
    
        <h2>
          ${this.getAttribute("name")}
          <br />
          ${this.getAttribute("email")}
          <br />
        </h2>
        <p>${this.getAttribute("comment")}</p>
      </section>`;
    }
  }

  //custome-elem
  customElements.define('custom-comment', Comment);
