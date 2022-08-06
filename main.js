import "./style.css";

// main.js shows title and imports.style.css
document.querySelector("#app").innerHTML = `
  <h1>New Comment Component</h1>
  
`;
const addComment = (ev) => {
  ev.preventDefault();
  console.log("hello world");
  const name = document.querySelector("#full_name").value;
  console.log(name);
  const email = document.querySelector("#my_email").value;
  const comment = document.querySelector("#comment").value;

  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  const time = currentDate.toLocaleTimeString();

  const dateString =
    currentMonth + 1 + "-" + currentDayOfMonth + "-" + currentYear + "" + time;
  console.log(dateString);
  const template = `<custom-comment
  name="${name}"
  email="${email}"
  comment="${comment}"
  timestamp="${dateString}"
></custom-comment>`;





  console.log(template);
  document.querySelector("#comments").insertAdjacentHTML("beforeend", template);
  document.querySelector("#full_name").value = "";
  document.querySelector("#my_email").value = "";
  document.querySelector("#comment").value = "";
  document.querySelector("#check").checked = false;
};
document.querySelector("form").addEventListener("submit", addComment);
