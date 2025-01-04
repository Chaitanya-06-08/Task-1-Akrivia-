import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input()
  customClass: string = `inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto`;
  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event): void {
    this.clicked.emit(event);
  }
}
