const usersSeed = [
  {
    email: "sarah@gmail.com",
    fullName: "Sarah Johnson", 
    age: 28,
    birthdate: "1996-02-15",
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/31.jpg",
    role: "user",
    bio: "Adventure seeker and coffee enthusiast. Love hiking, photography, and trying new restaurants. Looking for someone who shares my passion for life and exploration!"
  },
  {
    email: "emma@gmail.com",
    fullName: "Emma Wilson",
    age: 24,
    birthdate: "2000-05-20", 
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/35.jpg",
    role: "user",
    bio: "Bookworm and aspiring chef. When I'm not reading or experimenting in the kitchen, you can find me at local music venues. Seeking someone who appreciates good food and thoughtful conversations."
  },
  {
    email: "olivia@gmail.com", 
    fullName: "Olivia Davis",
    age: 26,
    birthdate: "1998-09-10",
    gender: "Transgender",
    profilePhoto: "https://randomuser.me/api/portraits/women/42.jpg",
    role: "user",
    bio: "Art teacher by day, painter by night. Passionate about self-expression and creativity. Looking for someone open-minded who can appreciate both the canvas and the artist."
  },
  {
    email: "sophia@gmail.com",
    fullName: "Sophia Miller",
    age: 29,
    birthdate: "1995-03-25",
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/57.jpg",
    role: "user",
    bio: "Yoga instructor and wellness advocate. Believe in maintaining balance in life. Seeking a partner who values personal growth and healthy living as much as I do."
  },
  {
    email: "james@gmail.com",
    fullName: "James Smith",
    age: 30,
    birthdate: "1994-07-12",
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "user",
    bio: "Software engineer with a love for outdoor adventures. When not coding, I'm either rock climbing or planning my next hiking trip. Looking for someone to share these adventures with."
  },
  {
    email: "michael@gmail.com",
    fullName: "Michael Brown",
    age: 27,
    birthdate: "1997-11-30",
    gender: "Transgender",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "user",
    bio: "Music producer and amateur astronomer. Fascinated by both the beats of music and the mysteries of the universe. Seeking someone who can appreciate life's different rhythms."
  },
  {
    email: "william@gmail.com",
    fullName: "William Taylor",
    age: 32,
    birthdate: "1992-04-05",
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "user",
    bio: "Environmental lawyer fighting for a better planet. Love cycling, gardening, and reducing my carbon footprint. Looking for someone who shares my passion for sustainability."
  },
  {
    email: "daniel@gmail.com",
    fullName: "Daniel Anderson",
    age: 29,
    birthdate: "1995-08-18",
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/15.jpg",
    role: "user",
    bio: "Professional chef who loves traveling and discovering new cuisines. Always ready for spontaneous food adventures. Seeking a fellow foodie who enjoys culinary exploration."
  },
];

const questionsSeed = [
  {
    question: "Do you have children?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Do you want more children?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Do your children live with you?",
    answers: ["Yes", "No", "Weekends", "N/A"]
  },
  {
    question: "Are you open to dating someone with children?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question:
      "Would you allow your significant other to discipline your children?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "How do you discipline your children?",
    answers: ["Spank", "Talk", "Timeout", "N/A"]
  },
  {
    question: "Which is most important?",
    answers: [
      "Love",
      "Financial freedom",
      "Personal happiness",
      "Success",
      "Health",
      "All"
    ]
  },
  {
    question: "Sex before marriage?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Interracial dating?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Would you date someone with disabilities?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Is good/satisfactory sex a priority?",
    answers: ["You", "Them", "Both", "No"]
  },
  {
    question: "Which are you seeking?",
    answers: [
      "Serious relationship",
      "Friendship",
      "Marriage",
      "See what happens"
    ]
  },
  {
    question: "Do you believe in divorce?",
    answers: ["Yes", "No", "It depends"]
  },
  {
    question: "Pets?",
    answers: ["Yes", "No", "I don't know"]
  },
  {
    question: "Allergy to pets?",
    answers: ["Yes", "No", "Maybe", "I don't know"]
  },
  {
    question: "Do you smoke?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Is it okay if they smoke?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Do you drink?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Is it okay if they drink?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Do you indulge in illicit substances?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Is it okay for them to indulge in illicit substances?",
    answers: ["Occasionally", "Often", "During special events", "Never"]
  },
  {
    question: "Do you have friends of the opposite sex?",
    answers: ["Yes", "No"]
  },
  {
    question: "Is it okay for them to have friends of the opposite sex?",
    answers: ["Yes", "No"]
  },
  {
    question: "Are you financially stable?",
    answers: ["Yes", "No"]
  },
  {
    question: "Does your date need to be financially stable?",
    answers: ["Yes", "No"]
  },
  {
    question: "How would you and your match financially build?",
    answers: [
      "Joint account",
      "Separate account",
      "Combo joint/separate",
      "IDK"
    ]
  },
  {
    question: "What manner do you make important decisions?",
    answers: ["Emotion", "Head", "Heart", "All"]
  },
  {
    question: "Are you an:",
    answers: ["Introvert", "Extrovert", "Some of both"]
  },
  {
    question: "Social activity:",
    answers: ["Homebody", "Adventurous", "High Maintenance", "Pragmatic"]
  },
  {
    question: "My attention:",
    answers: [
      "Be my peace",
      "Lets have fun",
      "Accomplish goals",
      "Keep me stimulated"
    ]
  },
  {
    question:
      "Does the zodiac sign of a date have a profound effect of your connection with them?",
    answers: ["Yes", "No"]
  },
  {
    question: "Do you welcome or accept criticism openly in a relationship?",
    answers: ["Yes", "No"]
  },
  {
    question: "If something is bothering you:",
    answers: ["Expect them to know", "Tell them", "Shut down"]
  },
  {
    question: "Do you:",
    answers: [
      "Communicate openly",
      "Expect your significant other to initiate conversation"
    ]
  },
  {
    question: "Communication preference:",
    answers: ["Face-to-face", "Text", "Calls", "Follow-ups when free"]
  },
  {
    question: "Your mood:",
    answers: [
      "Do not push me",
      "Laid back",
      "Timid",
      "Great as long as I'm happy"
    ]
  },
  {
    question: "Are you seeking someone that is:",
    answers: ["Alpha", "Laid back", "Open", "Gentle"]
  },
  {
    question: "Which characteristic are you most judgmental about:",
    answers: ["Weight", "Height", "Hygiene", "Financial status"]
  },
  {
    question:
      'In your opinion, what is the appropriate time to say, "I love you"?',
    answers: [
      "After 3 months",
      "After 6 months",
      "After 1 year",
      "Whenever we feel like expressing"
    ]
  },
  {
    question:
      "Do you have religious beliefs that impact your dating/relationships?",
    answers: ["Yes", "No"]
  },
  {
    question: "At what point do you close your Club Kismet account?",
    answers: [
      "After weeks of talking",
      "After first date",
      "When you feel like it",
      "When the relationship is official"
    ]
  },
  {
    question: "When I have done something wrong I:",
    answers: [
      "Apologize, accept responsibility and consequences",
      "Expect to be forgiven",
      "Brush it off"
    ]
  },
  {
    question: "Food preferences:",
    answers: ["Vegan", "Vegetarian", "No Pork", "No preference", "Other"]
  },
  {
    question: "Your significant other must be:",
    answers: ["Vegan", "Vegetarian", "No Pork", "No preference", "Other"]
  },
  {
    question: "Do you have traditional or modern values?",
    answers: ["Yes", "No"]
  },
  {
    question:
      "Would you mind if your significant other went through your phone?",
    answers: [
      "Don't mind it",
      "Feel violated",
      "Shows lack of trust",
      "Shows insecurity"
    ]
  },
  {
    question: "Who moves/relocates?",
    answers: ["You", "Them", "Mutual", "Neither"]
  },
  {
    question: "Contributions in dating:",
    answers: ["50/50", "Spoil me", "Spoil them", "Does not matter"]
  },
  {
    question: "Are relationships worth repairing?",
    answers: ["Yes", "No"]
  },
  {
    question: "Define friendship first in dating:",
    answers: ["No sex", "Taking it slow", "Testing compatibility", "All"]
  }
];

const criteriaSeed = [
  {
    question: "Status",
    answers: ["Single", "Divorce", "Married", "Widow/Widower", "Situationship"],
  },
  {
    question: "Sexual Orientation",
    answers: ["Straight", "Gay/Lesbian/Bi"],
  },
  {
    question: "Race",
    answers: ["Caucasian", "Black/African descent", "Latin/Hispanic", "Asian", "Indian", "Other"],
  },
  {
    question: "Height",
    answers: ["4-5ft", "5-6ft", "6-7ft"],
  },
  {
    question: "Body type",
    answers: ["Slim", "Average", "Fit", "Superfluous"],
  },
  {
    question: "Religion",
    answers: ["Christian", "Jewish", "Muslim", "Buddhist", "Other", "Non practicing"],
  },
];

module.exports = { questionsSeed, usersSeed, criteriaSeed };
