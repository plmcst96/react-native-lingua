import { images } from "@/constants/images";
import { getUnitsByLanguage } from "@/data/units";
import type { LanguageCode, Lesson } from "@/types/learning";

// Unsplash placeholders until each lesson has its own illustration in assets/.
const unsplash = (photoId: string) => ({
  uri: `https://images.unsplash.com/photo-${photoId}?w=400&q=80&auto=format&fit=crop`,
});

const lessonImages = {
  greetings: unsplash("1521791136064-7986c2920216"),
  dailyLife: unsplash("1484154218962-a197022b5858"),
  cafe: images.lessonCafe,
  bakery: unsplash("1509440159596-0249088772ff"),
  introductions: unsplash("1503676260728-1c00da094a0b"),
  travel: unsplash("1488646953014-85cb44e25828"),
  shopping: unsplash("1483985988355-763728e1935b"),
  family: unsplash("1511895426328-dc8714191300"),
};

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
    image: lessonImages.greetings,
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
    image: lessonImages.dailyLife,
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
    title: "At the Café",
    goal: "Order a drink and ask for the bill at a café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
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
    id: "es-u3-l1",
    unitId: "es-u3",
    languageCode: "es",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "la estación", translation: "the station" },
      { word: "¿dónde?", translation: "where?" },
      { word: "a la izquierda", translation: "to the left" },
      { word: "a la derecha", translation: "to the right" },
    ],
    phrases: [
      { text: "¿Dónde está la estación?", translation: "Where is the station?" },
      { text: "Siga todo recto.", translation: "Go straight ahead." },
      { text: "Gire a la izquierda.", translation: "Turn left." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Madrid",
        instructions: "Ask the teacher how to get to the station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost in the center of Madrid and asks you for help.",
      instructions:
        "Teach la estación, dónde, a la izquierda and a la derecha. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions in Spanish. First word: 'dónde', which means where.",
    },
  },
  {
    id: "es-u3-l2",
    unitId: "es-u3",
    languageCode: "es",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and sizes when buying clothes.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "la tienda", translation: "the shop" },
      { word: "caro", translation: "expensive" },
      { word: "barato", translation: "cheap" },
      { word: "la talla", translation: "the size" },
    ],
    phrases: [
      { text: "¿Cuánto cuesta esto?", translation: "How much does this cost?" },
      { text: "¿Tiene una talla más grande?", translation: "Do you have a bigger size?" },
      { text: "Me lo llevo.", translation: "I'll take it." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant in a clothing store in Seville and the student is a customer.",
      instructions:
        "Teach la tienda, caro, barato and la talla. Stay in the shop role-play and keep prices simple.",
      openingLine: "Welcome to the shop! Let's go shopping in Spanish. Try asking: '¿Cuánto cuesta esto?'",
    },
  },
  {
    id: "es-u3-l3",
    unitId: "es-u3",
    languageCode: "es",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "la familia", translation: "the family" },
      { word: "la madre", translation: "the mother" },
      { word: "el padre", translation: "the father" },
      { word: "el amigo", translation: "the friend (male)" },
    ],
    phrases: [
      { text: "Esta es mi madre.", translation: "This is my mother." },
      { text: "¿Tienes hermanos?", translation: "Do you have siblings?" },
      { text: "Tengo una hermana.", translation: "I have a sister." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a family lunch in Valencia.",
      instructions:
        "Teach la familia, la madre, el padre and el amigo. Ask the student simple questions about their family.",
      openingLine: "Hi! Let's talk about family in Spanish. First word: 'la familia'.",
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
    image: lessonImages.greetings,
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
    image: lessonImages.bakery,
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
    id: "fr-u2-l1",
    unitId: "fr-u2",
    languageCode: "fr",
    order: 1,
    title: "At the Café",
    goal: "Order a drink and ask for the bill at a Parisian café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "un café", translation: "an espresso" },
      { word: "un thé", translation: "a tea" },
      { word: "un verre d'eau", translation: "a glass of water" },
      { word: "l'addition", translation: "the bill" },
    ],
    phrases: [
      { text: "Un café, s'il vous plaît.", translation: "An espresso, please." },
      { text: "Je voudrais un thé.", translation: "I'd like a tea." },
      { text: "L'addition, s'il vous plaît.", translation: "The bill, please." },
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
      scenario: "You're a waiter at a café terrace in Paris and the student is your customer.",
      instructions:
        "Teach how to order a drink, ask for water and ask for the bill. Stay in the café role-play.",
      openingLine: "Bonjour! Welcome to the café. Let's learn to order. Try saying 'un café, s'il vous plaît'.",
    },
  },
  {
    id: "fr-u3-l1",
    unitId: "fr-u3",
    languageCode: "fr",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "la gare", translation: "the train station" },
      { word: "où", translation: "where" },
      { word: "à gauche", translation: "to the left" },
      { word: "à droite", translation: "to the right" },
    ],
    phrases: [
      { text: "Où est la gare ?", translation: "Where is the train station?" },
      { text: "Allez tout droit.", translation: "Go straight ahead." },
      { text: "Tournez à gauche.", translation: "Turn left." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Lyon",
        instructions: "Ask the teacher how to get to the station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost in the old town of Lyon and asks you for help.",
      instructions:
        "Teach la gare, où, à gauche and à droite. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions in French. First word: 'où', which means where.",
    },
  },
  {
    id: "fr-u3-l2",
    unitId: "fr-u3",
    languageCode: "fr",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and sizes when buying clothes.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "le magasin", translation: "the shop" },
      { word: "cher", translation: "expensive" },
      { word: "pas cher", translation: "cheap" },
      { word: "la taille", translation: "the size" },
    ],
    phrases: [
      { text: "Combien ça coûte ?", translation: "How much does it cost?" },
      { text: "Vous l'avez en taille M ?", translation: "Do you have it in size M?" },
      { text: "Je le prends.", translation: "I'll take it." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant in a boutique in Paris and the student is a customer.",
      instructions:
        "Teach le magasin, cher, pas cher and la taille. Stay in the shop role-play and keep prices simple.",
      openingLine: "Bonjour! Welcome to the boutique. Try asking: 'Combien ça coûte ?'",
    },
  },
  {
    id: "fr-u3-l3",
    unitId: "fr-u3",
    languageCode: "fr",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "la famille", translation: "the family" },
      { word: "la mère", translation: "the mother" },
      { word: "le père", translation: "the father" },
      { word: "un ami", translation: "a friend (male)" },
    ],
    phrases: [
      { text: "Voici ma mère.", translation: "This is my mother." },
      { text: "Tu as des frères et sœurs ?", translation: "Do you have siblings?" },
      { text: "J'ai un frère.", translation: "I have a brother." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a family picnic in Provence.",
      instructions:
        "Teach la famille, la mère, le père and un ami. Ask the student simple questions about their family.",
      openingLine: "Hi! Let's talk about family in French. First word: 'la famille'.",
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
    image: lessonImages.greetings,
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
    image: lessonImages.introductions,
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
    id: "ja-u2-l1",
    unitId: "ja-u2",
    languageCode: "ja",
    order: 1,
    title: "At the Café",
    goal: "Order a drink and ask for the bill at a Japanese café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "コーヒー", pronunciation: "kōhī", translation: "coffee" },
      { word: "水", pronunciation: "mizu", translation: "water" },
      { word: "ください", pronunciation: "kudasai", translation: "please (give me)" },
      { word: "いくら", pronunciation: "ikura", translation: "how much" },
    ],
    phrases: [
      { text: "コーヒーをください。", pronunciation: "kōhī o kudasai", translation: "A coffee, please." },
      { text: "いくらですか？", pronunciation: "ikura desu ka?", translation: "How much is it?" },
      {
        text: "おかいけいをおねがいします。",
        pronunciation: "okaikei o onegaishimasu",
        translation: "The bill, please.",
      },
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
      scenario: "You're a waiter at a cozy café in Tokyo and the student is your customer.",
      instructions:
        "Teach kōhī, mizu, kudasai and ikura. Have the student order a drink and ask for the bill.",
      openingLine: "Irasshaimase! Welcome to the café. Let's order. Try saying 'kōhī o kudasai'.",
    },
  },
  {
    id: "ja-u3-l1",
    unitId: "ja-u3",
    languageCode: "ja",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "えき", pronunciation: "eki", translation: "station" },
      { word: "どこ", pronunciation: "doko", translation: "where" },
      { word: "ひだり", pronunciation: "hidari", translation: "left" },
      { word: "みぎ", pronunciation: "migi", translation: "right" },
    ],
    phrases: [
      {
        text: "えきはどこですか？",
        pronunciation: "eki wa doko desu ka?",
        translation: "Where is the station?",
      },
      {
        text: "まっすぐいってください。",
        pronunciation: "massugu itte kudasai",
        translation: "Please go straight.",
      },
      {
        text: "ひだりにまがってください。",
        pronunciation: "hidari ni magatte kudasai",
        translation: "Please turn left.",
      },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Osaka",
        instructions: "Ask the teacher how to get to the station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost near a busy street in Osaka and asks you for help.",
      instructions:
        "Teach eki, doko, hidari and migi. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions in Japanese. First word: 'doko', which means where.",
    },
  },
  {
    id: "ja-u3-l2",
    unitId: "ja-u3",
    languageCode: "ja",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and buy something at a shop.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "みせ", pronunciation: "mise", translation: "shop" },
      { word: "これ", pronunciation: "kore", translation: "this" },
      { word: "たかい", pronunciation: "takai", translation: "expensive" },
      { word: "やすい", pronunciation: "yasui", translation: "cheap" },
    ],
    phrases: [
      {
        text: "これはいくらですか？",
        pronunciation: "kore wa ikura desu ka?",
        translation: "How much is this?",
      },
      {
        text: "ちょっとたかいです。",
        pronunciation: "chotto takai desu",
        translation: "It's a little expensive.",
      },
      { text: "これをください。", pronunciation: "kore o kudasai", translation: "I'll take this." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant at a souvenir shop in Kyoto and the student is a customer.",
      instructions:
        "Teach mise, kore, takai and yasui. Stay in the shop role-play and keep prices simple.",
      openingLine: "Irasshaimase! Point at something and ask: 'kore wa ikura desu ka?'",
    },
  },
  {
    id: "ja-u3-l3",
    unitId: "ja-u3",
    languageCode: "ja",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "かぞく", pronunciation: "kazoku", translation: "family" },
      { word: "はは", pronunciation: "haha", translation: "(my) mother" },
      { word: "ちち", pronunciation: "chichi", translation: "(my) father" },
      { word: "ともだち", pronunciation: "tomodachi", translation: "friend" },
    ],
    phrases: [
      {
        text: "かぞくはよにんです。",
        pronunciation: "kazoku wa yonin desu",
        translation: "There are four people in my family.",
      },
      {
        text: "こちらはともだちのゆきです。",
        pronunciation: "kochira wa tomodachi no Yuki desu",
        translation: "This is my friend Yuki.",
      },
      {
        text: "きょうだいはいますか？",
        pronunciation: "kyōdai wa imasu ka?",
        translation: "Do you have siblings?",
      },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a family trip to see the cherry blossoms.",
      instructions:
        "Teach kazoku, haha, chichi and tomodachi. Ask the student simple questions about their family.",
      openingLine: "Hi! Let's talk about family in Japanese. First word: 'kazoku', which means family.",
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
    image: lessonImages.greetings,
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
    id: "ko-u1-l2",
    unitId: "ko-u1",
    languageCode: "ko",
    order: 2,
    title: "Daily Life",
    goal: "Describe a few things you do every day in Korean.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.dailyLife,
    vocabulary: [
      { word: "집", pronunciation: "jip", translation: "house, home" },
      { word: "회사", pronunciation: "hoesa", translation: "company, office" },
      { word: "먹다", pronunciation: "meokda", translation: "to eat" },
      { word: "자다", pronunciation: "jada", translation: "to sleep" },
    ],
    phrases: [
      {
        text: "저는 일곱 시에 일어나요.",
        pronunciation: "jeoneun ilgop sie ireonayo",
        translation: "I get up at seven.",
      },
      { text: "회사에 가요.", pronunciation: "hoesa-e gayo", translation: "I go to the office." },
      { text: "집에서 밥을 먹어요.", pronunciation: "jibeseo babeul meogeoyo", translation: "I eat at home." },
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
      scenario: "A friendly neighbor in Busan asks what a normal day looks like for you.",
      instructions:
        "Teach jip, hoesa, meokda and jada. Ask simple questions about the student's routine.",
      openingLine: "Hi! Let's talk about your day in Korean. First word: 'jip', which means home.",
    },
  },
  {
    id: "ko-u2-l1",
    unitId: "ko-u2",
    languageCode: "ko",
    order: 1,
    title: "At the Café",
    goal: "Order a drink and pay at a Korean café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "커피", pronunciation: "keopi", translation: "coffee" },
      { word: "물", pronunciation: "mul", translation: "water" },
      { word: "한 잔", pronunciation: "han jan", translation: "one cup" },
      { word: "주세요", pronunciation: "juseyo", translation: "please give me" },
    ],
    phrases: [
      {
        text: "아메리카노 한 잔 주세요.",
        pronunciation: "amerikano han jan juseyo",
        translation: "One americano, please.",
      },
      { text: "얼마예요?", pronunciation: "eolmayeyo?", translation: "How much is it?" },
      { text: "카드로 할게요.", pronunciation: "kadeuro halgeyo", translation: "I'll pay by card." },
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
        instructions: "Order a drink from the teacher, who plays the barista.",
      },
    ],
    aiTeacher: {
      scenario: "You're a barista at a cozy café in Seoul and the student is your customer.",
      instructions:
        "Teach how to order a drink with 'juseyo', ask the price and pay. Stay in the café role-play.",
      openingLine: "Welcome to the café! Let's learn to order. Try saying 'keopi juseyo'.",
    },
  },
  {
    id: "ko-u3-l1",
    unitId: "ko-u3",
    languageCode: "ko",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "역", pronunciation: "yeok", translation: "station" },
      { word: "어디", pronunciation: "eodi", translation: "where" },
      { word: "왼쪽", pronunciation: "oenjjok", translation: "left" },
      { word: "오른쪽", pronunciation: "oreunjjok", translation: "right" },
    ],
    phrases: [
      {
        text: "지하철역이 어디예요?",
        pronunciation: "jihacheollyeogi eodiyeyo?",
        translation: "Where is the subway station?",
      },
      { text: "쭉 가세요.", pronunciation: "jjuk gaseyo", translation: "Go straight." },
      { text: "오른쪽으로 가세요.", pronunciation: "oreunjjogeuro gaseyo", translation: "Go right." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Seoul",
        instructions: "Ask the teacher how to get to the subway station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost near a busy street in Seoul and asks you for help.",
      instructions:
        "Teach yeok, eodi, oenjjok and oreunjjok. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions in Korean. First word: 'eodi', which means where.",
    },
  },
  {
    id: "ko-u3-l2",
    unitId: "ko-u3",
    languageCode: "ko",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and buy something at a market.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "이거", pronunciation: "igeo", translation: "this" },
      { word: "얼마", pronunciation: "eolma", translation: "how much" },
      { word: "비싸요", pronunciation: "bissayo", translation: "it's expensive" },
      { word: "싸요", pronunciation: "ssayo", translation: "it's cheap" },
    ],
    phrases: [
      { text: "이거 얼마예요?", pronunciation: "igeo eolmayeyo?", translation: "How much is this?" },
      { text: "너무 비싸요.", pronunciation: "neomu bissayo", translation: "It's too expensive." },
      { text: "이거 주세요.", pronunciation: "igeo juseyo", translation: "I'll take this one." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices.",
      },
      {
        type: "listen-and-repeat",
        title: "At the stall",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a souvenir",
        instructions: "Ask the teacher, who plays the seller, about prices and buy something.",
      },
    ],
    aiTeacher: {
      scenario: "You're a seller at Namdaemun Market and the student wants to buy a souvenir.",
      instructions:
        "Teach igeo, eolma, bissayo and ssayo. Stay in the market role-play and keep prices simple.",
      openingLine: "Welcome to the market! Point at something and ask: 'igeo eolmayeyo?'",
    },
  },
  {
    id: "ko-u3-l3",
    unitId: "ko-u3",
    languageCode: "ko",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "가족", pronunciation: "gajok", translation: "family" },
      { word: "엄마", pronunciation: "eomma", translation: "mom" },
      { word: "아빠", pronunciation: "appa", translation: "dad" },
      { word: "친구", pronunciation: "chingu", translation: "friend" },
    ],
    phrases: [
      {
        text: "우리 가족은 네 명이에요.",
        pronunciation: "uri gajogeun ne myeongieyo",
        translation: "There are four people in my family.",
      },
      {
        text: "이 사람은 제 친구예요.",
        pronunciation: "i sarameun je chinguyeyo",
        translation: "This is my friend.",
      },
      { text: "형제가 있어요?", pronunciation: "hyeongjega isseoyo?", translation: "Do you have siblings?" },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos of your family at a picnic by the Han River.",
      instructions:
        "Teach gajok, eomma, appa and chingu. Ask the student simple questions about their family.",
      openingLine: "Hi! Let's talk about family in Korean. First word: 'gajok', which means family.",
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
    image: lessonImages.greetings,
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
    id: "de-u1-l2",
    unitId: "de-u1",
    languageCode: "de",
    order: 2,
    title: "Daily Life",
    goal: "Describe a few things you do every day in German.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.dailyLife,
    vocabulary: [
      { word: "zu Hause", translation: "at home" },
      { word: "die Arbeit", translation: "work, job" },
      { word: "essen", translation: "to eat" },
      { word: "schlafen", translation: "to sleep" },
    ],
    phrases: [
      { text: "Ich stehe um sieben Uhr auf.", translation: "I get up at seven." },
      { text: "Ich arbeite in einem Büro.", translation: "I work in an office." },
      { text: "Ich esse zu Hause.", translation: "I eat at home." },
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
      scenario: "A friendly neighbor in Hamburg asks what a normal day looks like for you.",
      instructions:
        "Teach zu Hause, die Arbeit, essen and schlafen. Ask simple questions about the student's routine.",
      openingLine: "Hi! Let's talk about your day in German. First word: 'die Arbeit', which means work.",
    },
  },
  {
    id: "de-u2-l1",
    unitId: "de-u2",
    languageCode: "de",
    order: 1,
    title: "At the Café",
    goal: "Order a drink and ask for the bill at a German café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "ein Kaffee", translation: "a coffee" },
      { word: "ein Wasser", translation: "a water" },
      { word: "bitte", translation: "please" },
      { word: "die Rechnung", translation: "the bill" },
    ],
    phrases: [
      { text: "Einen Kaffee, bitte.", translation: "A coffee, please." },
      { text: "Was kostet das?", translation: "How much is that?" },
      { text: "Die Rechnung, bitte.", translation: "The bill, please." },
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
      scenario: "You're a waiter at a traditional café in Munich and the student is your customer.",
      instructions:
        "Teach how to order a drink, ask the price and ask for the bill. Stay in the café role-play.",
      openingLine: "Welcome to the café! Let's learn how to order. Try saying 'einen Kaffee, bitte'.",
    },
  },
  {
    id: "de-u3-l1",
    unitId: "de-u3",
    languageCode: "de",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "der Bahnhof", translation: "the train station" },
      { word: "wo", translation: "where" },
      { word: "links", translation: "left" },
      { word: "rechts", translation: "right" },
    ],
    phrases: [
      { text: "Wo ist der Bahnhof?", translation: "Where is the train station?" },
      { text: "Gehen Sie geradeaus.", translation: "Go straight ahead." },
      { text: "Dann biegen Sie links ab.", translation: "Then turn left." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Berlin",
        instructions: "Ask the teacher how to get to the train station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost in the center of Berlin and asks you for help.",
      instructions:
        "Teach der Bahnhof, wo, links and rechts. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions in German. First word: 'wo', which means where.",
    },
  },
  {
    id: "de-u3-l2",
    unitId: "de-u3",
    languageCode: "de",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and sizes when buying clothes.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "das Geschäft", translation: "the shop" },
      { word: "teuer", translation: "expensive" },
      { word: "billig", translation: "cheap" },
      { word: "die Größe", translation: "the size" },
    ],
    phrases: [
      { text: "Wie viel kostet das?", translation: "How much does this cost?" },
      { text: "Haben Sie das in Größe M?", translation: "Do you have this in size M?" },
      { text: "Ich nehme es.", translation: "I'll take it." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant in a clothing store in Cologne and the student is a customer.",
      instructions:
        "Teach das Geschäft, teuer, billig and die Größe. Stay in the shop role-play and keep prices simple.",
      openingLine: "Welcome to the shop! Let's go shopping in German. Try asking: 'Wie viel kostet das?'",
    },
  },
  {
    id: "de-u3-l3",
    unitId: "de-u3",
    languageCode: "de",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "die Familie", translation: "the family" },
      { word: "die Mutter", translation: "the mother" },
      { word: "der Vater", translation: "the father" },
      { word: "der Freund", translation: "the friend (male)" },
    ],
    phrases: [
      { text: "Das ist meine Mutter.", translation: "This is my mother." },
      { text: "Hast du Geschwister?", translation: "Do you have siblings?" },
      { text: "Ich habe einen Bruder.", translation: "I have a brother." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a family birthday party in Stuttgart.",
      instructions:
        "Teach die Familie, die Mutter, der Vater and der Freund. Ask simple questions about their family.",
      openingLine: "Hi! Let's talk about family in German. First word: 'die Familie'.",
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
    image: lessonImages.greetings,
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
    id: "zh-u1-l2",
    unitId: "zh-u1",
    languageCode: "zh",
    order: 2,
    title: "Daily Life",
    goal: "Describe a few things you do every day in Mandarin Chinese.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.dailyLife,
    vocabulary: [
      { word: "家", pronunciation: "jiā", translation: "home, family" },
      { word: "工作", pronunciation: "gōngzuò", translation: "work, to work" },
      { word: "吃饭", pronunciation: "chīfàn", translation: "to eat (a meal)" },
      { word: "睡觉", pronunciation: "shuìjiào", translation: "to sleep" },
    ],
    phrases: [
      { text: "我七点起床。", pronunciation: "wǒ qī diǎn qǐchuáng", translation: "I get up at seven." },
      {
        text: "我在办公室工作。",
        pronunciation: "wǒ zài bàngōngshì gōngzuò",
        translation: "I work in an office.",
      },
      { text: "我在家吃饭。", pronunciation: "wǒ zài jiā chīfàn", translation: "I eat at home." },
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
        instructions: "Repeat each sentence, paying attention to the tones.",
      },
      {
        type: "conversation",
        title: "Tell me about your day",
        instructions: "Answer the teacher's questions about your day.",
      },
    ],
    aiTeacher: {
      scenario: "A friendly neighbor in Shanghai asks what a normal day looks like for you.",
      instructions:
        "Teach jiā, gōngzuò, chīfàn and shuìjiào. Ask simple questions about the student's routine.",
      openingLine: "Hi! Let's talk about your day in Chinese. First word: 'jiā', which means home.",
    },
  },
  {
    id: "zh-u2-l1",
    unitId: "zh-u2",
    languageCode: "zh",
    order: 1,
    title: "At the Café",
    goal: "Order a drink and ask the price at a café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "咖啡", pronunciation: "kāfēi", translation: "coffee" },
      { word: "水", pronunciation: "shuǐ", translation: "water" },
      { word: "一杯", pronunciation: "yì bēi", translation: "one cup of" },
      { word: "请", pronunciation: "qǐng", translation: "please" },
    ],
    phrases: [
      {
        text: "请给我一杯咖啡。",
        pronunciation: "qǐng gěi wǒ yì bēi kāfēi",
        translation: "A cup of coffee, please.",
      },
      { text: "多少钱？", pronunciation: "duōshao qián?", translation: "How much is it?" },
      { text: "我要热的。", pronunciation: "wǒ yào rè de", translation: "I'd like it hot." },
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
        instructions: "Repeat each order phrase, paying attention to the tones.",
      },
      {
        type: "conversation",
        title: "At the counter",
        instructions: "Order a drink from the teacher, who plays the barista.",
      },
    ],
    aiTeacher: {
      scenario: "You're a barista at a small café in Beijing and the student is your customer.",
      instructions:
        "Teach how to order a drink with 'qǐng gěi wǒ', ask the price and choose hot or cold. Stay in the café role-play.",
      openingLine: "Welcome to the café! Let's learn to order. Try saying 'yì bēi kāfēi'.",
    },
  },
  {
    id: "zh-u3-l1",
    unitId: "zh-u3",
    languageCode: "zh",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "地铁站", pronunciation: "dìtiězhàn", translation: "subway station" },
      { word: "哪里", pronunciation: "nǎlǐ", translation: "where" },
      { word: "左", pronunciation: "zuǒ", translation: "left" },
      { word: "右", pronunciation: "yòu", translation: "right" },
    ],
    phrases: [
      {
        text: "地铁站在哪里？",
        pronunciation: "dìtiězhàn zài nǎlǐ?",
        translation: "Where is the subway station?",
      },
      { text: "一直走。", pronunciation: "yìzhí zǒu", translation: "Go straight." },
      { text: "往左拐。", pronunciation: "wǎng zuǒ guǎi", translation: "Turn left." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Beijing",
        instructions: "Ask the teacher how to get to the subway station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost near a busy street in Beijing and asks you for help.",
      instructions:
        "Teach dìtiězhàn, nǎlǐ, zuǒ and yòu. Give simple directions and point out the tones.",
      openingLine: "Hi! Let's learn to ask for directions in Chinese. First word: 'nǎlǐ', which means where.",
    },
  },
  {
    id: "zh-u3-l2",
    unitId: "zh-u3",
    languageCode: "zh",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and bargain at a market.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "商店", pronunciation: "shāngdiàn", translation: "store" },
      { word: "这个", pronunciation: "zhège", translation: "this one" },
      { word: "贵", pronunciation: "guì", translation: "expensive" },
      { word: "便宜", pronunciation: "piányi", translation: "cheap" },
    ],
    phrases: [
      { text: "这个多少钱？", pronunciation: "zhège duōshao qián?", translation: "How much is this?" },
      { text: "太贵了！", pronunciation: "tài guì le!", translation: "That's too expensive!" },
      { text: "便宜一点吧。", pronunciation: "piányi yìdiǎn ba", translation: "Make it a bit cheaper." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices.",
      },
      {
        type: "listen-and-repeat",
        title: "At the stall",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Bargain for a gift",
        instructions: "Ask the teacher, who plays the seller, about prices and bargain a little.",
      },
    ],
    aiTeacher: {
      scenario: "You're a seller at a busy market in Shanghai and the student wants to buy a gift.",
      instructions:
        "Teach shāngdiàn, zhège, guì and piányi. Stay in the market role-play and let the student bargain.",
      openingLine: "Welcome to the market! Point at something and ask: 'zhège duōshao qián?'",
    },
  },
  {
    id: "zh-u3-l3",
    unitId: "zh-u3",
    languageCode: "zh",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "家人", pronunciation: "jiārén", translation: "family members" },
      { word: "妈妈", pronunciation: "māma", translation: "mom" },
      { word: "爸爸", pronunciation: "bàba", translation: "dad" },
      { word: "朋友", pronunciation: "péngyou", translation: "friend" },
    ],
    phrases: [
      { text: "这是我妈妈。", pronunciation: "zhè shì wǒ māma", translation: "This is my mom." },
      {
        text: "你有兄弟姐妹吗？",
        pronunciation: "nǐ yǒu xiōngdì jiěmèi ma?",
        translation: "Do you have siblings?",
      },
      {
        text: "他是我的好朋友。",
        pronunciation: "tā shì wǒ de hǎo péngyou",
        translation: "He's my good friend.",
      },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud, paying attention to the tones.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a family dinner during the Spring Festival.",
      instructions:
        "Teach jiārén, māma, bàba and péngyou. Ask the student simple questions about their family.",
      openingLine: "Hi! Let's talk about family in Chinese. First word: 'jiārén', which means family.",
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
    image: lessonImages.greetings,
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
    image: lessonImages.cafe,
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
  {
    id: "it-u2-l1",
    unitId: "it-u2",
    languageCode: "it",
    order: 1,
    title: "Daily Life",
    goal: "Describe a few things you do every day in Italian.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.dailyLife,
    vocabulary: [
      { word: "casa", translation: "house, home" },
      { word: "il lavoro", translation: "work, job" },
      { word: "mangiare", translation: "to eat" },
      { word: "dormire", translation: "to sleep" },
    ],
    phrases: [
      { text: "Mi alzo alle sette.", translation: "I get up at seven." },
      { text: "Lavoro in un ufficio.", translation: "I work in an office." },
      { text: "Mangio a casa.", translation: "I eat at home." },
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
      scenario: "A friendly neighbor in Bologna asks what a normal day looks like for you.",
      instructions:
        "Teach casa, il lavoro, mangiare and dormire. Ask simple questions about the student's routine.",
      openingLine: "Ciao! Let's talk about your day in Italian. First word: 'casa', which means home.",
    },
  },
  {
    id: "it-u3-l1",
    unitId: "it-u3",
    languageCode: "it",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask where a place is and understand simple directions.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "la stazione", translation: "the station" },
      { word: "dove", translation: "where" },
      { word: "a sinistra", translation: "to the left" },
      { word: "a destra", translation: "to the right" },
    ],
    phrases: [
      { text: "Dov'è la stazione?", translation: "Where is the station?" },
      { text: "Vada sempre dritto.", translation: "Go straight ahead." },
      { text: "Giri a sinistra.", translation: "Turn left." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in Milan",
        instructions: "Ask the teacher how to get to the station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost in the center of Milan and asks you for help.",
      instructions:
        "Teach la stazione, dove, a sinistra and a destra. Give simple directions and have the student repeat them.",
      openingLine: "Ciao! Let's learn to ask for directions in Italian. First word: 'dove', which means where.",
    },
  },
  {
    id: "it-u3-l2",
    unitId: "it-u3",
    languageCode: "it",
    order: 2,
    title: "Shopping",
    goal: "Ask for prices and sizes when buying clothes.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "il negozio", translation: "the shop" },
      { word: "caro", translation: "expensive" },
      { word: "economico", translation: "cheap" },
      { word: "la taglia", translation: "the size" },
    ],
    phrases: [
      { text: "Quanto costa questo?", translation: "How much is this?" },
      { text: "Ce l'ha in taglia M?", translation: "Do you have it in size M?" },
      { text: "Lo prendo.", translation: "I'll take it." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant in a clothing store in Milan and the student is a customer.",
      instructions:
        "Teach il negozio, caro, economico and la taglia. Stay in the shop role-play and keep prices simple.",
      openingLine: "Buongiorno! Welcome to the shop. Try asking: 'Quanto costa questo?'",
    },
  },
  {
    id: "it-u3-l3",
    unitId: "it-u3",
    languageCode: "it",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "la famiglia", translation: "the family" },
      { word: "la madre", translation: "the mother" },
      { word: "il padre", translation: "the father" },
      { word: "l'amico", translation: "the friend (male)" },
    ],
    phrases: [
      { text: "Questa è mia madre.", translation: "This is my mother." },
      { text: "Hai fratelli o sorelle?", translation: "Do you have brothers or sisters?" },
      { text: "Ho un fratello.", translation: "I have a brother." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're showing the student photos from a Sunday family lunch in Naples.",
      instructions:
        "Teach la famiglia, la madre, il padre and l'amico. Ask the student simple questions about their family.",
      openingLine: "Ciao! Let's talk about family in Italian. First word: 'la famiglia'.",
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
    image: lessonImages.greetings,
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
  {
    id: "en-u1-l2",
    unitId: "en-u1",
    languageCode: "en",
    order: 2,
    title: "Daily Life",
    goal: "Describe your daily routine in simple English.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.dailyLife,
    vocabulary: [
      { word: "wake up", translation: "to stop sleeping and start your day" },
      { word: "commute", translation: "to travel to work or school" },
      { word: "have lunch", translation: "to eat your midday meal" },
      { word: "go to bed", translation: "to lie down to sleep at night" },
    ],
    phrases: [
      { text: "I usually wake up at seven.", translation: "Say what time you start your day." },
      { text: "I take the bus to work.", translation: "Explain how you get to work." },
      { text: "I go to bed around eleven.", translation: "Say when you go to sleep." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Everyday words",
        instructions: "Learn expressions for the main moments of your day.",
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
      scenario: "A friendly neighbor in Manchester asks what a normal day looks like for you.",
      instructions:
        "Teach wake up, commute, have lunch and go to bed. Ask simple questions about the student's routine.",
      openingLine: "Hi! Let's talk about your day in English. What time do you usually wake up?",
    },
  },
  {
    id: "en-u2-l1",
    unitId: "en-u2",
    languageCode: "en",
    order: 1,
    title: "At the Café",
    goal: "Order a drink politely at a café.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.cafe,
    vocabulary: [
      { word: "latte", translation: "espresso with lots of steamed milk" },
      { word: "to go", translation: "to take your drink away with you" },
      { word: "could I get…?", translation: "a polite way to order something" },
      { word: "the bill", translation: "the total you pay at the end" },
    ],
    phrases: [
      { text: "Could I get a latte, please?", translation: "Order a drink politely." },
      { text: "For here or to go?", translation: "The barista asks where you'll drink it." },
      { text: "How much is that?", translation: "Ask the price." },
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
        instructions: "Order a drink from the teacher, who plays the barista.",
      },
    ],
    aiTeacher: {
      scenario: "You're a barista at a busy coffee shop in London and the student is your customer.",
      instructions:
        "Teach latte, to go, could I get and the bill. Stay in the café role-play and speak slowly.",
      openingLine: "Hi there, welcome in! What can I get for you? Try: 'Could I get a latte, please?'",
    },
  },
  {
    id: "en-u3-l1",
    unitId: "en-u3",
    languageCode: "en",
    order: 1,
    title: "Travel & Directions",
    goal: "Ask for directions and understand simple answers.",
    durationMinutes: 7,
    xp: 15,
    image: lessonImages.travel,
    vocabulary: [
      { word: "excuse me", translation: "a polite way to get someone's attention" },
      { word: "turn left", translation: "change direction to the left" },
      { word: "go straight", translation: "keep walking forward" },
      { word: "next to", translation: "right beside something" },
    ],
    phrases: [
      { text: "Excuse me, where's the train station?", translation: "Ask for directions politely." },
      { text: "Go straight and turn left.", translation: "Give simple directions." },
      { text: "It's next to the bank.", translation: "Describe where a place is." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Direction words",
        instructions: "Learn the words for places and directions.",
      },
      {
        type: "listen-and-repeat",
        title: "Ask the way",
        instructions: "Repeat each question and direction after the teacher.",
      },
      {
        type: "conversation",
        title: "Lost in London",
        instructions: "Ask the teacher how to get to the train station.",
      },
    ],
    aiTeacher: {
      scenario: "The student is lost near a busy square in London and asks you for help.",
      instructions:
        "Teach excuse me, turn left, go straight and next to. Give simple directions and have the student repeat them.",
      openingLine: "Hi! Let's learn to ask for directions. Start politely with 'excuse me'.",
    },
  },
  {
    id: "en-u3-l2",
    unitId: "en-u3",
    languageCode: "en",
    order: 2,
    title: "Shopping",
    goal: "Ask about prices and sizes when buying clothes.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.shopping,
    vocabulary: [
      { word: "how much", translation: "used to ask about price" },
      { word: "try on", translation: "to put on clothes to check the fit" },
      { word: "receipt", translation: "the paper that shows what you paid" },
      { word: "on sale", translation: "cheaper than the usual price" },
    ],
    phrases: [
      { text: "Can I try this on?", translation: "Ask to check clothes before buying." },
      { text: "Do you have this in a medium?", translation: "Ask for a different size." },
      { text: "I'll take it.", translation: "Say you want to buy it." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Shopping words",
        instructions: "Learn the words you need to ask about prices and sizes.",
      },
      {
        type: "listen-and-repeat",
        title: "In the shop",
        instructions: "Repeat each shopping phrase after the teacher.",
      },
      {
        type: "conversation",
        title: "Buy a jacket",
        instructions: "Ask the teacher, who plays the shop assistant, about price and size.",
      },
    ],
    aiTeacher: {
      scenario: "You're a shop assistant in a clothing store in New York and the student is a customer.",
      instructions:
        "Teach how much, try on, receipt and on sale. Stay in the shop role-play and keep prices simple.",
      openingLine: "Hi, welcome to the store! Let's go shopping. Try asking: 'How much is this?'",
    },
  },
  {
    id: "en-u3-l3",
    unitId: "en-u3",
    languageCode: "en",
    order: 3,
    title: "Family & Friends",
    goal: "Talk about your family and introduce a friend.",
    durationMinutes: 6,
    xp: 15,
    image: lessonImages.family,
    vocabulary: [
      { word: "parents", translation: "your mother and father" },
      { word: "siblings", translation: "your brothers and sisters" },
      { word: "best friend", translation: "your closest friend" },
      { word: "get along", translation: "to have a friendly relationship" },
    ],
    phrases: [
      { text: "I have two siblings.", translation: "Talk about the size of your family." },
      { text: "This is my best friend, Mia.", translation: "Introduce a friend." },
      { text: "We get along really well.", translation: "Describe a good relationship." },
    ],
    activities: [
      {
        type: "vocabulary",
        title: "Family words",
        instructions: "Learn the words for family members and friends.",
      },
      {
        type: "listen-and-repeat",
        title: "Repeat after me",
        instructions: "Say each sentence about family out loud after the teacher.",
      },
      {
        type: "conversation",
        title: "Family photos",
        instructions: "Tell the teacher about your family and a close friend.",
      },
    ],
    aiTeacher: {
      scenario: "You're chatting with the student at a friend's barbecue in Sydney.",
      instructions:
        "Teach parents, siblings, best friend and get along. Ask simple questions about their family and friends.",
      openingLine: "Hi! Let's talk about family and friends. Do you have any siblings?",
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

// Every lesson of a language, in the order the learner takes them.
export function getLessonPath(languageCode: LanguageCode) {
  return getUnitsByLanguage(languageCode).flatMap((unit) => getLessonsByUnit(unit.id));
}

type CurrentLessonState = { status: "in-progress"; lesson: Lesson } | { status: "completed" };

// Lessons are taken in unit order, so the next one is right after the completed ones.
export function getCurrentLesson(
  languageCode: LanguageCode,
  completedLessonCount: number,
): CurrentLessonState {
  const path = getLessonPath(languageCode);
  if (completedLessonCount >= path.length) {
    return { status: "completed" };
  }

  return { status: "in-progress", lesson: path[completedLessonCount] };
}
