import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import * as productsAction from './product.action';
import * as notifyActions from '../../notifications/store/notifications.actions';
import { Product } from './../../models/product';
import { ProductService } from '../../core/services/product.service';
import { Cart } from "../../models/cart";

@Injectable()
export class ProductEffects {

    @Effect() getAll$: Observable<Action> = this.actions$.ofType(productsAction.SELECTALL)
        .switchMap(() =>
            this.productService.getAll()
                .mergeMap((data: Product[]) => {
                    return [
                        new notifyActions.SetLoadingAction(false),
                        new productsAction.SelectAllCompleteAction(data)
                    ];
                })
                .catch((error: any) => {
                    return of({ type: 'getAll_FAILED' })
                })
        );

    @Effect() getProduct$: Observable<Action> = this.actions$.ofType(productsAction.SELECT_PRODUCT)
        .switchMap((action: productsAction.SelectProductAction) => {
            return this.productService.getSingle(action.id)
                .mergeMap((data: Product) => {
                    return [
                        new notifyActions.SetLoadingAction(false),
                        new productsAction.SelectProductCompleteAction(data)
                    ];
                })
                .catch((error: any) => {
                    return of({ type: 'getProduct_FAILED' })
                })
        }
    );

    constructor(
        private productService: ProductService,
        private actions$: Actions
    ) { }
}
