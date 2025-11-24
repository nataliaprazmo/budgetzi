import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { BaseButton } from '../base-button/base-button';

@Component({
  selector: 'app-message-display',
  imports: [MaterialModule, BaseButton],
  templateUrl: './message-display.html',
  styleUrl: './message-display.scss',
})
export class MessageDisplay {
  @Input() showSuccessMessage = false;
  @Input() showErrorMessage = false;
  @Input() errorMessage = '';

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/']);
  }
}
