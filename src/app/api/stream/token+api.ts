import { getSignedInUserId } from "@/server/clerk";
import { getStreamClient } from "@/server/stream";

// Short-lived tokens; the Stream client asks for a new one through its tokenProvider.
const TOKEN_TTL_SECONDS = 60 * 60 * 4;

export async function GET(request: Request) {
  try {
    const userId = await getSignedInUserId(request);
    if (!userId) {
      return Response.json({ error: "You need to be signed in" }, { status: 401 });
    }

    const token = getStreamClient().generateUserToken({
      user_id: userId,
      validity_in_seconds: TOKEN_TTL_SECONDS,
    });

    return Response.json({ token });
  } catch (error) {
    console.error("[Stream] Token request failed", error);
    return Response.json({ error: "Could not create a Stream token" }, { status: 500 });
  }
}
