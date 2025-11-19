import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButton } from '../base-button/base-button';

@Component({
  selector: 'app-submit-button',
  imports: [BaseButton],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.scss',
})
export class SubmitButton {
  @Input() label = 'Submit';
  @Input() loadingLabel = 'Submitting...';
  @Input() isSubmitting = false;
  @Input() disabled = false;
  @Output() submit = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit();
  }
}
