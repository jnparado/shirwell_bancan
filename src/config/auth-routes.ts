/** Public sign-in page (share this link). */
export const LOGIN_PATH = "/login";

export type LoginUrlOptions = {
  redirect?: string;
  mode?: "signup";
};

export function loginUrl(options?: LoginUrlOptions): string {
  const params = new URLSearchParams();
  if (options?.redirect) params.set("redirect", options.redirect);
  if (options?.mode === "signup") params.set("mode", "signup");
  const query = params.toString();
  return query ? `${LOGIN_PATH}?${query}` : LOGIN_PATH;
}
