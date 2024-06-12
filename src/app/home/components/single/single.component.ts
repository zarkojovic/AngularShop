import {Component, OnInit} from '@angular/core';
import {GetProductsService} from "../shop/business-logic/get-products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../shop/interfaces/i-product";
import {ISingleProduct} from "../shop/interfaces/i-single-product";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent implements OnInit {

  constructor(
    public ProductService: GetProductsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  public product: ISingleProduct | undefined;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.ProductService.getProductById(parseInt(id, 10)).subscribe(product => {
        this.product = product;
        if (!this.product) {
          // Redirect to the shop route
          this.router.navigate(['/shop']);
        }
      });
    } else {
      // If there's no id in the route, redirect to the shop route
      this.router.navigate(['/shop']);
    }
  }

}
