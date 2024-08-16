import { Categorie } from './categorie';

export class Produit {
  id!: number;
  productName!: string;
  description!: string;
  quantity!: number;
  createBy!: number;
  totalStock! : number
  //categories_id: number;
  categorie!: Categorie ;

  static calculateTotalStock(products: Produit[]): number {
    return products.reduce((total, product) => total + product.quantity, 0);
  }
}
