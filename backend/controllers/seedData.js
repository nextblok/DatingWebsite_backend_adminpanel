const usersSeed = [
  {
    email: "sarah@gmail.com",
    fullName: "Sarah Johnson",
    age: 28,
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/31.jpg",
    role: "user",
  },
  {
    email: "emma@gmail.com",
    fullName: "Emma Wilson",
    age: 24,
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/35.jpg",
    role: "user",
  },
  {
    email: "olivia@gmail.com",
    fullName: "Olivia Davis",
    age: 26,
    gender: "Transgender",
    profilePhoto: "https://randomuser.me/api/portraits/women/42.jpg",
    role: "user",
  },
  {
    email: "sophia@gmail.com",
    fullName: "Sophia Miller",
    age: 29,
    gender: "Female",
    profilePhoto: "https://randomuser.me/api/portraits/women/57.jpg",
    role: "user",
  },
  {
    email: "james@gmail.com",
    fullName: "James Smith",
    age: 30,
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "user",
  },
  {
    email: "michael@gmail.com",
    fullName: "Michael Brown",
    age: 27,
    gender: "Transgender",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "user",
  },
  {
    email: "william@gmail.com",
    fullName: "William Taylor",
    age: 32,
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "user",
  },
  {
    email: "daniel@gmail.com",
    fullName: "Daniel Anderson",
    age: 29,
    gender: "Male",
    profilePhoto: "https://randomuser.me/api/portraits/men/15.jpg",
    role: "user",
  },
];

const questionsSeed = [
  {
    question: "Do you have children?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question: "Do you want more children?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question: "Do your children live with you?",
    answers: ["Yes", "No", "Weekends", "N/A"],
    weight: 50,
  },
  {
    question: "Are you open to dating someone with children?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question:
      "Would you allow your significant other to discipline your children?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question: "How do you discipline your children?",
    answers: ["Spank", "Talk", "Timeout", "N/A"],
    weight: 40,
  },
  {
    question: "Which is most important?",
    answers: [
      "Love",
      "Financial freedom",
      "Personal happiness",
      "Success",
      "Health",
      "All",
    ],
    weight: 60,
  },
  {
    question: "Sex before marriage?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question: "Interracial dating?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 50,
  },
  {
    question: "Would you date someone with disabilities?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 40,
  },
  {
    question: "Is good/satisfactory sex a priority?",
    answers: ["You", "Them", "Both", "No"],
    weight: 50,
  },
  {
    question: "Which are you seeking?",
    answers: [
      "Serious relationship",
      "Friendship",
      "Marriage",
      "See what happens",
    ],
    weight: 60,
  },
  {
    question: "Do you believe in divorce?",
    answers: ["Yes", "No", "It depends"],
    weight: 50,
  },
  {
    question: "Pets?",
    answers: ["Yes", "No", "I don't know"],
    weight: 30,
  },
  {
    question: "Allergy to pets?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    weight: 30,
  },
  {
    question: "Do you smoke?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Is it okay if they smoke?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Do you drink?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Is it okay if they drink?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Do you indulge in illicit substances?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Is it okay for them to indulge in illicit substances?",
    answers: ["Occasionally", "Often", "During special events", "Never"],
    weight: 40,
  },
  {
    question: "Do you have friends of the opposite sex?",
    answers: ["Yes", "No"],
    weight: 30,
  },
  {
    question: "Is it okay for them to have friends of the opposite sex?",
    answers: ["Yes", "No"],
    weight: 30,
  },
  {
    question: "Are you financially stable?",
    answers: ["Yes", "No"],
    weight: 50,
  },
  {
    question: "Does your date need to be financially stable?",
    answers: ["Yes", "No"],
    weight: 50,
  },
  {
    question: "How would you and your match financially build?",
    answers: [
      "Joint account",
      "Separate account",
      "Combo joint/separate",
      "IDK",
    ],
    weight: 40,
  },
  {
    question: "What manner do you make important decisions?",
    answers: ["Emotion", "Head", "Heart", "All"],
    weight: 40,
  },
  {
    question: "Are you an:",
    answers: ["Introvert", "Extrovert", "Some of both"],
    weight: 30,
  },
  {
    question: "Social activity:",
    answers: ["Homebody", "Adventurous", "High Maintenance", "Pragmatic"],
    weight: 40,
  },
  {
    question: "My attention:",
    answers: [
      "Be my peace",
      "Lets have fun",
      "Accomplish goals",
      "Keep me stimulated",
    ],
    weight: 40,
  },
  {
    question:
      "Does the zodiac sign of a date have a profound effect of your connection with them?",
    answers: ["Yes", "No"],
    weight: 30,
  },
  {
    question: "Do you welcome or accept criticism openly in a relationship?",
    answers: ["Yes", "No"],
    weight: 40,
  },
  {
    question: "If something is bothering you:",
    answers: ["Expect them to know", "Tell them", "Shut down"],
    weight: 50,
  },
  {
    question: "Do you:",
    answers: [
      "Communicate openly",
      "Expect your significant other to initiate conversation",
    ],
    weight: 50,
  },
  {
    question: "Communication preference:",
    answers: ["Face-to-face", "Text", "Calls", "Follow-ups when free"],
    weight: 40,
  },
  {
    question: "Your mood:",
    answers: [
      "Do not push me",
      "Laid back",
      "Timid",
      "Great as long as I'm happy",
    ],
    weight: 30,
  },
  {
    question: "Are you seeking someone that is:",
    answers: ["Alpha", "Laid back", "Open", "Gentle"],
    weight: 40,
  },
  {
    question: "Which characteristic are you most judgmental about:",
    answers: ["Weight", "Height", "Hygiene", "Financial status"],
    weight: 40,
  },
  {
    question:
      'In your opinion, what is the appropriate time to say, "I love you"?',
    answers: [
      "After 3 months",
      "After 6 months",
      "After 1 year",
      "Whenever we feel like expressing",
    ],
    weight: 40,
  },
  {
    question:
      "Do you have religious beliefs that impact your dating/relationships?",
    answers: ["Yes", "No"],
    weight: 50,
  },
  {
    question: "At what point do you close your Club Kismet account?",
    answers: [
      "After weeks of talking",
      "After first date",
      "When you feel like it",
      "When the relationship is official",
    ],
    weight: 30,
  },
  {
    question: "When I have done something wrong I:",
    answers: [
      "Apologize, accept responsibility and consequences",
      "Expect to be forgiven",
      "Brush it off",
    ],
    weight: 50,
  },
  {
    question: "Food preferences:",
    answers: ["Vegan", "Vegetarian", "No Pork", "No preference", "Other"],
    weight: 30,
  },
  {
    question: "Your significant other must be:",
    answers: ["Vegan", "Vegetarian", "No Pork", "No preference", "Other"],
    weight: 30,
  },
  {
    question: "Do you have traditional or modern values?",
    answers: ["Yes", "No"],
    weight: 40,
  },
  {
    question:
      "Would you mind if your significant other went through your phone?",
    answers: [
      "Don't mind it",
      "Feel violated",
      "Shows lack of trust",
      "Shows insecurity",
    ],
    weight: 40,
  },
  {
    question: "Who moves/relocates?",
    answers: ["You", "Them", "Mutual", "Neither"],
    weight: 40,
  },
  {
    question: "Contributions in dating:",
    answers: ["50/50", "Spoil me", "Spoil them", "Does not matter"],
    weight: 40,
  },
  {
    question: "Are relationships worth repairing?",
    answers: ["Yes", "No"],
    weight: 50,
  },
  {
    question: "Define friendship first in dating:",
    answers: ["No sex", "Taking it slow", "Testing compatibility", "All"],
    weight: 40,
  },
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
