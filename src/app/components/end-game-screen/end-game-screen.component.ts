import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameStage, WINNER} from '../../models/game-controls';

@Component({
  selector: 'app-end-game-screen',
  templateUrl: './end-game-screen.component.html',
  styleUrls: ['./end-game-screen.component.scss']
})
export class EndGameScreenComponent implements OnInit, OnChanges {

  @Input() playerName: string;
  @Input() gameStage: GameStage;
  @Input() winner: WINNER;

  constructor() { }

  ngOnInit() {
    this.playerName = 'enter name';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.winner) {
      this.playerName = 'enter name';
    }
  }

  get isGameFinish(): boolean {
    return this.gameStage === GameStage.END_GAME;
  }

  get isComputerWin(): boolean {
    return this.winner === WINNER.COMPUTER;
  }

}
