import { Employee } from './../model/employee.model';
import { EmployeeService } from './../services/employee.service';
import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  form: FormGroup;
  id: number;
  product: Product;
  employee: Employee;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.product = new Product();
    this.form = this.fb.group({
      productid: '',
      name: '',
      language: '',
      quantity: 0,
      sku: '',
      productNumber: '',
      purchasePrice: 0,
      purchaseDate: '',
      productCondition: 100,
      employeeName: '',
      employeeId: 0
    });
    this.productService.getProductsByIdInStock(this.route.snapshot.params['pid'], this.route.snapshot.params['sid']).subscribe(data => {
      this.product = data;

      console.log(data);
      this.employeeService.getEmployees().subscribe(employees => {
        this.product.employees = employees;
        this.form.patchValue(this.product);

      });
    });




    this.form.controls['employeeId'].valueChanges.subscribe(data => console.log(data));
  }

  submitForm() {
    this.productService.updateProduct(this.product);

  }
}
