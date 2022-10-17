
function Task(taskName,status){
    this.id= Math.random() ;
    this.taskName=taskName;
    this.status=status;
    this.mangThuocTinh=[this.id,this.taskName,this.status]
}