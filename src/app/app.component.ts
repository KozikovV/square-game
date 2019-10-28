import {Component, ViewChild} from '@angular/core';
import {GameStage, PlayGameInterface, WINNER} from './models/game-controls';
import {ModeInterface} from './models/game-settings.interface';
import {BtnPanelComponent} from './components/btn-pannel/btn-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(BtnPanelComponent, {static: true}) private btnPanel: BtnPanelComponent;

  gameStage: GameStage;
  playerName: string;
  gameMode: ModeInterface;
  winner: WINNER;

  constructor() {
    this.gameStage = GameStage.START_GAME;
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
    this.btnPanel.setNewGame(this.playerName);
  }
}
