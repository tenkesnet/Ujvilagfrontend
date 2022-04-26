import { Employee } from './employee.model';
export class Product {
  productid: number;
  stockid: number;
  name: string;
  language: string;
  quantity: number;
  sku: string;
  productNumber: string;
  purchasePrice: number;
  purchaseDate: Date;
  productCondition: number;
  employeeName?: string;
  employeeId: number;
  employees?: Employee[];
}
