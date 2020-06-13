import { User } from './User.model';

export interface Order {
  slug: string;
  cust_name:string;
 email: string;
 contact:Number;
 pickup_city:string;
 pickup_add:string;
 recv_cont:Number;
 drop_city:string;
 distance:Number;
 recv_add:string;
 pkg_length:Number;
 pkg_breadth:Number;
 pkg_height:Number;
 pkg_wt:Number;
 delivery_opt:string;
 charges:Number;
}
