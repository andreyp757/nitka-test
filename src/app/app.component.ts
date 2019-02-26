import { Component } from '@angular/core';
import { HallStore } from './utilities/hall-store.class';
import { reservationReducer, ACTION_TYPES } from './utilities/reservation.reducer';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { MatDialog } from '@angular/material';
import { ConfirmationModal } from './confirmation-modal/confirmation-modal.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  public title = 'Nitka-test';

  readonly ROWS = 10;
  readonly SEATS = 10;

  public selectedSeats: Observable<any>;
  public hall: HallStore<any>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const matrix = new Array(this.ROWS)
      .fill(0)
      .map(() => new Array(this.SEATS)
        .fill({ reserved: false, selected: false }));

    this.hall = new HallStore<any>(reservationReducer, matrix);
    this.hall.dispatch({ type: ACTION_TYPES.RANDOM });
    this.selectedSeats = this.hall.pipe(
      map(hall => {
        let selectedSeats = [];
        hall.map((row, rowIndex) => {
          row.filter((seat, seatIndex) => seat.selected && selectedSeats.push({ row: rowIndex, seat: seatIndex }))
        })
        return selectedSeats;
      })
    )
  }

  public chooseSeat(row, seat) {
    this.hall.dispatch({
      type: ACTION_TYPES.TOGGLE,
      payload: { row: row, seat: seat }
    });
  }

  public clearSeats() {
    this.hall.dispatch({ type: ACTION_TYPES.CLEAR });
  }

  public reserveSeats() {
    const dialogRef = this.dialog.open(ConfirmationModal);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;
        this.hall.dispatch({ type: ACTION_TYPES.RESERVE })
        this.dialog.open(ConfirmationModal, { data: true })
      });
  }



}


