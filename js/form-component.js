/*

Form component:
1. Draws the form.
2. Listens for the form submit
3. It creates a new comment object:

   {
        name: __________,
        email: _________,
        comment: _______, 
        timestamp: new Date()
   }

    and sends it to the state manager.
4. It clears out the form

*/

export default class Form {
  // what is a constructor?
  // brings the instance to life
  constructor(sm) {
    this.stateManager = sm;
    const formTemplate = `
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
        
        `;

    document.querySelector(".form-container").innerHTML = formTemplate;

    document
      .querySelector("form")
      .addEventListener("submit", this.addComment.bind(this));
  }

  addComment(ev) {
    // goal of add comment is to let the state manager know
    // that a new comment has been added:
    ev.preventDefault();

    const date = new Date();
    let dateString = date.toLocaleDateString();
    dateString += " " + date.toLocaleTimeString();

    const commentObject = {
      name: document.querySelector("#full_name").value,
      email: document.querySelector("#my_email").value,
      comment: document.querySelector("#comment").value,
      timestamp: dateString,
    };
    console.log(commentObject);

    // tell the state manager that we have
    // a new comment to add:
    this.stateManager.addComment(commentObject);

    // Your Job: how do you clear out your form!!
  }
}
