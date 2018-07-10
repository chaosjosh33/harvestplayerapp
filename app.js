import {
    Rx
} from 'rxjs';
import {
    map,
    filter,
    switchMap
} from 'rxjs/operators';

let button = document.querySelector('button')

Rx.Observable.fromEvent(button, 'click')
    .subscribe(() => document.getElementById('app').innerHTML('clicked'))