import { Component ,Input} from '@angular/core';
import item from '../../types/item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
}) 
export class CardComponent {
  @Input() item!:item;

  ngOnInit(){
    
  }

}
