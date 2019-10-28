import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {GameSettingsInterface, ModeInterface} from '../../models/game-settings.interface';
import {GameStorageService} from '../../services/game-storage.service';
import {PlayGameInterface} from '../../models/game-controls';

@Component({
  selector: 'app-btn-panel',
  templateUrl: './btn-panel.component.html',
  styleUrls: ['./btn-panel.component.scss']
})
export class BtnPanelComponent {

  @Output() private playGame: EventEmitter<PlayGameInterface> = new EventEmitter<PlayGameInterface>();

  readonly gameSettings$: Observable<GameSettingsInterface>;
  private gameMode: ModeInterface;
  playerName: string;
  showWarning: boolean;
  btnTitle: string;


  constructor(
    private gameService: GameStorageService
  ) {
    this.gameSettings$ = this.gameService.getGameSettings();
    this.showWarning = false;
    this.btnTitle = 'Play';
  }

  setGameMode(gameMode: ModeInterface) {
    this.gameMode = gameMode;
    this.showWarning = false;
  }

  startGame(playerName: string): void {
    if (!this.gameMode) {
      this.showWarning = true;
      return;
    }
    this.playGame.emit({playerName, gameMode: this.gameMode});
    this.playerName = '';
    this.gameMode = null;
    this.showWarning = false;
  }

  setNewGame(playerName: string): void {
    this.btnTitle = 'Play again';
    this.playerName = playerName;
  }

}
