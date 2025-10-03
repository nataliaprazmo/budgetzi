import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-display',
  imports: [MatIconModule],
  templateUrl: './message-display.html',
  styleUrl: './message-display.scss',
})
export class MessageDisplay {
  @Input() showSuccessMessage = false;
  @Input() showErrorMessage = false;
  @Input() errorMessage = '';
}
