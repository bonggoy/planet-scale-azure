import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './user/store/user.state';
import * as userActions from './user/store/user.actions';
import { Observable } from 'rxjs/Observable';
import { Cart } from './models/cart';
import { User } from './models/user';
import { NotifyService } from './core/services/notifications.service';
import { Message, MessageType } from './models/message';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    cart$: Observable<Cart>;
    user$: Observable<User>;

    public options = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,
        showProgressBar: true
    }

    constructor(private store: Store<any>, public notifyService: NotifyService) {
        this.cart$ = this.store.select<Cart>(state => state.user.userState.cart);
        this.user$ = this.store.select<User>(state => state.user.userState.user);
     }

    ngOnInit(): void {
        this.store.dispatch(new userActions.GetCartAction());
        const notification: Message = { type: MessageType.Info, message: 'Welcome to Planet Scale Store!' } ;
        this.notifyService.setMessage(notification);
    }

}
