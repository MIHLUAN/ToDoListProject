
// add task
var btn=document.querySelector('#addItem');
var textInput=document.querySelector('#newTask');
var ulTodo=document.querySelector('#todo');
var ulCompleted=document.querySelector('#completed');
var notiInput=document.querySelector('#notiInput');
let todoList = new TaskList();
let completeList = new TaskList();
// kiem tra rong va trung taskname
function kiemTraNhap(){
 if(textInput.value===''){
    notiInput.style.display='block';
    notiInput.innerHTML='Chưa nhập task';
    return false;
 }
 else if(todoList.kiemTraTrungTen(textInput.value)||completeList.kiemTraTrungTen(textInput.value)){
    notiInput.style.display='block';
    notiInput.innerHTML='Name already exists!';
    return false;
 }
 return true;
}
btn.onclick=function(){
    document.querySelector('#btn-update').style.display='none';
    if(kiemTraNhap()){
        notiInput.style.display='none';
        var taskName=textInput.value ;
    var task=new Task(taskName,'todo');
    todoList.addTask(task);
    showTask();
    // console.log(danhSachTask[0]);
    lamMoiForm()
    }
    return;
}
function lamMoiForm(){
    textInput.value='';
}
function showTask(){
    ulTodo.innerHTML=todoList.renderTodo();
    ulCompleted.innerHTML=completeList.renderTodo();
   
}
function deleteToDo(e){
    var tdIndex = e.currentTarget.getAttribute("data-index");
    var status = e.currentTarget.getAttribute("data-status");
    if(status == "todo"){
        todoList.removeTask(tdIndex);
        showTask();
    }else if(status == "completed"){
        completeList.removeTask(tdIndex);
        showTask();
    }else{
        alert("Cannot delete todo!");
    }
}
// chuyễn todo-complete va nguoc lai
function completeToDo(e){
    var tdIndex = e.currentTarget.getAttribute("data-index");
    var status = e.currentTarget.getAttribute("data-status");
    if(status == "todo"){       
        // slice: start <=index <end
        var completedItem = todoList.taskList.slice(tdIndex,tdIndex+1);      
        var objToDo = new Task(completedItem[0].taskName,"completed");
        todoList.removeTask(tdIndex);
        completeList.addTask(objToDo);
        showTask();
    }else if(status == "completed"){
        var undoItem = completeList.taskList.slice(tdIndex,tdIndex+1);      
        var objToDo = new Task(undoItem[0].taskName,"todo");
        completeList.removeTask(tdIndex);
        todoList.addTask(objToDo);
        showTask();
    }else{
        alert("Cannot move todo !");
    }
}
// update
var idUpddate='';
function update(e){
    notiInput.style.display='none';
    var tdIndex = e.currentTarget.getAttribute("data-index");
    var status = e.currentTarget.getAttribute("data-status");
    if(status == "todo"){
        textInput.value=todoList.taskList[tdIndex].taskName;
    idUpddate=todoList.taskList[tdIndex].id;
    // console.log(idUpddate);
    document.querySelector('#btn-update').style.display='block';
    }else if(status == "completed"){
        textInput.value=completeList.taskList[tdIndex].taskName;
        idUpddate=completeList.taskList[tdIndex].id;
        document.querySelector('#btn-update').style.display='block';
    }else{
        alert("Cannot move todo !");
    }
    
}
function confirmEdit(e){
    var x=kiemTraNhap();
    todoList.updateTask(idUpddate,textInput.value);
    completeList.updateTask(idUpddate,textInput.value);
    document.querySelector('#btn-update').style.display='none';
    textInput.value='';
    showTask();
}