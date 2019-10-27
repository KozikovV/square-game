import {Component, OnInit} from '@angular/core';
import {GameStage, PlayGameInterface} from './models/game-controls';
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
}
