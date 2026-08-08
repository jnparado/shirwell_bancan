/** Public sign-in page (share this link). */
export const LOGIN_PATH = "/login";

/** Public sign-up page. */
export const SIGNUP_PATH = "/signup";

export type AuthUrlOptions = {
  redirect?: string;
};

/** @deprecated Prefer `signupUrl()` for sign-up links. */
export type LoginUrlOptions = AuthUrlOptions & {
  mode?: "signup";
};

export function loginUrl(options?: LoginUrlOptions): string {
  if (options?.mode === "signup") {
    return signupUrl({ redirect: options.redirect });
  }
  const params = new URLSearchParams();
  if (options?.redirect) params.set("redirect", options.redirect);
  const query = params.toString();
  return query ? `${LOGIN_PATH}?${query}` : LOGIN_PATH;
}

export function signupUrl(options?: AuthUrlOptions): string {
  const params = new URLSearchParams();
  if (options?.redirect) params.set("redirect", options.redirect);
  const query = params.toString();
  return query ? `${SIGNUP_PATH}?${query}` : SIGNUP_PATH;
}
