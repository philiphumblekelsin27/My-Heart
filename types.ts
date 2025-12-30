
export type Emotion = 'safe' | 'joy' | 'longing' | 'peace' | 'excitement' | 'passion';

export interface Memory {
  id: string;
  month: string;
  title: string;
  emotion: Emotion;
  story: string;
  imageUrl: string;
  date: string;
}

export interface ChatMessage {
  time: string;
  sender: 'me' | 'her';
  message: string;
}

export interface ChatArchive {
  [month: string]: ChatMessage[];
}

export interface FutureLetter {
  id: string;
  unlockDate: string; // ISO format
  title: string;
  preview: string;
  content: string;
}

export interface AppState {
  isAuthenticated: boolean;
  currentEmotion: Emotion;
}

export type TabId = 'origin' | 'memories' | 'kitchen' | 'chats' | 'valentines' | 'future';
