import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'nitka-test';

  readonly RAWS = 10;
  readonly SEATS = 10;
  public _hall: Subject<any> = new BehaviorSubject(null) ;
  private hall;

  constructor(){
  }

  ngOnInit(): void {

    const matrix = new Array(this.RAWS).fill(0).map(() => new Array(this.SEATS).fill({ reserved: false, selected: false }));
    this._hall.next(matrix)
    this._hall.subscribe(val => {
      this.hall = val;
      console.log('hall', this.hall);
    })
   
    this.reserveSeat(1, 1);
  }
   
  chooseSeat(raw, seat){
    console.log('!!!!',raw, seat)
    this.hall[raw][seat] = { selected: !this.hall[raw][seat].selected };
    this._hall.next(this.hall)
  }
   
  reserveSeat(raw, seat){
    // TODO - пачка заняттых столов
    this.hall[raw][seat] = { reserved: true };
    this._hall.next(this.hall)
  }
}


