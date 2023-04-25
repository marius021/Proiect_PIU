import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services.service';
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
      private formBuilder : FormBuilder, public itemService: ItemService){};


  ngOnInit(): void {
    this.errorText = "";

    if (this.data.idToBeEdit != 0)
      this.setEditItem(this.data.idToBeEdit!);
    this.createForm();
  }

  private addItem(newItem: Item): void{
    this.itemService.createItem(newItem).subscribe(() => {
      this.dialogRef.close();
    }, (err)=> {
      this.errorText = err.error;
    });//
  }

  private updateItem(newItem: Item): void{
    this.itemService.editItem(newItem).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.errorText = err.error;
    });
  }

  private setEditItem(id: number): void {
    this.itemService.getItemById(id).subscribe((item: Item) => {
      this.itemToEdit = item;
      this.form.patchValue(this.itemToEdit!, {
        emitEvent: false
      });
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name:[null],
      number: [null],
      category: [null]
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
