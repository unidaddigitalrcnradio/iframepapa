import {Injectable}   from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {Product} from './product';

@Injectable()
export class ProductService {

    private productsUrl = './archivo1.json';

    constructor(private http: Http) { }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.productsUrl)
            .map((response: Response) => <Product[]>response.json())
            .catch(this.handleError);
    }

    addProduct(product: Product) {                
        let body = JSON.stringify({ product });            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.productsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
