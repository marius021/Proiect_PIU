import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services.service';
import { ItemsFetchService } from 'src/app/services/items-fetch.service';
import { Item } from 'src/models/items';

export interface DialogData {
  idToBeEdit: number | undefined | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private itemToEdit: Item | undefined = new Item() 
  errorText?: string;
  form! : FormGroup;
  subscriptionList: Subscription[] = [];
  
  constructor(public dialogRef : MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData,
      private formBuilder : FormBuilder, public itemService: ItemsFetchService){};


  ngOnInit(): void {
    this.errorText = "";
    console.log("a");
    if (this.data.idToBeEdit != 0 && this.data.idToBeEdit){
      this.setEditItem(this.data.idToBeEdit!);
       this.itemService.getItemById(this.data.idToBeEdit).subscribe((data)=>{
        console.log(data); 
       })
    }
     
    this.createForm();
  }

  private addItem(newItem: Item): void{
    this.itemService.postItem(newItem).subscribe(() => {
      this.dialogRef.close();
    }, (err)=> {
      this.errorText = err.error;
    });//
    window.location.reload();
  }

  private updateItem(newItem: Item): void{
    if(this.data.idToBeEdit)
    this.itemService.putItem(newItem,this.data.idToBeEdit).subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
    }, (err) => {
      this.errorText = err.error;
    });
  }

  private setEditItem(id: number): void {
    // this.itemService.getItemById(id).subscribe((item: Item) => {
    //   this.itemToEdit = item;
    //   this.form.patchValue(this.itemToEdit!, {
    //     emitEvent: false
    //   });
    // });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      quantity: [0,Validators.required],
      description:['',Validators.required],
      category: ['',Validators.required]
    });
  }

  saveNewItem(): void{
    const newItem: Item = {
      ...this.itemToEdit,
      ...this.form.getRawValue(),
    };
    if (this.data.idToBeEdit == 0)
     this.addItem(newItem);
    else
     this.updateItem(newItem);
  }

}
