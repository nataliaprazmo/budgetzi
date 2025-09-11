import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseButton } from '../base-button/base-button';

@Component({
  selector: 'app-action-buttons',
  imports: [BaseButton],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.css',
})
export class ActionButtons {
  @Input() isLoading: boolean = false;
  @Input() transactions: any[] | null = [];

  @Output() importSample = new EventEmitter<void>();
  @Output() importCsv = new EventEmitter<File>();
  @Output() exportCsv = new EventEmitter<void>();
  @Output() clearAll = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.importCsv.emit(input.files[0]);
      input.value = '';
    }
  }
}
