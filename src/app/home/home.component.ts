import { ProductService } from './../services/product.service';
import { Product } from './../model/product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements AfterViewInit, OnInit {

  products: Product[];
  displayedColumns: string[] = ['id', 'name', 'sku', 'purchasePrice', 'quantity'];
  dataSource = new MatTableDataSource<Product>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.dataSource.data = data;
      console.log(this.products);
    }
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProduct(id: number) {
    this.route.navigate(['product', id]);
    console.log(id);
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length == 0) this.route.navigate(['/home']);
    console.log("FilterValue: " + filterValue);
    this.productService.searchProducts(filterValue).subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
    });
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
