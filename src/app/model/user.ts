import { Basket } from "./Basket";

export interface user {
    email : string;
    token : string;
    basket? : Basket;
    roles? : string[];

}