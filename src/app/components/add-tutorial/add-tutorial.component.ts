import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  submitted: boolean = false;
  id: number = 0;
  editMode: boolean = false;

  tutorialForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.maxLength(30)]),
    description: new FormControl('',[Validators.required, Validators.maxLength(50)])

  }); 
  
  constructor(private tutorialService: TutorialService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let title = "";
    let description = "";

    this.activatedRoute.params.subscribe((params:Params)=>{
      if(params["index"]){
        console.log("this is the index",[params["index"]]);
        this.id = params["index"];
        this.editMode = true;
        const tutorial = this.tutorialService.get(this.id).subscribe(res=>{
        // console.log(res.title);
        title = res.title;
        description = res.description;
        this.tutorialForm = new FormGroup({
          title: new FormControl(title,[Validators.required, Validators.maxLength(30)]),
          description: new FormControl(description,[Validators.required, Validators.maxLength(50)])
    
        }); 
        
        });
        
        
      }
    })
  }
  onSubmit(){
    const title = this.tutorialForm.value.title;
    const description = this.tutorialForm.value.description;
    const published = false;

    const tutorial = {
      title,
      description,
      published
    };
if(!this.editMode){
    this.tutorialService.create(tutorial).subscribe((res)=>{
      console.log(res);
      this.router.navigate(["/tutorials"]);
      this.submitted = true;
    },
    error=>{console.log(error)});
  }
  else{
    this.tutorialService.update(this.id,tutorial)
    .subscribe(res=>{
      this.router.navigate(["/tutorials"]);
      console.log("successfully updated tutorial"+res);
    },
    error=>{
      console.log(error);
    })
  }

    
  }

  newTutorial(){
    this.submitted = false;
    this.tutorialForm.reset();
    // this.router.navigate(["add"]);
  }

}
