import {Component, OnInit} from '@angular/core';
import {GetCategoriesService} from "./business-logic/get-categories.service";
import {GetProductsService} from "./business-logic/get-products.service";
import {GetBrandsService} from "./business-logic/get-brands.service";
import {IBrand} from "./interfaces/i-brand";
import {ICategory} from "./interfaces/i-category";
import {IProduct} from "./interfaces/i-product";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  title: string = "";
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedMinPrice: number = 0;

  selectedMaxPrice: number = 0;
  sortOptions = [
    {
      value: "priceAsc",
      viewValue: "Price Ascending"
    }, {
      value: "priceDesc",
      viewValue: "Price Descending"
    }, {
      value: "nameAsc",
      viewValue: "Name Ascending"
    }, {
      value: "nameDesc",
      viewValue: "Name Descending"
    },
  ];
  brandOptions: IBrand[] = [];
  categoryOptions: ICategory[] = [];
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  selectedSort: string = this.sortOptions[0].value;
  selectedCategories: number[] = [];
  selectedBrands: number[] = [];

  constructor(
    private ApiCategories: GetCategoriesService,
    private ApiProducts: GetProductsService,
    private ApiBrands: GetBrandsService
  ) {
  }

  ngOnInit(): void {
    this.ApiBrands.getBrands().subscribe(e => {
        this.brandOptions = e;
      },
      (err: Error) => {
        console.log(err);
      }
    );
    this.ApiCategories.getCategories().subscribe(e => {
        this.categoryOptions = e;
      },
      (err: Error) => {
        console.log(err);
      }
    );
    this.ApiProducts.getProducts().subscribe(e => {

        // get minimum and maximum price of products
        let temp = e.sort((x,y) => x.price - y.price);
        this.minPrice = temp[0].price;
        this.maxPrice = temp[temp.length - 1].price;

        this.selectedMinPrice = this.minPrice;
        this.selectedMaxPrice = this.maxPrice;
        this.products = e;
        this.filteredProducts = e;

      },
      (err: Error) => {
        console.log(err);
      }
    );


  }

  updateProducts(): void {
    this.products = this.filteredProducts;
    if (this.title != "") {
      this.products = this.products.filter(x => x.title.toLowerCase().includes(this.title.toLowerCase()));
    }
    if (this.selectedCategories.length > 0) {
      this.products = this.products.filter(x => this.selectedCategories.includes(x.categoryId));
    }
    if (this.selectedBrands.length > 0) {
      this.products = this.products.filter(x => this.selectedBrands.includes(x.brandId));
    }
    this.products = this.products.filter(x => this.selectedMinPrice <= x.price);
    this.products = this.products.filter(x => this.selectedMaxPrice >= x.price);

    switch (this.selectedSort) {
      case "priceAsc":
        this.products = this.products.sort((x, y) => x.price - y.price);
        break;
      case "priceDesc":
        this.products = this.products.sort((x, y) => y.price - x.price);
        break;
      case "nameAsc":
        this.products = this.products.sort((x, y) => ('' + x.title).localeCompare(y.title));
        break;
      case "nameDesc":
        this.products = this.products.sort((x, y) => ('' + y.title).localeCompare(x.title));
        break;
    }

  }

  onCategoryCheckboxChange(categoryId: number, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.updateProducts();
  }

  onBrandCheckboxChange(brandId: number, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedBrands.push(brandId);
    } else {
      const index = this.selectedBrands.indexOf(brandId);
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.updateProducts();
  }

}
