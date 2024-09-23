import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true,
})
export class OutsideClickDirective implements OnInit, OnDestroy {
  @Input() appOutsideClick!: boolean;
  @Output() outSideClick: EventEmitter<void> = new EventEmitter();
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private listener: (() => void) | undefined;

  onDocumentClick = (event: Event) => {
    if (!this.element.nativeElement.parentElement.contains(event.target)) {
      this.outSideClick.emit();
    }
  };

  ngOnInit(): void {
    this.listener = this.renderer.listen(
      'document',
      'click',
      this.onDocumentClick
    );
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }
}
