import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/models/items';
import { ItemsFetchService } from 'src/app/services/items-fetch.service';
import item from "../../types/item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  error:string | null | undefined;
  itemList!: item[];

  constructor(public dialog: MatDialog, public itemService: ItemService, public itmService : ItemsFetchService) { this.itmService.getAllItems().subscribe((data)=>{console.log(Date)})}  // am mai injectat un parametru 
  ngOnInit(): void {
    this.getItems();
  }


  async openDialog(id: number | undefined){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '850px', data: { idToBeEdit: id },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    });
  };
  

getItems() : void {


  this.itemList = [
        {
            "id": 3,
            "name": "ciocolata",
            "description": "cu aroma de rom",
            "qty": 150,
            "category": "dulciuri"
      },
      {
        "id": 3,
        "name": "ciocolata",
        "description": "cu aroma de rom",
        "qty": 150,
        "category": "dulciuri"
        }
    ]
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