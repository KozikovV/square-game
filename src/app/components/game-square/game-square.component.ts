import {Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';

export enum SquareState {
  FILED,
  ACTIVE,
  WAIT
}

export enum SquareColor {
  GREEN = '#0bff0c',
  BLUE = '#0668ff',
  RED = '#ff2118',
  WHITE = '#fff'
}

@Component({
  selector: 'app-game-square',
  templateUrl: './game-square.component.html',
  styleUrls: ['./game-square.component.scss']
})
export class GameSquareComponent implements OnDestroy {

  squareState: SquareState;
  squareColor: SquareColor;
  private squareOpacity: number;

  private readonly destroy$: Subject<void> = new Subject<void>();

  @Input() squareId: string;
  @Input() gameDelay: number;
  @Output() squareFiled: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click') onSquareClick(): void {
    if (this.squareState === SquareState.ACTIVE) {
      this.filedSquare(SquareColor.GREEN);
    }
  }

  @HostBinding('style.backgroundColor') get squareBackgroundColor(): string {
    return this.squareColor;
  }

  @HostBinding('style.opacity') get squareStyleOpacity(): number {
    return this.squareOpacity;
  }

  constructor() {
    this.squareState = SquareState.WAIT;
    this.squareColor = SquareColor.WHITE;
    this.squareOpacity = 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startSquareTimer(): void {
    this.setSquareToActiveState();
    interval(100)
      .pipe(
        take(this.counter),
        filter(() => this.squareState === SquareState.ACTIVE),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.squareOpacity += this.opacityPart;
        if (((value + 1) * 100) === this.gameDelay) {
          this.filedSquare(SquareColor.RED);
        }
      });
  }

  private setSquareToActiveState(): void {
    this.squareColor = SquareColor.BLUE;
    this.squareState = SquareState.ACTIVE;
  }

  private filedSquare(color: SquareColor): void {
    this.squareColor = color;
    this.squareState = SquareState.FILED;
    this.squareOpacity = 1;
    this.squareFiled.emit();
  }

  private get counter(): number {
    return this.gameDelay / 100;
  }

  private get opacityPart(): number {
    return 1 / this.counter;
  }

}
