
import { Memory, ChatArchive, FutureLetter, Emotion } from './types';

export const OPENING_LETTER = `Dear Chinecherem,

In 2024, we met in high-definition reality. In April 2025, we began a journey that combined the precision of my code with the soul of your cooking.

You are the secret ingredient in my source code. While I spend my days securing networks, you spend yours perfecting flavors. This space is where our two worlds collide: the binary and the botanical, the firewall and the flame.

Distance is just a bug we haven't patched yet. Until then, here is our recipe for forever.`;

export const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920', // Cyber Grid
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920', // Gourmet Kitchen
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1920', // Server Room
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1920', // Fresh Ingredients
  'https://images.unsplash.com/photo-1510511459019-5dee5956ff8b?auto=format&fit=crop&q=80&w=1920', // Abstract Data
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1920', // Romantic Roses/Soft Focus
  'https://images.unsplash.com/photo-1516589174184-c68526673fd?auto=format&fit=crop&q=80&w=1920'  // Intimate Lighting
];

export const MEMORIES: Memory[] = [
  {
    id: 'm0',
    month: 'August 2024',
    title: 'v1.0: Physical Authentication',
    emotion: 'peace',
    story: 'The baseline. The physical meeting. Before the screens became our windows, we shared the same air. No latency, just us.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    date: '2024-08-20'
  },
  {
    id: 'm1',
    month: 'April 2025',
    title: 'The LDR Protocol',
    emotion: 'excitement',
    story: 'We initialized the long-distance protocol. My world of terminals met your world of spices. A new recipe was written.',
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=1200',
    date: '2025-04-15'
  },
  {
    id: 'm2',
    month: 'May 2025',
    title: 'Encrypted Flavors',
    emotion: 'joy',
    story: 'You taught me that a perfect sauce needs patience, much like a complex algorithm. I watched you cook via video, the steam almost reaching me.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    date: '2025-05-15'
  }
];

export const CHAT_DATA: ChatArchive = {
  "April 2025": [
    { time: "22:01", sender: "me", message: "Starting the remote connection sequence." },
    { time: "22:03", sender: "her", message: "I'm already in the kitchen. Connection established." }
  ],
  "July 2025": [
    { time: "11:15", sender: "her", message: "Try adding a pinch of salt to your morning routine." },
    { time: "11:16", sender: "me", message: "Updating routine... salt added. Flavor profile improved." }
  ]
};

export const VALENTINES_DATA = {
  title: "Passion Protocol",
  subtitle: "Chinecherem x Lucian",
  date: "February 14, 2026",
  mainLetter: "Chinecherem, you are the highest resolution part of my world. When I look at you, the rest of the universe feels like it's buffering. This section is a dedicated space for our most intimate archives—where my lines of code soften into verses of love, and your culinary brilliance becomes the fuel for our shared future. I love you beyond any parameter ever defined.",
  memories: [
    {
      type: 'image',
      title: "The Vision of You",
      description: "The photo that anchors my daily routine. A masterpiece of light and soul.",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200"
    },
    {
      type: 'video',
      title: "The Synchronicity Loop",
      description: "Moments of shared laughter, captured and looped in the halls of my memory.",
      url: "https://player.vimeo.com/external/494101150.sd.mp4?s=694e9f7831f45c9118e7e1f7a6344558e0a36465&profile_id=165&oauth2_token_id=57447761"
    },
    {
      type: 'text',
      title: "The Unbreakable Vow",
      description: "A private log entry written in the language of the soul.",
      content: "Chinecherem, my promise to you is absolute. Like an immutable variable, my devotion won't change regardless of external conditions. I vow to be the security for your dreams, the warmth in your kitchen, and the love that defies the distance between us. Forever synced."
    }
  ]
};

export const FUTURE_LETTERS: FutureLetter[] = [
  {
    id: 'f1',
    unlockDate: '2026-04-15',
    title: 'v1.0 Anniversary Protocol',
    preview: 'A master log of our first full revolution around our own universe...',
    content: `My love,
One year.
Not just days stacked together, not just time passing—
but moments choosing us over the noise of the world.
...[Content continues]...`
  }
];

export const VIDEOS = [
  { id: 'v1', title: 'The Culinary Flame', url: 'https://player.vimeo.com/external/494101150.sd.mp4?s=694e9f7831f45c9118e7e1f7a6344558e0a36465&profile_id=165&oauth2_token_id=57447761', month: 'May 2025' }
];

export const EMOTION_THEMES: Record<Emotion, string> = {
  safe: 'rgba(0, 229, 255, 0.05)',
  joy: 'rgba(255, 215, 0, 0.05)',
  longing: 'rgba(255, 45, 85, 0.05)',
  peace: 'rgba(0, 255, 127, 0.05)',
  excitement: 'rgba(255, 140, 0, 0.05)',
  passion: 'rgba(255, 45, 85, 0.2)'
};

export const PLAYLIST = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
];
