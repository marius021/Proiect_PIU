import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Item } from 'src/models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
   
  constructor(public httpClient: HttpClient) { }
  readonly baseUrl = 'http://localhost:8081/api/';

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.baseUrl + 'get') as Observable<Item[]>; // this.baseUrl + 'get' is the url of the api
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + 'getItems/' + id) as Observable<Item>;
  }

  createItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.baseUrl + 'post', item) as Observable<Item>;
  }

  delete(id: number): Observable<null> {
    return this.httpClient.delete<Item>(this.baseUrl + 'delete/' + id) as unknown as Observable<null>;
  }

  editItem(item: Item): Observable<null> {
    return this.httpClient.put(this.baseUrl + 'edit/'+item.id, item) as unknown as Observable<null>;
  }
}