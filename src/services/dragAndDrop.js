import { Task } from "../models/task/Task";
import { Status } from "../models/enum";
import { showAll } from "./task";

export class DragAndDrop {
  constructor(document){
    this.document = document;
    this.elB = document.querySelectorAll(".list-task-backlog");
    this.elR = document.querySelectorAll(".list-task-ready");
    this.elP = document.querySelectorAll(".list-task-progress");
    this.elF = document.querySelectorAll(".list-task-finished");

    this.dragOverF = function(e){
      e.preventDefault();
    };
    
    this.dropF = function(e, status){
      e.preventDefault();
      const idUser = Task.getIdUser(e.dataTransfer.getData("text/plain"));
      if(idUser != -1){
        Task.changeStatus(e.dataTransfer.getData("text/plain"), status);
        this.removedListenerAll();
        showAll(this.document);
      }
    };
    
    this.dropF2 = function(e, element){
      e.preventDefault();
      Task.changeUser(e.dataTransfer.getData("text/plain"), element.id);
      this.removedListenerAll();
      showAll(this.document);
    };

  this.elB.forEach(element => {element.addEventListener("dragstart", (e) => this.start(e));});
  this.elR.forEach(element => {element.addEventListener("dragstart", (e) => this.start(e));});
  this.elP.forEach(element => {element.addEventListener("dragstart", (e) => this.start(e));});
  this.elF.forEach(element => {element.addEventListener("dragstart", (e) => this.start(e));});
  }
    
 start(ev) {
    this.removedListenerAll();
    ev.dataTransfer.setData("text/plain", ev.target.id);
    const idUser = Task.getIdUser(ev.target.id);
    const statusTask = Task.getStatus(ev.target.id);
  
    if(statusTask == Status.BACKLOG){
      this.addListenerUser(".p-backlog-user-1");
    }
    if(!(idUser == -1)){
      this.addListenerChild("backlog", Status.BACKLOG);
      this.addListenerChild("ready", Status.READY);
      this.addListenerChild("in-progress", Status.IN_PROGRESS);
      this.addListenerChild("finished", Status.FINISHED);
    }
  }


  removedListenerAll(){
    this.document.querySelectorAll(".p-backlog-user-1").forEach(element => {
      element.removeEventListener("dragover", this.dragOverF);
      element.removeEventListener("drop", this.dropF2);
  });
    this.removedListener(".dropdown-task-backlog");
    this.removedListener(".dropdown-task-ready");
    this.removedListener(".dropdown-task-progress");
    this.removedListener(".dropdown-task-finished");
  }

  removedListener(nameClass){
    this.document.querySelector(nameClass).removeEventListener("dragover", this.dragOverF);
    this.document.querySelector(nameClass).removeEventListener("drop", this.dropF);
  }

  addListenerUser(nameClass){
    this.document.querySelectorAll(nameClass).forEach(element => {
      element.addEventListener("dragover", this.dragOverF);
      element.addEventListener("drop", (e) => this.dropF2(e, element));
  });
  }

  addListenerChild(nameClass, status){
    this.document.getElementById(nameClass).addEventListener("dragover", this.dragOverF);
    this.document.getElementById(nameClass).addEventListener("drop", (e) => this.dropF(e,status));
  }
  
}