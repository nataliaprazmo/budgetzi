import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-base-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.css',
})
export class BaseButton {
  @Input() label!: string;
  @Input() loadingLabel!: string;
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = undefined;
  @Input() disabled = false;
  @Input() isLoading = false;

  @Output() action = new EventEmitter<void>();
}
