import { Redirect } from "expo-router";

// The app always opens on onboarding for now.
// Later (with Clerk) this is where we'll send signed-in users to the home tabs instead.
export default function Index() {
  return <Redirect href="/onboarding" />;
}
