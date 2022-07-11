import { Injectable } from '@angular/core';

export interface IOrders {
  id : number,
  dueDate : number,
  buyerName : string,
  address : string,
  total : number
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public orders : IOrders[] =  [{
    id : 1,
    dueDate : 1468959781804,
    buyerName: "xyz",
    address : "Hyderabad",
    total : 50000
  },
  {
    id : 2,
    dueDate : 1469199218634,
    buyerName: "adfz",
    address : "Hyderabad",
    total : 50000
  }]
  constructor() { }

  add(order : IOrders){
    this.orders.push(order);
  }

  edit(order: IOrders){
    let index =  this.orders.findIndex((orders) => {
      return orders.id === order.id;

    })
    console.log(index);
    this.orders[index] = order;
  }

  remove(i : any){
    this.orders = this.orders.filter((order) => {
     return order.id !== i;
    })
  }

  get(id : number) {
    let index =  this.orders.findIndex((orders) => {
      return orders.id === id;

    })

    return this.orders[index];
  }
}
