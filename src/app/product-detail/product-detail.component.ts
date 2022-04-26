import { ProductService } from './../services/product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {

  id: number;
  products: Product[];
  displayedColumns: string[] = ['id', 'name', 'sku', 'purchasePrice', 'quantity', 'employee', 'edit'];
  dataSource = new MatTableDataSource<Product>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductsById(this.id).subscribe(data => {
      this.products = data;
      this.dataSource.data = data;
      console.log(data);
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editProduct(pid: number, sid: number) {
    console.log("Pid,Sid:" + pid + "," + sid);
    this.router.navigate(['/edit', pid, sid]);

  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
