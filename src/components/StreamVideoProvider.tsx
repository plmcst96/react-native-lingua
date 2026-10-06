import { useUser } from "@clerk/expo";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
import { type PropsWithChildren, useEffect, useState } from "react";

import { useSessionToken } from "@/hooks/useSessionToken";
import { fetchStreamToken } from "@/lib/stream";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const RECONNECT_DELAY_MS = 5_000;

// One Stream client for the whole signed-in session, so screens never reconnect it.
export default function StreamVideoProvider({ children }: PropsWithChildren) {
  const getToken = useSessionToken();
  const { user } = useUser();
  const [client, setClient] = useState<StreamVideoClient>();

  const userId = user?.id;
  const userName = user?.fullName ?? user?.username ?? "Learner";
  const userImage = user?.imageUrl;

  useEffect(() => {
    if (!apiKey || !userId) {
      return;
    }

    const user = { id: userId, name: userName, image: userImage };
    const tokenProvider = () => fetchStreamToken(getToken);
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    // Not getOrCreateInstance: after a remount it returns the cached client that the previous
    // cleanup is still disconnecting, which leaves us with a client that has no token.
    const videoClient = new StreamVideoClient({
      apiKey,
      user,
      tokenProvider,
      options: {
        // After its own retries fail, the client drops the token for good, so keep reconnecting.
        onConnectUserError: () => {
          retryTimeout = setTimeout(() => {
            videoClient
              .connectUser(user, tokenProvider)
              .catch((error) => console.error("[Stream] Reconnect failed", error));
          }, RECONNECT_DELAY_MS);
        },
      },
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClient(videoClient);

    return () => {
      clearTimeout(retryTimeout);
      videoClient.disconnectUser().catch((error) => console.error("[Stream] Disconnect failed", error));
      setClient(undefined);
    };
  }, [getToken, userId, userName, userImage]);

  // Without a key the app still works; the lesson screen shows the setup error.
  if (!apiKey) {
    return children;
  }

  if (!client) {
    return null;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
