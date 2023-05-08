import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  item  from '../types/item';
import { Item } from 'src/models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsFetchService {

  constructor(private http: HttpClient) { 
  
  }
  
  getAllItems():Observable<item[]> {

    const url = 'localhost:8081/api/item';

    return this.http.get('localhost:8081/api/items') as Observable<item[]>;

  }

  postItem(item:Item):Observable<item>{
    const url = 'localhost:8081/api/item';
    
    return this.http.post(url, item) as Observable<item>;
  
  }

  putItem(item:Item, id:number):Observable<item>{
    const url = `localhost:8081/api/item${id}`;

    return this.http.put(url, item) as Observable<item>;

  }

  deleteItem(id:number):Observable<item>{
    const url = `localhost:8081/api/item${id}`;

    return this.http.delete(url) as Observable<item>;
  }

}
