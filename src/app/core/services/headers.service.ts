import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  private totalPages = 0;
  private currentPage = 0;
  private hasNext = false;

  setHeaders(headers: HttpHeaders): void {
    this.totalPages = +headers.get('X-Total-Pages')!;
    this.currentPage = +headers.get('X-Current-Page')!;
    this.hasNext = headers.get('X-Has-Next') === 'true';
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getHasNext(): boolean {
    return this.hasNext;
  }
}
