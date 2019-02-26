import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';

export interface Action {
    type: string;
    payload?: any;
}

export interface Reducer<T> {
    (state: T, action: Action)
}

export class HallStore<T> extends BehaviorSubject<T> {

    private dispatcher: Subject<Action>;
    
    constructor(private reducer: Reducer<T>, initialState: T) { 
        super(initialState);
        this.dispatcher = new Subject<Action>();
        this.dispatcher.scan((state: T, action: Action) => this.reducer(state, action), initialState).subscribe(state => super.next(state));
    }

    public getState = (): T => this.value;

    public dispatch = (action: Action): void => this.dispatcher.next(action);

}