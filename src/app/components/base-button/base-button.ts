import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonColor, ButtonType, MatButtonVariant } from '../../types/button.types';

@Component({
  selector: 'app-base-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss',
})
export class BaseButton {
  @Input() label!: string;
  @Input() loadingLabel!: string;
  @Input() color: ButtonColor = undefined;
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() variant: MatButtonVariant = 'outlined';
  @Input() buttonType?: ButtonType;

  @Output() action = new EventEmitter<void>();

  @HostBinding('class') @Input() class?: string;
}
