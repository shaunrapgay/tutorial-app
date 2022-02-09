import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';
import { ConditionalExpr } from '@angular/compiler';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  // listTutorial!: FormGroup;
  tutorialListChangeEvent: EventEmitter<any> =  new EventEmitter();
  tutorialList: any;

 
  id: number = 0;
  title:string = "";
  currentTutorial?: any;
  constructor(private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void{
     this.tutorialService.getAll().subscribe(res=>{
      this.tutorialList = res;
      console.log("list of tutorials retrived");
    },
    error=>{
      console.log(error);
    });
  }

  editTutorial(tutorial: any): void{
    this.id = tutorial.id;
    this.router.navigate(["/edit", this.id]);
  }

  deleteTutorial(tutorial: any): void{
    console.log("deleting tutorial at index"+tutorial.id);
    this.tutorialService.delete(tutorial.id)
    .subscribe(
      res=>{
        console.log("tutorial deleted")
        this.router.navigate(["/tutorials"]);
      },
      error=>{
        console.log(error);
      });
  }

  deleteAll(): void{
    console.log("deleting all tutorials");
    this.tutorialService.deleteAll()
    .subscribe(res=>{
      console.log("all tutorials deleted");
      this.router.navigate(["/tutorials"]);
    },
    error=>{
      console.log(error);
    });
  }

  findTutorials(tutorial: any){
    
  }

}
