import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [ButtonComponent, FormsModule],
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() customClass: string =
    'w-full px-4 py-2 border-2 rounded-xl  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  @Output() search = new EventEmitter<string>();
  @Input() searchTerm: string = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onClearSearch(): void {
    this.searchTerm = '';
    this.search.emit(this.searchTerm);
  }
}
