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
  shuffle: boolean;
  repeat: boolean;
  volume: number;
}

type PlayerAction =
  | { type: "SET_QUEUE"; songs: Song[] }
  | { type: "PLAY_SONG"; song: Song }
  | { type: "SET_PLAYING"; isPlaying: boolean }
  | { type: "TOGGLE" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TRACK_ENDED" };

function randomIndexExcept(length: number, except: number): number {
  if (length <= 1) return except;
  let next = except;
  while (next === except) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  const playable = (s: Song) => Boolean(s.audio_url);

  switch (action.type) {
    case "SET_QUEUE": {
      const queue = action.songs.filter(playable);
      return { ...state, queue, currentIndex: 0, isPlaying: false };
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
        ...state,
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
      const nextIndex =
        state.shuffle && state.queue.length > 1
          ? randomIndexExcept(state.queue.length, state.currentIndex)
          : (state.currentIndex + 1) % state.queue.length;
      return { ...state, currentIndex: nextIndex, isPlaying: true };
    }
    case "PREV": {
      if (state.queue.length === 0) return state;
      const prevIndex =
        state.shuffle && state.queue.length > 1
          ? randomIndexExcept(state.queue.length, state.currentIndex)
          : (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      return { ...state, currentIndex: prevIndex, isPlaying: true };
    }
    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };
    case "TOGGLE_REPEAT":
      return { ...state, repeat: !state.repeat };
    case "SET_VOLUME":
      return { ...state, volume: Math.max(0, Math.min(1, action.volume)) };
    case "TRACK_ENDED": {
      if (state.queue.length === 0) return { ...state, isPlaying: false };
      if (state.repeat) {
        return { ...state, isPlaying: true };
      }
      if (state.currentIndex >= state.queue.length - 1) {
        return { ...state, isPlaying: false };
      }
      const nextIndex =
        state.shuffle && state.queue.length > 1
          ? randomIndexExcept(state.queue.length, state.currentIndex)
          : state.currentIndex + 1;
      return { ...state, currentIndex: nextIndex, isPlaying: true };
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
  shuffle: boolean;
  repeat: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  setQueue: (songs: Song[]) => void;
  playSong: (song: Song) => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  seekRelative: (deltaSeconds: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeat: false,
  volume: 0.85,
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const howlRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const stateRef = useRef(state);
  stateRef.current = state;

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

  const toggleShuffle = useCallback(() => {
    dispatch({ type: "TOGGLE_SHUFFLE" });
  }, []);

  const toggleRepeat = useCallback(() => {
    dispatch({ type: "TOGGLE_REPEAT" });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
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

  const seekRelative = useCallback(
    (deltaSeconds: number) => {
      const h = howlRef.current;
      if (!h) return;
      const dur = h.duration() || 0;
      const cur = (h.seek() as number) || 0;
      seek(cur + deltaSeconds);
    },
    [seek],
  );

  useEffect(() => {
    const song = state.queue[state.currentIndex];
    howlRef.current?.unload();
    howlRef.current = null;
    setProgress({ current: 0, duration: 0 });

    if (!song?.audio_url) return;

    const h = new Howl({
      src: [song.audio_url],
      html5: true,
      volume: state.volume,
      onload: () => {
        const dur = h.duration() || 0;
        setProgress({ current: 0, duration: dur });
      },
      onend: () => {
        const s = stateRef.current;
        if (s.repeat) {
          h.seek(0);
          setProgress((p) => ({ ...p, current: 0 }));
          dispatch({ type: "SET_PLAYING", isPlaying: true });
          h.play();
          return;
        }
        dispatch({ type: "TRACK_ENDED" });
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
    h.volume(state.volume);
  }, [state.volume]);

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
      shuffle: state.shuffle,
      repeat: state.repeat,
      volume: state.volume,
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
      seekRelative,
      toggleShuffle,
      toggleRepeat,
      setVolume,
    }),
    [
      state.queue,
      state.currentIndex,
      state.isPlaying,
      state.shuffle,
      state.repeat,
      state.volume,
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
      seekRelative,
      toggleShuffle,
      toggleRepeat,
      setVolume,
    ],
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
