import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ModeInterface} from '../../models/game-settings.interface';
import {GameSquareComponent, SquareColor, SquareState} from '../game-square/game-square.component';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {WINNER} from '../../models/game-controls';

export interface GameFieldInterface {
  squareId: string;
}

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() gameMode: ModeInterface;
  @Output() gameFinished: EventEmitter<WINNER> = new EventEmitter<WINNER>();
  @ViewChildren(GameSquareComponent) gameSquareList: QueryList<GameSquareComponent>;

  gameField: GameFieldInterface[];

  counter: number;

  constructor() {
    this.gameField = [];
    this.counter = 0;
  }

  ngOnInit() {
    this.createGameField();
  }

  ngAfterViewInit(): void {
    interval(1000)
      .pipe(take(4))
      .subscribe(
        () => this.counter++,
        () => {},
        () => {
          this.counter = 0;
          this.nextRound();
        }
      );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameMode && !changes.gameMode.isFirstChange()) {
      this.clearGameField();
      this.createGameField();
      this.ngAfterViewInit();
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
  }

  private chooseRandomSquare(): GameFieldInterface {
    const randomSquareIndex = Math.floor(Math.random() * this.emptySquares.length);
    return this.emptySquares.find((square: GameFieldInterface, index) => index === randomSquareIndex);
  }

  onSquareFiled(): void {
    this.endgame ? this.onFinishGame() : this.nextRound();
  }

  private get emptySquares(): GameSquareComponent[] {
    return this.gameSquareList.filter((item: GameSquareComponent) => item.squareState === SquareState.WAIT);
  }

  private get calculateHalfField(): number {
    return Math.ceil(this.gameField.length / 2);
  }

  private get endgame(): boolean {
    return [this.computersSquares, this.playersSquares].some((squaresList: GameSquareComponent[]) => squaresList.length === this.calculateHalfField);
  }

  private get isComputerWin(): boolean {
    return this.computersSquares.length === this.calculateHalfField;
  }

  private get computersSquares(): GameSquareComponent[] {
    return this.gameSquareList.filter((item: GameSquareComponent) => item.squareColor === SquareColor.RED);
  }

  private get playersSquares(): GameSquareComponent[] {
    return this.gameSquareList.filter((item: GameSquareComponent) => item.squareColor === SquareColor.GREEN);
  }

  private nextRound(): void {
    const squareId = this.chooseRandomSquare().squareId;
    this.gameSquareList.find((square: GameSquareComponent) => square.squareId === squareId).startSquareTimer();
  }

  private onFinishGame(): void {
    this.isComputerWin ? this.gameFinished.emit(WINNER.COMPUTER) : this.gameFinished.emit(WINNER.PLAYER);
  }

}
