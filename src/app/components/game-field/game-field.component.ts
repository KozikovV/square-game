import {AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {ModeInterface} from '../../models/game-settings.interface';
import {GameSquareComponent, SquareColor, SquareState} from '../game-square/game-square.component';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

export interface GameFieldInterface {
  squareId: string;
}

export enum WINNER {
  COMPUTER,
  PLAYER
}

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() gameMode: ModeInterface;
  @ViewChildren(GameSquareComponent) gameSquareList: QueryList<GameSquareComponent>;

  gameField: GameFieldInterface[];
  private notUsedSquares: GameFieldInterface[];
  private computersSquares: GameSquareComponent[];
  private playersSquares: GameSquareComponent[];

  constructor() {
    this.gameField = [];
    this.notUsedSquares = [];
    this.computersSquares = [];
    this.playersSquares = [];
  }

  ngOnInit() {
    this.gameMode = {delay: 2000, field: 5};
    this.createGameField();
  }

  ngAfterViewInit(): void {
    interval(1000)
      .pipe(take(3))
      .subscribe((value => {
        if (value === 2 ) {
          this.nextRound();
        }
      }));
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
    this.notUsedSquares = this.gameField;
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

  private chooseRandomSquare(): GameFieldInterface {
    const randomSquareIndex = Math.floor(Math.random() * this.notUsedSquares.length);
    return this.notUsedSquares.find((square: GameFieldInterface, index) => index === randomSquareIndex);
  }

  onSquareFiled(squareId: string): void {
    this.notUsedSquares = this.notUsedSquares.filter((gameField: GameFieldInterface) => gameField.squareId !== squareId);
    this.writeFilledSquares(squareId);
    if (this.endgame) {
      alert('game over');
      return;
    }
    this.nextRound();
  }

  private writeFilledSquares(squareId: string): void {
    this.gameSquareList.forEach((item: GameSquareComponent) => {
      if (item.squareId === squareId) {
        switch (item.squareColor) {
          case SquareColor.GREEN:
            this.playersSquares.push(item);
            break;
          case SquareColor.RED:
            this.computersSquares.push(item);
            break;
        }
      }
    });
  }

  private get calculateHalfField(): number {
    return Math.ceil(this.gameField.length / 2);
  }

  private get endgame(): boolean {
    return [this.computersSquares, this.playersSquares].some((squaresList: GameSquareComponent[]) => squaresList.length === this.calculateHalfField);
  }

  private nextRound(): void {
    const squareId = this.chooseRandomSquare().squareId;
    this.gameSquareList.find((square: GameSquareComponent) => square.squareId === squareId).startSquareTimer();
  }

}
