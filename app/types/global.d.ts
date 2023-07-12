
// Copy of the type from the `expo-router` package.
export type Router = {
  /** Navigate to the provided href. */
  push: (href: Href) => void;
  /** Navigate to route without appending to the history. */
  replace: (href: Href) => void;
  /** Go back in the history. */
  back: () => void;
  /** Update the current route query params. */
  setParams: (params?: Record<string, string>) => void;
};

export type Card = {
  id: string;
  card_owner: string;
  card_number: string;
  exp: string;
  cvv: string;
  user_id: string;
  already_exists?: boolean;
}
