import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[tccOutsideClick]',
  standalone: true
})
export class InteractionDirective implements OnInit, OnDestroy {
  @Input() closeOnOutsideClick = true;
  @Input() closeOnEscapeKey = true;

  @Output() clickOutside = new EventEmitter<void>();
  @Output() enterKey = new EventEmitter<void>();
  @Output() escapeKey = new EventEmitter<void>();
  @Output() scrollEvent = new EventEmitter<number>();

  private clickListener: (() => void) | undefined;
  private keyupListener: (() => void) | undefined;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.closeOnOutsideClick) {
      this.clickListener = this.renderer.listen('document', 'click', this.onDocumentClick);
    }

    if (this.closeOnEscapeKey) {
      this.keyupListener = this.renderer.listen('document', 'keyup', this.onDocumentKeydown);
    }
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
    if (this.keyupListener) {
      this.keyupListener();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.scrollEvent.emit(scrollPosition);
  }

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.element.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  };

  private onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.escapeKey.emit();
    }
    if (event.key === 'Enter' && this.element.nativeElement.contains(event.target)) {
      this.enterKey.emit();
    }
  };

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
