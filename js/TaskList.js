function TaskList() {
  this.taskList = [];
  this.addTask = function (task) {
    this.taskList.push(task);
  };
  this.removeTask = function (index) {
    this.taskList.splice(index, 1);
  };
  this.findIndex = function (id) {
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index] === id) {
        return index;
        break;
      }
    }
  };
  this.renderTodo = function () {
    var content = "";
    for (var index = 0; index < this.taskList.length; index++) {
      content += `
                <li>
                    <span>${this.taskList[index].taskName}</span>
                    <div class="buttons">
                        <button class="update" data-index="${index}" data-status="${this.taskList[index].status}" onclick="update(event)">
                        <i class="fa fa-pencil-alt"></i>
                        </button>
                        <button class="remove" data-index="${index}" data-status="${this.taskList[index].status}" onclick="deleteToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}"  data-status="${this.taskList[index].status}" onclick="completeToDo(event)" >
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>

                    </div>
                </li>
            `;
    }
    return content;
  };

  this.getTaskById = function (id) {
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index].id === id) {
        return this.taskList[index];
        break;
      }
    }
  };
  this.kiemTraTrungTen = function (newTaskName) {
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index].taskName === newTaskName) {
        return true;
      }
    }
    return false;
  };
  this.updateTask = function (id, newTaskName) {
    var indexEdit = -1;
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index].id === id) {
        this.taskList[index].taskName = newTaskName;
        break;
      }
    }
  };
  this.sortToDoList = function (isDES) {
    this.taskList.sort((todo, nextToDo) => {
      const textA = todo.taskName.toLowerCase();
      const textB = nextToDo.taskName.toLowerCase();
      //ASC
      return textB.localeCompare(textA);
    });
    if (isDES) {
      this.taskList.reverse();
    }
  };
}
