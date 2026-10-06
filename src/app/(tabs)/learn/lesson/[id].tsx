import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LessonCompleteModal from "@/components/LessonCompleteModal";
import MicButton, { type MicState } from "@/components/MicButton";
import { images } from "@/constants/images";
import { ratingColorClassNames, scoreLabels } from "@/constants/ratings";
import { getLanguageByCode } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLessonAnalytics } from "@/hooks/useLessonAnalytics";
import { type LessonCallStatus, useLessonCall } from "@/hooks/useLessonCall";
import { useLessonCompletion } from "@/hooks/useLessonCompletion";
import { useLiveCaptions } from "@/hooks/useLiveCaptions";
import { type TeacherAgentStatus, useTeacherAgent } from "@/hooks/useTeacherAgent";
import { useLanguageStore } from "@/store/useLanguageStore";

type StageNotice = {
  kind: "loading" | "error" | "ended";
  message?: string;
  action?: { label: string; onPress: () => void };
};

const callStatusDisplay: Record<LessonCallStatus, { label: string; dotClassName: string }> = {
  loading: { label: "Starting…", dotClassName: "bg-warning" },
  connecting: { label: "Connecting…", dotClassName: "bg-warning" },
  joined: { label: "Online", dotClassName: "bg-success" },
  error: { label: "Connection failed", dotClassName: "bg-error" },
  ended: { label: "Call ended", dotClassName: "bg-text-secondary" },
};

const teacherStatusDisplay: Record<TeacherAgentStatus, { label: string; dotClassName: string }> = {
  idle: { label: "Getting ready…", dotClassName: "bg-warning" },
  connecting: { label: "Teacher joining…", dotClassName: "bg-warning" },
  connected: { label: "Online", dotClassName: "bg-success" },
  failed: { label: "Teacher offline", dotClassName: "bg-error" },
};

const MAX_CAPTION_CHARS = 140;

// Keeps the newest words visible while someone is still talking.
function getCaptionTail(text: string) {
  return text.length > MAX_CAPTION_CHARS ? `…${text.slice(-MAX_CAPTION_CHARS)}` : text;
}

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  const lesson = getLessonById(id);
  const {
    call,
    status,
    isLive,
    errorMessage,
    isMicOn,
    isUserSpeaking,
    toggleMic,
    endCall,
    restartCall,
  } = useLessonCall(lesson?.id, selectedLanguage);
  const {
    status: teacherStatus,
    isSpeaking: isTeacherSpeaking,
    stopAgent,
    retryAgent,
  } = useTeacherAgent(call, isLive);
  const caption = useLiveCaptions(call);
  const scores = useLessonCompletion(call, lesson?.id, lesson?.xp ?? 0);
  useLessonAnalytics(lesson, caption, scores !== undefined);

  if (!lesson) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="h-11 flex-row items-center px-4">
          <TouchableOpacity hitSlop={10} onPress={() => router.back()} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={28} color="#0d132b" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="heading--h4">Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const language = getLanguageByCode(lesson.languageCode);
  const unit = getUnitById(lesson.unitId);
  const isMuted = status === "joined" && !isMicOn;
  const headerStatus = isMuted
    ? { label: "Mic muted", dotClassName: "bg-text-secondary" }
    : status === "joined"
      ? teacherStatusDisplay[teacherStatus]
      : callStatusDisplay[status];
  const stageNotice = getStageNotice();
  const userLabel = user?.firstName ?? user?.username ?? "You";
  const isStudentSpeaking = !stageNotice && caption?.speaker === "student";
  const speakerName = isStudentSpeaking ? userLabel : "Lingo";

  function getMicState(): MicState {
    if (!isMicOn) return "muted";
    // The teacher's voice can leak into the learner's mic, so the teacher takes priority.
    if (isTeacherSpeaking) return "teacher-speaking";
    return isUserSpeaking ? "listening" : "ready";
  }

  function getStageNotice(): StageNotice | undefined {
    switch (status) {
      case "loading":
        return { kind: "loading", message: "Starting your lesson call…" };
      case "connecting":
        return { kind: "loading", message: "Connecting to your teacher…" };
      case "error":
        return {
          kind: "error",
          message: errorMessage,
          action: { label: "Try again", onPress: restartCall },
        };
      case "ended":
        return {
          kind: "ended",
          message: "The lesson call has ended.",
          action: { label: "Start again", onPress: restartCall },
        };
    }
    if (teacherStatus === "failed") {
      return {
        kind: "error",
        message: "Your teacher couldn't join.",
        action: { label: "Try again", onPress: retryAgent },
      };
    }
    if (teacherStatus !== "connected") {
      return { kind: "loading", message: "Lingo is joining your lesson…" };
    }
    return undefined;
  }

  // Before the call exists or after it's over, End Call just leaves the screen.
  function handleEndCall() {
    if (status === "joined" || status === "connecting") {
      stopAgent();
      endCall();
    } else {
      router.back();
    }
  }

  // The progress is already saved, so the learner can leave as soon as they've seen the result.
  function finishLesson() {
    if (status === "joined" || status === "connecting") {
      stopAgent();
      endCall();
    }
    router.back();
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pb-[18px] pt-[5px]">
        <TouchableOpacity hitSlop={10} onPress={() => router.back()} accessibilityLabel="Go back">
          <Ionicons name="chevron-back" size={28} color="#0d132b" />
        </TouchableOpacity>
        <View className="ml-[11px] flex-1">
          <Text className="heading--h3">AI Teacher</Text>
          <View className="mt-0.5 flex-row items-center">
            <View className={`size-2.5 rounded-full ${headerStatus.dotClassName}`} />
            <Text className="ml-1.5 font-poppins text-[15px] leading-6 text-text-secondary">
              {headerStatus.label}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleEndCall}
            accessibilityRole="button"
            accessibilityLabel="End call"
            className="audio-lesson__header-button audio-lesson__header-button--end"
          >
            <View className="rotate-[135deg]">
              <Ionicons name="call" size={18} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <View
            className="audio-lesson__header-button"
            accessibilityLabel={`${lesson.durationMinutes} minute lesson`}
          >
            <Text className="font-poppins-medium text-base text-text-primary">
              {lesson.durationMinutes}
            </Text>
          </View>
          <View className="audio-lesson__header-button">
            <Ionicons name="notifications-outline" size={20} color="#0d132b" />
          </View>
        </View>
      </View>
      <View className="audio-lesson__stage mx-0.5 flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.stageContent}
        >
          <View className="min-h-40 flex-1 items-center pt-4">
            <Image source={images.mascotWelcome} resizeMode="contain" className="h-full w-full" />
          </View>
          <View className="absolute left-3.5 right-3.5 top-3.5 items-start">
            <View className="audio-lesson__lesson-chip">
              {language && (
                <Image source={{ uri: language.flagUrl }} className="size-7 rounded-full" />
              )}
              <View className="ml-2 shrink">
                <Text
                  className="font-poppins-semibold text-[13px] leading-5 text-text-primary"
                  numberOfLines={1}
                >
                  {lesson.title}
                </Text>
                <Text className="caption" numberOfLines={1}>
                  {language?.name} • Unit {unit?.order}
                </Text>
              </View>
            </View>
          </View>
          {/* Once the teacher is connected, the bubble stays hidden until someone speaks. */}
          {(stageNotice || caption) && (
            <View className="mx-16 -mt-7">
              <View
                className={`absolute -bottom-2 right-6 size-5 rotate-45 rounded-[3px] ${isStudentSpeaking ? "bg-chat-student" : "bg-white"}`}
              />
              <View
                className={`audio-lesson__bubble ${isStudentSpeaking ? "audio-lesson__bubble--student" : ""}`}
              >
                {stageNotice ? (
                  <View className="flex-1 flex-row items-center" accessibilityLiveRegion="polite">
                    {stageNotice.kind === "loading" && (
                      <ActivityIndicator size="small" color="#5b3bf6" />
                    )}
                    {stageNotice.kind === "error" && (
                      <Ionicons name="alert-circle" size={22} color="#ff4d4f" />
                    )}
                    {stageNotice.kind === "ended" && (
                      <Ionicons name="call" size={20} color="#6b7280" />
                    )}
                    <View className="ml-3 flex-1">
                      <Text className="audio-lesson__caption">{stageNotice.message}</Text>
                      {stageNotice.action && (
                        <TouchableOpacity
                          hitSlop={8}
                          onPress={stageNotice.action.onPress}
                          className="mt-1 self-start"
                        >
                          <Text className="font-poppins-semibold text-[13px] leading-5 text-lingua-deep-purple">
                            {stageNotice.action.label}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : (
                  <>
                    <View className="flex-1">
                      <Text className="audio-lesson__speaker">{speakerName}</Text>
                      <Text className="audio-lesson__caption">
                        {getCaptionTail(caption?.text ?? "")}
                      </Text>
                    </View>
                    <View className="ml-3">
                      <Ionicons
                        name={isStudentSpeaking ? "mic" : "volume-high"}
                        size={24}
                        color="#5d5ff6"
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          )}
          <View className="mt-5 items-center">
            <MicButton state={getMicState()} onPress={toggleMic} />
          </View>
          <View className="audio-lesson__feedback mx-3.5 mt-5">
            {scoreLabels.map(({ key, label }, index) => (
              <Fragment key={key}>
                {index > 0 && <View className="my-[-6px] w-px bg-border" />}
                <View className="flex-auto gap-2.5 px-5">
                  <Text className="font-poppins-medium text-sm leading-[22px] text-text-primary">
                    {label}
                  </Text>
                  {/* Lingo grades the learner when the lesson is complete. */}
                  <Text
                    className={`font-poppins-medium text-sm leading-[22px] ${scores ? ratingColorClassNames[scores[key]] : "text-text-secondary"}`}
                  >
                    {scores ? scores[key] : "—"}
                  </Text>
                </View>
              </Fragment>
            ))}
          </View>
          <Text
            className="mx-6 mb-4 mt-3 text-center font-poppins text-[13px] leading-5 text-text-secondary"
            numberOfLines={2}
          >
            Goal: {lesson.goal}
          </Text>
        </ScrollView>
      </View>
      <LessonCompleteModal
        scores={scores}
        lessonTitle={lesson.title}
        xp={lesson.xp}
        onContinue={finishLesson}
      />
    </SafeAreaView>
  );
}

// flexGrow lets the mascot fill spare height, then the stage scrolls once content outgrows it.
const styles = StyleSheet.create({
  stageContent: {
    flexGrow: 1,
  },
});
