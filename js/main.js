// add task
var btn = document.querySelector("#addItem");
var textInput = document.querySelector("#newTask");
var ulTodo = document.querySelector("#todo");
var ulCompleted = document.querySelector("#completed");
var notiInput = document.querySelector("#notiInput");
let todoList = new TaskList();
let completeList = new TaskList();
function layDuLieuStorage() {
  //Kiểm tra xem localstorage có name đó không
  if (localStorage.getItem("todoList")) {
    var stringTodoList = localStorage.getItem("todoList");

    var gettodoList = JSON.parse(stringTodoList);
    // todoList=[];
    var x = stringTodoList.length;
    for (var index = 0; index < gettodoList.length; index++) {
      var task1 = new Task(
        gettodoList[index].taskName,
        gettodoList[index].status
      );
      task1.id = gettodoList[index].id;
      todoList.addTask(task1);
    }
  }
  if (localStorage.getItem("completeList")) {
    var stringCompleteList = localStorage.getItem("completeList");
    var getcompleteList = JSON.parse(stringCompleteList);
    console.log(completeList);
    // completeList=[];
    for (var index = 0; index < getcompleteList.length; index++) {
      var task = new Task(
        getcompleteList[index].taskName,
        getcompleteList[index].status
      );
      task.id = getcompleteList[index].id;
      completeList.addTask(task);
    }
  }
  showTask();
}
layDuLieuStorage();
// kiem tra rong va trung taskname
function kiemTraNhap() {
  if (textInput.value === "") {
    notiInput.style.display = "block";
    notiInput.innerHTML = "Please enter your information!";
    return false;
  } else if (
    todoList.kiemTraTrungTen(textInput.value) ||
    completeList.kiemTraTrungTen(textInput.value)
  ) {
    notiInput.style.display = "block";
    notiInput.innerHTML = "Name already exists!";
    return false;
  }
  return true;
}
btn.onclick = function () {
  document.querySelector("#btn-update").style.display = "none";
  if (kiemTraNhap()) {
    notiInput.style.display = "none";
    var taskName = textInput.value;
    var task = new Task(taskName, "todo");
    todoList.addTask(task);
    luuLocalStorage();
    showTask();
    // layDuLieuStorage();

    // console.log(danhSachTask[0]);
    lamMoiForm();
  }
  return;
};

//Viết hàm lưu localstorage

function luuLocalStorage() {
  var stringTodoList = JSON.stringify(todoList.taskList);
  localStorage.setItem("todoList", stringTodoList);
  console.log(stringTodoList);
  var stringCompleteList = JSON.stringify(completeList.taskList);
  localStorage.setItem("completeList", stringCompleteList);
  console.log(stringCompleteList);
}

// g

function lamMoiForm() {
  textInput.value = "";
}
function showTask() {
  ulTodo.innerHTML = todoList.renderTodo();
  ulCompleted.innerHTML = completeList.renderTodo();
}
function deleteToDo(e) {
  var tdIndex = e.currentTarget.getAttribute("data-index");
  var status = e.currentTarget.getAttribute("data-status");
  if (status == "todo") {
    todoList.removeTask(tdIndex);
    showTask();
  } else if (status == "completed") {
    completeList.removeTask(tdIndex);
    showTask();
  } else {
    alert("Cannot delete todo!");
  }
  luuLocalStorage();
}
// chuyễn todo-complete va nguoc lai
function completeToDo(e) {
  var tdIndex = e.currentTarget.getAttribute("data-index");
  var status = e.currentTarget.getAttribute("data-status");
  if (status == "todo") {
    // slice: start <=index <end
    var completedItem = todoList.taskList.slice(tdIndex, tdIndex + 1);
    var objToDo = new Task(completedItem[0].taskName, "completed");
    todoList.removeTask(tdIndex);
    completeList.addTask(objToDo);
    showTask();
  } else if (status == "completed") {
    var undoItem = completeList.taskList.slice(tdIndex, tdIndex + 1);
    var objToDo = new Task(undoItem[0].taskName, "todo");
    completeList.removeTask(tdIndex);
    todoList.addTask(objToDo);
    showTask();
  } else {
    alert("Cannot move todo !");
  }
  luuLocalStorage();
}
// update
var idUpddate = "";
function update(e) {
  notiInput.style.display = "none";
  var tdIndex = e.currentTarget.getAttribute("data-index");
  var status = e.currentTarget.getAttribute("data-status");
  if (status == "todo") {
    textInput.value = todoList.taskList[tdIndex].taskName;
    idUpddate = todoList.taskList[tdIndex].id;
    // console.log(idUpddate);
    document.querySelector("#btn-update").style.display = "block";
  } else if (status == "completed") {
    textInput.value = completeList.taskList[tdIndex].taskName;
    idUpddate = completeList.taskList[tdIndex].id;
    document.querySelector("#btn-update").style.display = "block";
  } else {
    alert("Cannot move todo !");
  }
  // luuLocalStorage()
}
function confirmEdit(e) {
  var x = kiemTraNhap();
  todoList.updateTask(idUpddate, textInput.value);
  completeList.updateTask(idUpddate, textInput.value);
  document.querySelector("#btn-update").style.display = "none";
  textInput.value = "";
  showTask();
  luuLocalStorage();
}
// sap xếp
function sortASC() {
  todoList.sortToDoList(false);
  completeList.sortToDoList(false);
  showTask();
}
window.sortASC = sortASC;
function sortDES() {
  todoList.sortToDoList(true);
  completeList.sortToDoList(true);
  showTask();
}
window.sortDES = sortDES;
