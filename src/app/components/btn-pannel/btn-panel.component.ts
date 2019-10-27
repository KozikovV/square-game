import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
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
  playerName: string;
  private gameMode: ModeInterface;

  @ViewChild('playerNameInput', {static: true}) playerNameInput: HTMLInputElement;

  constructor(
    private gameService: GameStorageService
  ) {
    this.gameSettings$ = this.gameService.getGameSettings();
  }

  setSettings(gameMode: ModeInterface) {
    this.gameMode = gameMode;
  }

  startGame(playerName: string): void {
    this.playGame.emit({playerName, gameMode: this.gameMode});
    this.playerName = '';
    this.gameMode = null;
  }

}
