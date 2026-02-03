// Word list for the game
export const WORDS = [
  "APPLE", "BRAIN", "CHAIR", "DANCE", "EAGLE",
  "FLAME", "GRAPE", "HEART", "IMAGE", "JOKER",
  "KNIFE", "LEMON", "MANGO", "NURSE", "OCEAN",
  "PIANO", "QUEEN", "ROBOT", "STORM", "TIGER",
  "ULTRA", "VIVID", "WATER", "YOUTH", "ZEBRA",
  "ALARM", "BEACH", "CLOUD", "DREAM", "EVENT",
  "FOCUS", "GHOST", "HONEY", "INPUT", "JELLY",
  "KAYAK", "LUNAR", "MUSIC", "NOVEL", "OASIS",
  "PATCH", "QUEST", "RADAR", "SKILL", "TOAST",
  "UNITY", "VOICE", "WORLD", "XEROX", "YEARS",
  "ZONES", "ADAPT", "BLAZE", "CRAVE", "DROVE",
  "ELITE", "FLAIR", "GLIDE", "HASTE", "IRONY",
  "JOINT", "KUDOS", "LOGIC", "MIRTH", "NOBLE",
  "OLIVE", "PRIZE", "QUIRK", "REACH", "SCOPE",
  "TRACE", "URBAN", "VALUE", "WEARY", "YIELD",
  "ZESTY", "AGILE", "BRISK", "CRISP", "DWELL",
  "EXACT", "FROST", "GRACE", "HUMOR", "IDEAL",
  "JUMBO", "KNACK", "LEVEL", "MAJOR", "NICER",
  "OPTED", "PLUMB", "QUILT", "RISKY", "SHARE",
  "THINK", "USHER", "VAPOR", "WITCH", "XENON"
];

// Valid guesses (expanded word list for validation)
export const VALID_GUESSES = [
  ...WORDS,
  "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
  "AGENT", "AGREE", "AHEAD", "ALBUM", "ALIEN", "ALIGN", "ALIKE", "ALIVE", "ALLEY", "ALLOW",
  "ALONE", "ALONG", "ALTER", "AMONG", "ANGEL", "ANGRY", "ANKLE", "APART", "APPLY", "ARENA",
  "ARGUE", "ARISE", "ARMOR", "ARRAY", "ARROW", "ASSET", "AVOID", "AWARD", "AWFUL", "BADGE",
  "BADLY", "BASIC", "BASIS", "BEARD", "BEAST", "BEGAN", "BEGIN", "BEING", "BELLY", "BELOW",
  "BENCH", "BERRY", "BIRTH", "BLACK", "BLADE", "BLAME", "BLANK", "BLAST", "BLEED", "BLEND",
  "BLESS", "BLIND", "BLOCK", "BLOOD", "BLOOM", "BLOWN", "BLUES", "BLUNT", "BOARD", "BOAST",
  "BONUS", "BOOST", "BOOTH", "BOUND", "BOXER", "BRAND", "BRASS", "BRAVE", "BREAD", "BREAK",
  "BREED", "BRICK", "BRIDE", "BRIEF", "BRING", "BROAD", "BROKE", "BROOM", "BROWN", "BRUSH",
  "BUILD", "BUNCH", "BURNS", "BURST", "BUYER", "CABLE", "CAMEL", "CANDY", "CARGO", "CARRY",
  "CARVE", "CATCH", "CAUSE", "CHAIN", "CHALK", "CHAMP", "CHANT", "CHAOS", "CHARM", "CHART",
  "CHASE", "CHEAP", "CHEAT", "CHECK", "CHEEK", "CHEER", "CHESS", "CHEST", "CHIEF", "CHILD",
  "CHILL", "CHINA", "CHORD", "CHOSE", "CHUNK", "CIVIC", "CIVIL", "CLAIM", "CLASH", "CLASS",
  "CLEAN", "CLEAR", "CLERK", "CLICK", "CLIFF", "CLIMB", "CLING", "CLOCK", "CLOSE", "CLOTH",
  "COACH", "COAST", "COLOR", "COUCH", "COUGH", "COUNT", "COURT", "COVER", "CRACK", "CRAFT",
  "CRANE", "CRASH", "CRAWL", "CRAZY", "CREAM", "CREEK", "CREEP", "CRIME", "CROSS", "CROWD",
  "CROWN", "CRUDE", "CRUEL", "CRUSH", "CURVE", "CYCLE", "DAIRY", "DATED", "DEALT", "DEATH",
  "DEBUT", "DECAY", "DECOR", "DELAY", "DENSE", "DEPOT", "DEPTH", "DERBY", "DEVIL", "DIARY",
  "DIRTY", "DISCO", "DITCH", "DODGE", "DOING", "DOUBT", "DOUGH", "DOZEN", "DRAFT", "DRAIN",
  "DRAMA", "DRANK", "DRAWN", "DREAD", "DRESS", "DRIED", "DRIFT", "DRILL", "DRINK", "DRIVE"
];

// Get today's word (based on date for consistency)
export const getTodaysWord = () => {
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return WORDS[diffDays % WORDS.length];
};

// Check if a word is valid
export const isValidWord = (word) => {
  return VALID_GUESSES.includes(word.toUpperCase());
};
