import {Component, OnInit} from '@angular/core';
import {GameStage, PlayGameInterface, WINNER} from './models/game-controls';
import {ModeInterface} from './models/game-settings.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  gameStage: GameStage;
  playerName: string;
  gameMode: ModeInterface;
  winner: WINNER;

  constructor() {
    this.gameStage = GameStage.START_GAME;
  }

  ngOnInit(): void {

  }

  onGameStart(game: PlayGameInterface): void {
    this.playerName = game.playerName;
    this.gameMode = game.gameMode;
    this.gameStage = GameStage.GAME;
  }

  get isGameStart(): boolean {
    return this.gameStage === GameStage.GAME;
  }

  onFinishGame(winner: number): void {
    this.gameStage = GameStage.END_GAME;
    this.gameMode = null;
    this.winner = winner;
  }
}
