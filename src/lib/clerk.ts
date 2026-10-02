import { isClerkAPIResponseError } from "@clerk/expo";

// Prints the full Clerk error to the console for developers.
// Users only ever see a short, friendly message chosen by the screen.
export function logClerkError(context: string, error: unknown) {
  console.error(`[Clerk] ${context}`, error);

  // API errors keep the useful details (code, longMessage, meta) in `errors`.
  if (isClerkAPIResponseError(error)) {
    console.error(`[Clerk] ${context} details`, JSON.stringify(error.errors, null, 2));
  }
}

// Native Google / Apple sheets and the SSO browser throw these codes when the user closes them.
const CANCEL_CODES = ["SIGN_IN_CANCELLED", "-5", "ERR_REQUEST_CANCELED", "ERR_CANCELED"];

export function isCancelledError(error: unknown): boolean {
  if (error && typeof error === "object" && "code" in error) {
    return CANCEL_CODES.includes(String(error.code));
  }
  return false;
}
