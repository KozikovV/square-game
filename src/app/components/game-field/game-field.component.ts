import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {ModeInterface} from '../../models/game-settings.interface';
import {interval, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {GameSquareComponent} from '../game-square/game-square.component';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, OnChanges {

  @Input() gameMode: ModeInterface;
  @ViewChildren(GameSquareComponent) gameSquareList: QueryList<GameSquareComponent>;

  gameField: any[];
  private notUsedSquares: any[];

  constructor() {
    this.gameField = [];
    this.notUsedSquares = [];
  }

  ngOnInit() {
    //Todo remove
    this.gameMode = {delay: 1000, field: 10};

    this.createGameField();
    this.timer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameMode && !changes.gameMode.isFirstChange()) {
      this.clearGameField();
      this.createGameField();
    }
  }

  get gameDelay(): number {
    return this.gameMode.delay;
  }

  get fieldSize(): number {
    return this.gameMode.field;
  }

  private createGameField(): void {
    for (let i = 0; i < Math.pow(this.fieldSize, 2); i++) {
      this.createSquare(i);
    }
  }

  private createSquare(id: number): void {
    const squareId = `sqr${id}`;
    this.gameField.push({squareId});
  }

  get gridTemplate(): string {
    return `repeat(${this.fieldSize}, ${450 / this.fieldSize}px)`;
  }

  private clearGameField(): void {
    this.gameField = [];
    this.notUsedSquares = [];
  }

  private timer(): void {
    interval(100)
      .pipe(take(this.gameDelay / 100))
      .subscribe(value => console.log((value + 1) * 100));
  }

}
