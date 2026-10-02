import { getUnitsByLanguage } from "@/data/units";
import type { LanguageCode, Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageCode: "es",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Greet someone and tell them your name in Spanish.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "hola", translation: "hello" },
      { word: "buenos días", translation: "good morning" },
      { word: "me llamo", translation: "my name is" },
      { word: "mucho gusto", translation: "nice to meet you" },
    ],
    phrases: [
      { text: "Hola, ¿cómo estás?", translation: "Hi, how are you?" },
      { text: "¿Cómo te llamas?", translation: "What's your name?" },
      { text: "Me llamo Ana. Mucho gusto.", translation: "My name is Ana. Nice to meet you." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each greeting and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Meet a classmate",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "It's the first day of Spanish class and you're meeting a new classmate.",
      instructions:
        "Teach hola, buenos días, me llamo and mucho gusto. Have the student greet you and say their name.",
      openingLine: "Hi! Today we'll learn how to say hello in Spanish. Ready? Let's start with 'hola'.",
    },
  },
  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageCode: "es",
    order: 2,
    title: "Daily Life",
    goal: "Describe a few things you do every day.",
    durationMinutes: 6,
    xp: 15,
    vocabulary: [
      { word: "casa", translation: "house, home" },
      { word: "trabajo", translation: "work, job" },
      { word: "comer", translation: "to eat" },
      { word: "dormir", translation: "to sleep" },
    ],
    phrases: [
      { text: "Me levanto a las siete.", translation: "I get up at seven." },
      { text: "Trabajo en una oficina.", translation: "I work in an office." },
      { text: "Como en casa.", translation: "I eat at home." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Everyday words",
        instructions: "Learn words for home, work, eating and sleeping.",
      },
      {
        type: "listen-and-repeat",
        title: "My routine",
        instructions: "Repeat each sentence about a daily routine.",
      },
      {
        type: "conversation",
        title: "Tell me about your day",
        instructions: "Answer the teacher's questions about your day.",
      },
    ],
    aiTeacher: {
      scenario: "A friendly neighbor asks what a normal day looks like for you.",
      instructions:
        "Teach casa, trabajo, comer and dormir. Ask simple questions about the student's routine.",
      openingLine: "Hey there! Let's talk about your day in Spanish. First word: 'casa', which means home.",
    },
  },
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageCode: "es",
    order: 1,
    title: "Ordering a Coffee",
    goal: "Order a drink and ask for the bill at a café.",
    durationMinutes: 6,
    xp: 15,
    vocabulary: [
      { word: "café con leche", translation: "coffee with milk" },
      { word: "agua", translation: "water" },
      { word: "por favor", translation: "please" },
      { word: "la cuenta", translation: "the bill" },
    ],
    phrases: [
      { text: "Un café con leche, por favor.", translation: "A coffee with milk, please." },
      { text: "¿Cuánto cuesta?", translation: "How much is it?" },
      { text: "La cuenta, por favor.", translation: "The bill, please." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Café words",
        instructions: "Learn the words you need to order.",
      },
      {
        type: "listen-and-repeat",
        title: "Order politely",
        instructions: "Repeat each order phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "At the counter",
        instructions: "Order a drink from the teacher, who plays the waiter.",
      },
    ],
    aiTeacher: {
      scenario: "You're a waiter at a small café in Madrid and the student is your customer.",
      instructions:
        "Teach how to order a drink, ask the price and ask for the bill. Stay in the café role-play.",
      openingLine: "Welcome to the café! Let's learn how to order. Try saying 'café con leche'.",
    },
  },
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageCode: "fr",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Say hello and introduce yourself in French.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "bonjour", translation: "hello, good morning" },
      { word: "salut", translation: "hi" },
      { word: "je m'appelle", translation: "my name is" },
      { word: "enchanté", translation: "nice to meet you" },
    ],
    phrases: [
      { text: "Bonjour, comment ça va ?", translation: "Hello, how are you?" },
      { text: "Comment tu t'appelles ?", translation: "What's your name?" },
      { text: "Je m'appelle Léa. Enchantée !", translation: "My name is Léa. Nice to meet you!" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each greeting and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Meet a new friend",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting someone new at a party in Paris.",
      instructions:
        "Teach bonjour, salut, je m'appelle and enchanté. Have the student greet you and say their name.",
      openingLine: "Bonjour! Today you'll learn your first French greetings. Let's start with 'bonjour'.",
    },
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageCode: "fr",
    order: 2,
    title: "At the Bakery",
    goal: "Buy bread and pastries politely at a French bakery.",
    durationMinutes: 6,
    xp: 15,
    vocabulary: [
      { word: "une baguette", translation: "a baguette" },
      { word: "un croissant", translation: "a croissant" },
      { word: "s'il vous plaît", translation: "please (formal)" },
      { word: "merci", translation: "thank you" },
    ],
    phrases: [
      { text: "Je voudrais une baguette, s'il vous plaît.", translation: "I'd like a baguette, please." },
      { text: "C'est combien ?", translation: "How much is it?" },
      { text: "Merci, bonne journée !", translation: "Thank you, have a nice day!" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Bakery words",
        instructions: "Learn the names of a few bakery items.",
      },
      {
        type: "listen-and-repeat",
        title: "Order politely",
        instructions: "Repeat each order phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy your breakfast",
        instructions: "Order from the teacher, who plays the baker.",
      },
    ],
    aiTeacher: {
      scenario: "You're a baker in a small Parisian boulangerie and the student is your customer.",
      instructions:
        "Teach how to order bread politely, ask the price and say thank you. Stay in the bakery role-play.",
      openingLine: "Welcome to the bakery! Let's order something tasty. Try saying 'une baguette'.",
    },
  },
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageCode: "ja",
    order: 1,
    title: "Greetings",
    goal: "Use everyday Japanese greetings.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "こんにちは", pronunciation: "konnichiwa", translation: "hello" },
      { word: "おはようございます", pronunciation: "ohayō gozaimasu", translation: "good morning" },
      { word: "ありがとう", pronunciation: "arigatō", translation: "thank you" },
      { word: "さようなら", pronunciation: "sayōnara", translation: "goodbye" },
    ],
    phrases: [
      { text: "お元気ですか？", pronunciation: "ogenki desu ka?", translation: "How are you?" },
      { text: "はい、元気です。", pronunciation: "hai, genki desu", translation: "Yes, I'm fine." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each greeting and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each greeting out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Morning hello",
        instructions: "Greet the teacher and ask how they are.",
      },
    ],
    aiTeacher: {
      scenario: "You're greeting a neighbor on a quiet street in Tokyo.",
      instructions:
        "Teach konnichiwa, ohayō gozaimasu, arigatō and sayōnara. Say each word slowly with its meaning.",
      openingLine: "Hi! Let's learn how to say hello in Japanese. Listen first: 'konnichiwa'.",
    },
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageCode: "ja",
    order: 2,
    title: "Self-Introduction",
    goal: "Introduce yourself with your name in Japanese.",
    durationMinutes: 6,
    xp: 15,
    vocabulary: [
      { word: "わたし", pronunciation: "watashi", translation: "I, me" },
      { word: "なまえ", pronunciation: "namae", translation: "name" },
      { word: "がくせい", pronunciation: "gakusei", translation: "student" },
      { word: "はじめまして", pronunciation: "hajimemashite", translation: "nice to meet you" },
    ],
    phrases: [
      { text: "はじめまして。", pronunciation: "hajimemashite", translation: "Nice to meet you." },
      { text: "わたしはケンです。", pronunciation: "watashi wa Ken desu", translation: "I'm Ken." },
      {
        text: "よろしくおねがいします。",
        pronunciation: "yoroshiku onegaishimasu",
        translation: "Pleased to meet you.",
      },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Learn the words you need to introduce yourself.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Repeat each introduction phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "First day at school",
        instructions: "Introduce yourself to the teacher using your own name.",
      },
    ],
    aiTeacher: {
      scenario: "It's the first day at a language school in Kyoto and you're meeting the student.",
      instructions:
        "Teach hajimemashite, 'watashi wa ___ desu' and yoroshiku onegaishimasu. Have the student introduce themselves.",
      openingLine: "Welcome! Today you'll introduce yourself in Japanese. Let's start with 'hajimemashite'.",
    },
  },
  {
    id: "ko-u1-l1",
    unitId: "ko-u1",
    languageCode: "ko",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Greet someone politely and say your name in Korean.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "안녕하세요", pronunciation: "annyeonghaseyo", translation: "hello" },
      { word: "감사합니다", pronunciation: "gamsahamnida", translation: "thank you" },
      { word: "네", pronunciation: "ne", translation: "yes" },
      { word: "아니요", pronunciation: "aniyo", translation: "no" },
    ],
    phrases: [
      { text: "저는 민수예요.", pronunciation: "jeoneun Minsu-yeyo", translation: "I'm Minsu." },
      { text: "만나서 반가워요.", pronunciation: "mannaseo bangawoyo", translation: "Nice to meet you." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each word and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Meet a classmate",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting a new classmate at a café in Seoul.",
      instructions:
        "Teach annyeonghaseyo, gamsahamnida, ne and aniyo, then the introduction phrases.",
      openingLine: "Hi! Let's learn a polite Korean hello. Listen: 'annyeonghaseyo'.",
    },
  },
  {
    id: "de-u1-l1",
    unitId: "de-u1",
    languageCode: "de",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Say hello and introduce yourself in German.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "hallo", translation: "hello" },
      { word: "guten Morgen", translation: "good morning" },
      { word: "ich heiße", translation: "my name is" },
      { word: "freut mich", translation: "nice to meet you" },
    ],
    phrases: [
      { text: "Wie geht's?", translation: "How's it going?" },
      { text: "Ich heiße Max.", translation: "My name is Max." },
      { text: "Woher kommst du?", translation: "Where are you from?" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each greeting and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Meet a new friend",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting a new friend at a park in Berlin.",
      instructions:
        "Teach hallo, guten Morgen, ich heiße and freut mich. Have the student greet you and say their name.",
      openingLine: "Hi! Let's learn your first German greeting. It's easy: 'hallo'.",
    },
  },
  {
    id: "zh-u1-l1",
    unitId: "zh-u1",
    languageCode: "zh",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Greet someone and say your name in Mandarin Chinese.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "你好", pronunciation: "nǐ hǎo", translation: "hello" },
      { word: "谢谢", pronunciation: "xièxie", translation: "thank you" },
      { word: "再见", pronunciation: "zàijiàn", translation: "goodbye" },
      { word: "我叫", pronunciation: "wǒ jiào", translation: "my name is" },
    ],
    phrases: [
      { text: "你好吗？", pronunciation: "nǐ hǎo ma?", translation: "How are you?" },
      { text: "我叫小明。", pronunciation: "wǒ jiào Xiǎomíng", translation: "My name is Xiaoming." },
      { text: "很高兴认识你。", pronunciation: "hěn gāoxìng rènshi nǐ", translation: "Nice to meet you." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each word, its tones and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud, paying attention to the tones.",
      },
      {
        type: "conversation",
        title: "Meet a classmate",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting a new classmate on the first day of class in Beijing.",
      instructions:
        "Teach nǐ hǎo, xièxie, zàijiàn and wǒ jiào. Say each word slowly and point out its tones.",
      openingLine: "Hi! Let's learn to say hello in Chinese. Listen carefully: 'nǐ hǎo'.",
    },
  },
  {
    id: "it-u1-l1",
    unitId: "it-u1",
    languageCode: "it",
    order: 1,
    title: "Greetings & Introductions",
    goal: "Say hello and introduce yourself in Italian.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "ciao", translation: "hi, bye" },
      { word: "buongiorno", translation: "good morning" },
      { word: "mi chiamo", translation: "my name is" },
      { word: "piacere", translation: "nice to meet you" },
    ],
    phrases: [
      { text: "Ciao, come stai?", translation: "Hi, how are you?" },
      { text: "Come ti chiami?", translation: "What's your name?" },
      { text: "Mi chiamo Marco. Piacere!", translation: "My name is Marco. Nice to meet you!" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each greeting and its meaning.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Meet a new friend",
        instructions: "Greet the teacher and introduce yourself.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting someone new in a piazza in Florence.",
      instructions:
        "Teach ciao, buongiorno, mi chiamo and piacere. Have the student greet you and say their name.",
      openingLine: "Ciao! Today you'll learn your first Italian greetings. Let's start with 'ciao'.",
    },
  },
  {
    id: "it-u1-l2",
    unitId: "it-u1",
    languageCode: "it",
    order: 2,
    title: "At the Bar",
    goal: "Order a coffee and a pastry at an Italian bar.",
    durationMinutes: 6,
    xp: 15,
    vocabulary: [
      { word: "un caffè", translation: "an espresso" },
      { word: "un cornetto", translation: "a croissant" },
      { word: "per favore", translation: "please" },
      { word: "il conto", translation: "the bill" },
    ],
    phrases: [
      { text: "Un caffè e un cornetto, per favore.", translation: "An espresso and a croissant, please." },
      { text: "Quanto costa?", translation: "How much is it?" },
      { text: "Grazie, buona giornata!", translation: "Thank you, have a nice day!" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Bar words",
        instructions: "Learn the words you need to order breakfast.",
      },
      {
        type: "listen-and-repeat",
        title: "Order politely",
        instructions: "Repeat each order phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "At the counter",
        instructions: "Order from the teacher, who plays the barista.",
      },
    ],
    aiTeacher: {
      scenario: "You're a barista at a busy bar in Rome and the student is your customer.",
      instructions:
        "Teach how to order a coffee and a pastry, ask the price and say thank you. Stay in the bar role-play.",
      openingLine: "Buongiorno! Welcome to the bar. Let's order breakfast. Try saying 'un caffè'.",
    },
  },

  // The app's base language is English, so `translation` here holds a
  // simple English explanation instead of a word-for-word translation.
  {
    id: "en-u1-l1",
    unitId: "en-u1",
    languageCode: "en",
    order: 1,
    title: "Greetings & Small Talk",
    goal: "Greet someone, introduce yourself and make simple small talk.",
    durationMinutes: 5,
    xp: 10,
    vocabulary: [
      { word: "hello", translation: "a friendly greeting for any time of day" },
      { word: "nice to meet you", translation: "said when you meet someone for the first time" },
      { word: "how's it going?", translation: "a casual way to ask how someone is" },
      { word: "see you later", translation: "a casual way to say goodbye" },
    ],
    phrases: [
      { text: "Hi, I'm Sam. Nice to meet you.", translation: "Introduce yourself to someone new." },
      { text: "Where are you from?", translation: "Ask about someone's home country or city." },
      { text: "I'm doing great, thanks!", translation: "Answer when someone asks how you are." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Learn the words",
        instructions: "Hear each expression and when to use it.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each phrase out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Small talk",
        instructions: "Greet the teacher, introduce yourself and answer a few questions.",
      },
    ],
    aiTeacher: {
      scenario: "You're meeting a new coworker on their first day at an office in London.",
      instructions:
        "Teach hello, nice to meet you, how's it going and see you later. Speak slowly and use simple words.",
      openingLine: "Hi there! Today we'll practice greetings and small talk in English. Let's start with 'hello'.",
    },
  },
];

export function getLessonsByLanguage(languageCode: LanguageCode) {
  return lessons.filter((lesson) => lesson.languageCode === languageCode);
}

export function getLessonsByUnit(unitId: string) {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

// Lessons are taken in unit order, so the next one is right after the completed ones.
// Returns null once every lesson in the path is completed.
export function getCurrentLesson(
  languageCode: LanguageCode,
  completedLessonCount: number,
): Lesson | null {
  const path = getUnitsByLanguage(languageCode).flatMap((unit) => getLessonsByUnit(unit.id));
  return completedLessonCount < path.length ? path[completedLessonCount] : null;
}
