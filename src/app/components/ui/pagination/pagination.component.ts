import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'tcc-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    TranslateModule
  ],
  templateUrl: './pagination.component.html',
  styles: `
    .pagination
      @apply flex flex-col md:flex-row items-center font-semibold justify-between gap-0 md:gap-4 p-1
      select
        @apply p-4 md:p-2 bg-primary-light dark:bg-primary
      button
        @apply text-primary dark:text-primary-light px-4 py-2 rounded text-primary dark:border-primary-light
        &:disabled
          @apply cursor-not-allowed text-tertiary-light dark:text-tertiary
        &.current-page
          @apply text-highlight dark:text-highlight-light font-bold
        &.page
          @apply text-secondary dark:text-secondary-light
        &.material-symbols-outlined
          @apply px-2 text-primary dark:text-primary-light brightness-125
  `
})
export class PaginationComponent {
  @Input() totalItems = 15;
  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  get pages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (this.currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
      } else if (this.currentPage >= totalPages - 2) {
        pages.push(-1);
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(-1);
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push(-1);
      }
      pages.push(totalPages);
    }
    return pages;
  }

  setPage(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.pageSize) && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    this.pageSizeChange.emit(newSize);
  }

  get hasNext(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }
}
