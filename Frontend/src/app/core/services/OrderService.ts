import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from '../models';
import { map } from 'rxjs/operators';
@Injectable()
export class OrderService {
  constructor(private apiService: ApiService) { }
  get(slug): Observable<Order> {
    return this.apiService.get('/orders' + slug)
      .pipe(map(data => data.poem));
  }
  destroy(slug) {
    return this.apiService.delete('/order' + slug);
  }
  save(order): Observable<Order> {
   return this.apiService.post('/placeorder',{order:order})
   .pipe(map(data=>data.order));
  }
}
