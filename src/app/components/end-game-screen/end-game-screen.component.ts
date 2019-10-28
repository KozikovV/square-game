import {Component, Input, OnInit} from '@angular/core';
import {GameStage, WINNER} from '../../models/game-controls';

@Component({
  selector: 'app-end-game-screen',
  templateUrl: './end-game-screen.component.html',
  styleUrls: ['./end-game-screen.component.scss']
})
export class EndGameScreenComponent implements OnInit {

  @Input() playerName: string;
  @Input() gameStage: GameStage;
  @Input() winner: WINNER;

  constructor() { }

  ngOnInit() {
    this.playerName = 'enter name';
  }

  get isGameFinish(): boolean {
    return this.gameStage === GameStage.END_GAME;
  }

  get isComputerWin(): boolean {
    return this.winner === WINNER.COMPUTER;
  }

}
