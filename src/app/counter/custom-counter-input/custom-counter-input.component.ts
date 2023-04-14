import { Component } from '@angular/core';
import {Observable} from 'rxjs'
import { CounterState } from '../state/counter.state';
import {Store} from '@ngrx/store';
import { changeName, customIncrement } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent {
value: number;
name$: Observable<string>;

constructor(private store: Store<AppState>){}

ngOnInit(){
this.name$ = this.store.select(getName);
}


onAdd(){
this.store.dispatch(customIncrement({count: +this.value}));
}

onChangeName(){
  this.store.dispatch(changeName());
}
}
