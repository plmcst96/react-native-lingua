import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

// The user id always comes from the verified Clerk session, never from the request body.
export async function getSignedInUserId(request: Request): Promise<string | null> {
  const state = await clerk.authenticateRequest(request, { acceptsToken: "session_token" });
  return state.isAuthenticated ? state.toAuth().userId : null;
}

export async function getClerkProfile(userId: string) {
  const user = await clerk.users.getUser(userId);
  return {
    name: user.fullName ?? user.username ?? "Learner",
    image: user.imageUrl,
  };
}
