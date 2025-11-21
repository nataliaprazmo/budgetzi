import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-message-display',
  imports: [MaterialModule],
  templateUrl: './message-display.html',
  styleUrl: './message-display.scss',
})
export class MessageDisplay {
  @Input() showSuccessMessage = false;
  @Input() showErrorMessage = false;
  @Input() errorMessage = '';
}
