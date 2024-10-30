import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  headersData = {
    totalPages: 1,
    currentPage: 1,
    totalElements: 0,
    pageSize: 12,
    hasNext: false
  };

  setHeaders(headers: HttpHeaders): void {
    console.log('Original Headers:', headers.keys().map(key => ({ [key]: headers.get(key) })));

    const totalPages = headers.get('x-total-pages');
    const currentPage = headers.get('x-current-page');
    const totalElements = headers.get('x-total-elements');
    const pageSize = headers.get('x-page-size');
    const hasNext = headers.get('x-has-next');

    this.headersData.totalPages = totalPages !== null ? +totalPages : 1;
    this.headersData.currentPage = currentPage !== null ? +currentPage : 1;
    this.headersData.totalElements = totalElements !== null ? +totalElements : 0;
    this.headersData.pageSize = pageSize !== null ? +pageSize : 12;
    this.headersData.hasNext = hasNext !== null && hasNext === 'true';

    console.log('Updated HeadersData:', this.headersData);
  }

  get totalElements(): number {
    return this.headersData.totalElements;
  }

  get totalPages(): number {
    return this.headersData.totalPages;
  }

  get currentPage(): number {
    return this.headersData.currentPage;
  }

  get pageSize(): number {
    return this.headersData.pageSize;
  }

  get hasNext(): boolean {
    return this.headersData.hasNext;
  }
}
