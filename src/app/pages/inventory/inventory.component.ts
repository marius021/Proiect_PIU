import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/models/items';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  error:string | null | undefined;
  itemList!: Item[];

  constructor(public dialog: MatDialog, public itemService: ItemService) { }
  ngOnInit(): void {
    this.getItems();
  }

  async openDialog(id: number | undefined){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px', data: { idToBeEdit: id },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    });
  };
  
items: string[] = [
  'maia',
  'olivia',
  'Thomas',
  'Andrew'
]

getItems() : void {

  this.itemService.getItems().subscribe((list: Item[]) => {
    this.itemList = list;
  }, (err) => {
    this.error = err.error;
  });
  }

deleteItem(id: number | undefined): void {
  this.itemService.delete(id!).subscribe(
  () => {
    window.location.reload();
  }, (err) => {

  }
  );
}

}