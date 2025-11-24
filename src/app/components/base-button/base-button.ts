import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonColor, ButtonType, MatButtonVariant } from '../../types/button.types';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-base-button',
  imports: [MaterialModule, MatProgressSpinnerModule],
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
