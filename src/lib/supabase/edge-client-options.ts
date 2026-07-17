/**
 * Supabase Realtime tries to resolve a WebSocket constructor when the client is
 * created. Vercel Edge middleware (and Node.js < 22) do not provide one, which
 * throws and surfaces as MIDDLEWARE_INVOCATION_FAILED on deploy.
 *
 * Auth + PostgREST do not need Realtime, so we supply a no-op transport.
 */
class EdgeStubWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  readonly binaryType = "blob";
  readonly bufferedAmount = 0;
  readonly extensions = "";
  readonly CONNECTING = 0;
  readonly OPEN = 1;
  readonly CLOSING = 2;
  readonly CLOSED = 3;

  readyState = 3;
  url = "";
  protocol = "";
  onopen: ((this: WebSocket, ev: Event) => unknown) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => unknown) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => unknown) | null = null;
  onerror: ((this: WebSocket, ev: Event) => unknown) | null = null;

  close() {}
  send() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
}

export const supabaseEdgeClientOptions = {
  realtime: {
    transport: EdgeStubWebSocket as unknown as typeof WebSocket,
  },
} as const;
