const searchBox = document.querySelector(".add-task input");
const addBtn = document.querySelector(".add-btn");
const taskHtml = document.querySelector(".tasks");
let taskList = [];
addBtn.addEventListener("click", function () {
  addTask();
});
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") addTask();
});

function addTask() {
  const task = searchBox.value;
  searchBox.value = "";
  if (task === "") return;
  taskList.push({ task: task, ismarked: false });
  saveData();
  printTask();
}
function printTask() {
  taskHtml.innerHTML = "";
  for (let i = taskList.length - 1; i >= 0; i--) {
    taskHtml.innerHTML += `
    <div class="task">
    <i class="fa-regular fa-circle" onclick = "mark(${i});"></i>
    <i class="fa-solid fa-circle-check" style="display: none;" onclick = "unmark(${i});"></i>
    <p>${taskList[i].task}</p>
    <i class="fa-solid fa-circle-xmark" onclick = "deleteTask(${i});")></i>
    </div>
    `;
    if (taskList[i].ismarked === true) completed(i);
  }
}
function mark(i) {
  taskList[i].ismarked = true;
  saveData();
  completed(i);
}
function unmark(i) {
  taskList[i].ismarked = false;
  saveData();
  unCompleted(i);
}
function deleteTask(i) {
  taskList.splice(i, 1);
  saveData();
  printTask();
}
function completed(i) {
  const index = taskList.length - i - 1;
  const allTask = document.querySelectorAll(".task");
  allTask[index].querySelector("p").style.textDecoration = "line-through";
  allTask[index].querySelector(".fa-circle").style.display = "none";
  allTask[index].querySelector(".fa-circle-check").style.display = "block";
}
function unCompleted(i) {
  const index = taskList.length - i - 1;
  const allTask = document.querySelectorAll(".task");
  allTask[index].querySelector("p").style.textDecoration = "none";
  allTask[index].querySelector(".fa-circle").style.display = "block";
  allTask[index].querySelector(".fa-circle-check").style.display = "none";
}

function saveData() {
  let taskListString = JSON.stringify(taskList);
  localStorage.setItem("taskList", taskListString);
}
function showData() {
  let taskListString = localStorage.getItem("taskList");
  taskList = JSON.parse(taskListString);
  printTask();
}
showData();
