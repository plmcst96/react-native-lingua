import { useAuth, useUser } from "@clerk/expo";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
import { type PropsWithChildren, useEffect, useState } from "react";

import { fetchStreamToken } from "@/lib/stream";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

// One Stream client for the whole signed-in session, so screens never reconnect it.
export default function StreamVideoProvider({ children }: PropsWithChildren) {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [client, setClient] = useState<StreamVideoClient>();

  const userId = user?.id;
  const userName = user?.fullName ?? user?.username ?? "Learner";
  const userImage = user?.imageUrl;

  useEffect(() => {
    if (!apiKey || !userId) {
      return;
    }

    const videoClient = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: { id: userId, name: userName, image: userImage },
      tokenProvider: () => fetchStreamToken(getToken),
    });
    // Stream's recommended lifecycle: create in an effect, disconnect in its cleanup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClient(videoClient);

    return () => {
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
