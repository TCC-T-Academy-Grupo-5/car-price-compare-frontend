import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[tccOutsideClick]',
  standalone: true
})
export class OutsideClickDirective implements OnInit, OnDestroy {
  @Input() tccOutsideClick!: boolean;
  @Output() outSideClick = new EventEmitter<void>();

  private clickListener: (() => void) | undefined;
  private keydownListener: (() => void) | undefined;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  onDocumentClick = (event: Event) => {
    if (!this.element.nativeElement.parentElement.contains(event.target)) {
      this.outSideClick.emit();
    }
  };

  onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.outSideClick.emit();
    }
  };

  ngOnInit(): void {
    this.clickListener = this.renderer.listen('document', 'click', this.onDocumentClick);
    this.keydownListener = this.renderer.listen('document', 'keydown', this.onDocumentKeydown);
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
    if (this.keydownListener) {
      this.keydownListener();
    }
  }
}
