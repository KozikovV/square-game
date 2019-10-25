export interface GameSettingsInterface {
  easyMode: ModeInterface;
  normalMode: ModeInterface;
  hardMode: ModeInterface;
}

export interface ModeInterface {
  delay: number;
  field: number;
}

export interface LeaderBoardInterface {
  date: string;
  id: number;
  winner: string;
}
