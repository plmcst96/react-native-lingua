import { useAuth } from "@clerk/expo";
import { useCallback, useEffect, useRef } from "react";

// @clerk/expo's useAuth returns a new getToken on every render, so effects that depend on it
// would re-run forever. This returns a stable function that always calls the latest getToken.
export function useSessionToken() {
  const { getToken } = useAuth();
  const getTokenRef = useRef(getToken);

  useEffect(() => {
    getTokenRef.current = getToken;
  });

  return useCallback(() => getTokenRef.current(), []);
}
