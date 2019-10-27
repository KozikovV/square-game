import {ModeInterface} from './game-settings.interface';

export enum GameControls {
  START_GAME,
  GAME,
  END_GAME
}

export interface PlayGameInterface {
  playerName: string;
  gameMode: ModeInterface;
}

