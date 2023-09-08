const searchBox = document.querySelector(".add-task input");
const addBtn = document.querySelector(".add-btn");
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
  s;
  if (task === "") return;
  taskList.push({ task: task, ismarked: false });
  printTask();
}
function printTask() {
  const taskHtml = document.querySelector(".tasks");
  taskHtml.innerHTML = "";
  for (let i = taskList.length - 1; i >= 0; i--) {
    taskHtml.innerHTML += `
    <div class="task">
    <i class="fa-regular fa-circle" onclick = "mark(${i});"></i>
    <i class="fa-solid fa-circle-check" style="display: none;" onclick = "mark(${i});"></i>
    <p class = "task-text" onclick = "mark(${i});">${taskList[i].task}</p>
    <i class="fa-solid fa-circle-xmark" onclick = "taskList.splice(${i},1); printTask();")></i>
    </div>
    `;
    if (taskList[i].ismarked) mark(i);
  }
}
function mark(index) {
  const elements = document.querySelectorAll(".task");
  let choosenOne = elements[taskList.length - index - 1];
  if (!taskList[index].ismarked) {
    choosenOne.querySelector(".fa-circle").style.display = "none";
    choosenOne.querySelector(".fa-circle-check").style.display = "block";
    choosenOne.querySelector(".task-text").style.textDecoration =
      "line-through";
    taskList[index].ismarked = true;
  } else {
    choosenOne.querySelector(".fa-circle").style.display = "block";
    choosenOne.querySelector(".fa-circle-check").style.display = "none";
    choosenOne.querySelector(".task-text").style.textDecoration = "none";
    taskList[index].ismarked = false;
  }
}
