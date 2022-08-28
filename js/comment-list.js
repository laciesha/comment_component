/*
The job of the comment list is to:
1. At the very beginning, draw all the comments.
2. If it gets notified that a new comment has been created, 
   it should draw a new comment at the top.
*/

export default class CommentList {

  constructor(stateManager) {
    stateManager.subscribe('add comment', this.redraw.bind(this));
    stateManager.subscribe('comments-loaded', this.redraw.bind(this));
    //this.redraw(stateManager.comments);

    //then the comment list is going to subscrive to the
    //"comment update"event.
  }

  redraw(comments) {
    //the "redraw" method will CLEAR OUT THE OLD and
    // redraw with the new comments.
    document.querySelector(".comments").innerHTML = "";

    // when a new instance of CommentList is created,
    // it needs to know what comments it should draw.
    // it should draw those comments.
    console.log(comments);

    for (let i = 0; i < comments.length; i++) {
      // Bobby first:
      let name = comments[i].name;
      let email = comments[i].email;
      let comment = comments[i].comment;
      let timestamp = comments[i].timestamp;

      // creating an HTML representation of it
      let template = `
                <custom-comment 
                    name="${name}" 
                    email="${email}" 
                    comment="${comment}"
                    timestamp="${timestamp}">
                </custom-comment>
            `;

      // we need to append it to the DOM
      document
        .querySelector(".comments")
        .insertAdjacentHTML("afterbegin", template);
    }
  }
  
}
