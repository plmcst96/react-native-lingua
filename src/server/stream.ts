import { StreamClient } from "@stream-io/node-sdk";

export const LESSON_CALL_TYPE = "audio_room";

let streamClient: StreamClient | undefined;

export function getStreamClient() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Add STREAM_API_KEY and STREAM_API_SECRET to your .env file");
  }

  streamClient ??= new StreamClient(apiKey, apiSecret);
  return streamClient;
}

export async function isLessonCallOwner(callId: string, userId: string) {
  const { call } = await getStreamClient().video.call(LESSON_CALL_TYPE, callId).get();
  return call.created_by.id === userId;
}
