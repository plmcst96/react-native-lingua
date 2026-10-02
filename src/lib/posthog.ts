import PostHog from "posthog-react-native";

const projectToken = process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST;

if (__DEV__ && (!projectToken || !host)) {
  console.warn(
    "PostHog is disabled. Set EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN and EXPO_PUBLIC_POSTHOG_HOST to enable analytics.",
  );
}

export const posthog =
  projectToken && host
    ? new PostHog(projectToken, {
        host,
        logs: {
          serviceName: "duolingo-clone",
          environment: __DEV__ ? "development" : "production",
        },
        errorTracking: {
          autocapture: {
            uncaughtExceptions: true,
            unhandledRejections: true,
            console: [],
          },
        },
      })
    : undefined;
