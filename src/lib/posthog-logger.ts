import { posthog } from "@/lib/posthog";

export const posthogLogger = {
  languageSelectionSaved(languageCode: string, isFirstSelection: boolean) {
    posthog?.logger.info("language selection saved", {
      language_code: languageCode,
      is_first_selection: isFirstSelection,
    });
  },

  lessonLaunchRequested(languageCode: string, lessonId: string | undefined, source: string) {
    posthog?.logger.info("lesson launch requested", {
      language_code: languageCode,
      lesson_id: lessonId,
      source,
    });
  },
};
