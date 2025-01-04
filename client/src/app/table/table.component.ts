import { Component, inject, Input, OnInit } from '@angular/core';
import { TableService } from '../core/services/table.service';
import { Table, TableResponse } from '../core/models/table.model';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../loading/loading.component';
import { ButtonComponent } from '../button/button.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DialogComponent } from '../SHARED/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-table',
  imports: [LoadingComponent, ButtonComponent, SearchBarComponent, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  @Input() table!: Table;
  @Input() userId!: number;
  tableService: TableService = inject(TableService);
  toaster: ToastrService = inject(ToastrService);
  loading: boolean = true;
  totalCount: number = 0;
  pageNumber: number = 1;
  pageCount: number = 10;
  previousTimeout: ReturnType<typeof setTimeout> | undefined;
  searchTerm: string = '';
  file: File | null = null;

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
      this.getTableData();
    }
  }

  getTableData(
    userId: number = this.userId,
    pageNumber: number = this.pageNumber,
    pageCount: number = this.pageCount,
    searchQuery: string = ''
  ) {
    this.tableService
      .getUsersTableData(userId, pageNumber, pageCount, searchQuery)
      .subscribe({
        next: (response: TableResponse) => {
          if (response.status === true) {
            console.log('Table data:', response);
            this.table = response.data;
            this.totalCount = response.data.totalCount;
          }
          this.loading = false;
        },
        error: (err) => {
          console.log('Error fetching table data', err);
          this.toaster.error('Error fetching table data');
        },
      });
  }

  onEdit(row: any) {
    console.log('Edit row:', row);
  }

  onDelete(row: any) {
    console.log('Delete row:', row);
  }
  onNext(event: Event) {
    this.pageNumber += 1;
    this.loading = true;
    this.getTableData(
      this.userId,
      this.pageNumber,
      this.pageCount,
      this.searchTerm
    );
  }
  onPrevious(event: Event) {
    this.pageNumber -= 1;
    this.loading = true;
    this.getTableData(
      this.userId,
      this.pageNumber,
      this.pageCount,
      this.searchTerm
    );
  }
  checkIfLastPage() {
    return this.pageNumber * this.pageCount >= this.totalCount;
  }
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    if (this.previousTimeout) clearTimeout(this.previousTimeout);
    this.previousTimeout = setTimeout(() => {
      this.getTableData(
        this.userId,
        this.pageNumber,
        this.pageCount,
        searchTerm
      );
    }, 500);
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target.files ? target.files[0] : null;
    console.log(this.file);
  }
  onFileSubmit(event: Event) {
    if (!this.file) {
      this.toaster.error('Please select a file to upload');
      return;
    }
    this.tableService.uploadXlSheet(this.file, this.userId).subscribe({
      next: (response) => {
        if (response.status == true) {
          console.log(response);
          this.toaster.success('XL sheet Data Uploaded To DB');
          this.getTableData();
        } else {
          this.toaster.error('Error in Uploading XL sheet Data to DB');
        }
      },
      error: (err) => {
        console.log('Error uploading file', err);
        this.toaster.error(err.message || 'Error uploading file');
      },
    });
  }
}
