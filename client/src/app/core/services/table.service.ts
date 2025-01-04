import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  getUploadXlSheetUrl,
  getUserTableDataUrl,
} from '../../../environments/environments';
import { Table, TableResponse } from '../models/table.model';
@Injectable({
  providedIn: 'root',
})
export class TableService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  getUsersTableData(
    userId: number,
    pageNumber: number,
    pageCount: number,
    searchQuery: string
  ) {
    return this.http.get<TableResponse>(
      `${getUserTableDataUrl(
        userId
      )}?pageCount=${pageCount}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
      {
        withCredentials: true,
      }
    );
  }
  uploadXlSheet(file: File, userId: number) {
    const formData = new FormData();
    formData.append('xlSheet', file);
    return this.http.post<{status:boolean;data:any}>(getUploadXlSheetUrl(userId), formData, {
      withCredentials: true,
    });
  }
}
