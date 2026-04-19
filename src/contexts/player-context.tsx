"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Howl } from "howler";
import type { Song } from "@/types/song";

interface PlayerState {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
}

type PlayerAction =
  | { type: "SET_QUEUE"; songs: Song[] }
  | { type: "PLAY_SONG"; song: Song }
  | { type: "SET_PLAYING"; isPlaying: boolean }
  | { type: "TOGGLE" }
  | { type: "NEXT" }
  | { type: "PREV" };

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  const playable = (s: Song) => Boolean(s.audio_url);

  switch (action.type) {
    case "SET_QUEUE": {
      const queue = action.songs.filter(playable);
      return { queue, currentIndex: 0, isPlaying: false };
    }
    case "PLAY_SONG": {
      const song = action.song;
      if (!playable(song)) return state;
      const idx = state.queue.findIndex((s) => s.id === song.id);
      if (idx >= 0) {
        return { ...state, currentIndex: idx, isPlaying: true };
      }
      const queue = [...state.queue, song];
      return {
        queue,
        currentIndex: queue.length - 1,
        isPlaying: true,
      };
    }
    case "SET_PLAYING": {
      if (state.queue.length === 0) return state;
      return { ...state, isPlaying: action.isPlaying };
    }
    case "TOGGLE": {
      if (state.queue.length === 0) return state;
      return { ...state, isPlaying: !state.isPlaying };
    }
    case "NEXT": {
      if (state.queue.length === 0) return state;
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.queue.length,
        isPlaying: true,
      };
    }
    case "PREV": {
      if (state.queue.length === 0) return state;
      return {
        ...state,
        currentIndex:
          (state.currentIndex - 1 + state.queue.length) % state.queue.length,
        isPlaying: true,
      };
    }
    default:
      return state;
  }
}

interface PlayerContextValue {
  queue: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  /** Playback position in seconds */
  currentTime: number;
  /** Track length in seconds (0 until loaded) */
  duration: number;
  setQueue: (songs: Song[]) => void;
  playSong: (song: Song) => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const howlRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });

  const currentSong = state.queue[state.currentIndex] ?? null;

  const setQueue = useCallback((songs: Song[]) => {
    dispatch({ type: "SET_QUEUE", songs });
  }, []);

  const playSong = useCallback((song: Song) => {
    dispatch({ type: "PLAY_SONG", song });
  }, []);

  const toggle = useCallback(() => {
    dispatch({ type: "TOGGLE" });
  }, []);

  const play = useCallback(() => {
    dispatch({ type: "SET_PLAYING", isPlaying: true });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: "SET_PLAYING", isPlaying: false });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: "NEXT" });
  }, []);

  const prev = useCallback(() => {
    dispatch({ type: "PREV" });
  }, []);

  const seek = useCallback((seconds: number) => {
    const h = howlRef.current;
    if (!h) return;
    const dur = h.duration() || 0;
    const t = Math.max(0, Math.min(seconds, dur > 0 ? dur : seconds));
    h.seek(t);
    setProgress((p) => ({
      current: t,
      duration: dur > 0 ? dur : p.duration,
    }));
  }, []);

  useEffect(() => {
    const song = state.queue[state.currentIndex];
    howlRef.current?.unload();
    howlRef.current = null;
    setProgress({ current: 0, duration: 0 });

    if (!song?.audio_url) return;

    const h = new Howl({
      src: [song.audio_url],
      html5: true,
      onload: () => {
        const dur = h.duration() || 0;
        setProgress({ current: 0, duration: dur });
      },
      onend: () => {
        dispatch({ type: "SET_PLAYING", isPlaying: false });
      },
      onloaderror: () => dispatch({ type: "SET_PLAYING", isPlaying: false }),
      onplayerror: () => dispatch({ type: "SET_PLAYING", isPlaying: false }),
    });
    howlRef.current = h;

    const id = window.setInterval(() => {
      const hh = howlRef.current;
      if (!hh) return;
      const dur = hh.duration() || 0;
      const cur = hh.seek() as number;
      setProgress({ current: cur, duration: dur });
    }, 200);

    return () => {
      clearInterval(id);
      h.unload();
      howlRef.current = null;
    };
  }, [state.queue, state.currentIndex]);

  useEffect(() => {
    const h = howlRef.current;
    if (!h) return;
    if (state.isPlaying) h.play();
    else h.pause();
  }, [state.isPlaying, state.currentIndex, state.queue]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      queue: state.queue,
      currentIndex: state.currentIndex,
      currentSong,
      isPlaying: state.isPlaying,
      currentTime: progress.current,
      duration: progress.duration,
      setQueue,
      playSong,
      toggle,
      play,
      pause,
      next,
      prev,
      seek,
    }),
    [
      state.queue,
      state.currentIndex,
      state.isPlaying,
      currentSong,
      progress.current,
      progress.duration,
      setQueue,
      playSong,
      toggle,
      play,
      pause,
      next,
      prev,
      seek,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
