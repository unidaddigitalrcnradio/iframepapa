import { Component, OnInit }  from '@angular/core';

import { Product } from './product'
import { ProductService } from './product.service'

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: 'create-product.html'
})
export class CreateProductComponent {

    product = new Product(undefined, '', undefined);
    errorMessage: string;

    constructor(private productService: ProductService) { }

    addProduct() {            
        if (!this.product) { return; }
        this.productService.addProduct(this.product)
            .subscribe(
            product => this.product,
            error => this.errorMessage = <any>error);
    }
}