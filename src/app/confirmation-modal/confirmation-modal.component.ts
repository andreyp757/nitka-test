import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'confirmation-modal',
    templateUrl: 'confirmation-modal.component.html',
})

export class ConfirmationModal {
    constructor(@Inject(MAT_DIALOG_DATA) public confirm) {}
}