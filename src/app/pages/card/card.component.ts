import { Component ,Input} from '@angular/core';
import item from '../../types/item';
import { ItemsFetchService } from 'src/app/services/items-fetch.service';
import { Item } from 'src/models/items';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
}) 
export class CardComponent {
  @Input() item!:item;

  constructor(private itemService:ItemsFetchService, public dialog: MatDialog,){

  }

  ngOnInit(){
    
  } 


  async openDialog(id: number | undefined){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '850px', data: { idToBeEdit: id },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    });
  };
  


  updateItem(item:Item){
    this.openDialog(item.id);
  }

  deleteOneItem(id:number){
    this.itemService.deleteItem(id).subscribe((data)=>{console.log(data); window.location.reload();},(err)=>{console.log(err)});
  }

}
