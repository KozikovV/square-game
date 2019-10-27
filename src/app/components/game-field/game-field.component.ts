import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModeInterface} from '../../models/game-settings.interface';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, OnChanges {

  @Input() gameMode: ModeInterface;

  gameField: any[];
  private notUsedSquares: any[];

  constructor() {
    this.gameField = [];
    this.notUsedSquares = [];
  }

  ngOnInit() {
    //Todo remove
    this.gameMode = {delay: 2000, field: 10};

    this.createGameField();
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
    return `repeat(${this.fieldSize}, minmax(50px, 1fr))`;
  }

  private clearGameField(): void {
    this.gameField = [];
    this.notUsedSquares = [];
  }

}
