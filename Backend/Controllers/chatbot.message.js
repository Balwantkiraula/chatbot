 import User from '../Models/user.model.js';
 import Bot from '../Models/bot.model.js';
 export const message = async (req, res) => {
    try{
        const text = req.body.text;
        if(!text.trim()){
            return res.status(400).json({message: 'text field is required'});
        }
        const user = await User.create({
            sender: 'user',
            text
        });
        //data
        const botResponses =  {
            "hello": "Hello! How can I help you today?",
            "hi": "Hi there! What can I do for you?",
            "hey": "Hey! How are you?",
            "good morning": "Good morning! Have a great day ahead!",
            "good night": "Good night! Take care.",
            "how are you": "I'm doing great! How about you?",
            "what is your name": "My name is ChatBot Assistant!",
            "who are you": "I'm your friendly chatbot, here to help you!",
            "thank you": "You're welcome!",
            "thanks": "Glad I could help!",
            "bye": "Goodbye! Take care!",
            "goodbye": "See you soon!",
            "what can you do": "I can chat with you and answer general questions.",
            
            "what is earth": "Earth is the third planet from the Sun.",
            "how many continents": "There are 7 continents in the world.",
            "how many countries": "There are 195 countries in the world.",
            "largest ocean": "The Pacific Ocean is the largest.",
            "highest mountain": "Mount Everest is the highest mountain.",
            "longest river": "The Nile is often considered the longest river.",
          
            "what is gravity": "Gravity is a force that pulls objects toward each other.",
            "what is photosynthesis": "It is the process plants use to convert sunlight into energy.",
            "what is water": "Water is H2O, made of hydrogen and oxygen.",
            "why is sky blue": "Because of scattering of sunlight in the atmosphere.",
            "speed of light": "About 299,792 km per second.",
          
            "what should i eat": "Something healthy like fruits or a balanced meal.",
            "how to study": "Study in small sessions and avoid distractions.",
            "how to focus": "Remove distractions and take short breaks.",
            "how to be happy": "Practice gratitude and spend time with loved ones.",
            "how to sleep better": "Avoid screens before bed and relax your mind.",
            "how to reduce stress": "Try deep breathing or meditation.",
            "how to stay healthy": "Eat well, exercise, and sleep properly.",
          
            "what is weather": "Weather is the condition of the atmosphere.",
            "what is climate": "Climate is long-term weather patterns.",
            "why does it rain": "When clouds get heavy and droplets fall due to gravity.",
          
            "your favourite food": "I don't eat, but I hear pizza is great!",
            "what should i cook": "Try making something simple like dal-rice.",
            "is tea good": "Tea is fine in moderation.",
          
            "best places in india": "Goa, Manali, Ladakh, Kerala, and Jaipur.",
            
            "headache remedy": "Drink water, rest, and avoid screens.",
            "cold treatment": "Stay warm and drink warm liquids.",
            "fever remedy": "Rest well and stay hydrated.",
          
            "do you love me": "I care for everyone equally!",
            "are you real": "I exist digitally, but I'm here to help!",
            "do you have feelings": "I don't have feelings, but I try to be kind!",
          
            "tell me a joke": "Why don’t scientists trust atoms? Because they make up everything!",
            "tell me a fact": "Honey never spoils.",
            "tell me something interesting": "Octopuses have three hearts.",
            "tell me a fun fact": "Bananas are berries, but strawberries are not!",
          
            "motivate me": "You are capable of amazing things!",
            "give motivation": "Keep going—success is close!",
            "i am sad": "I’m here for you. Stay strong.",
            "i am stressed": "Take a deep breath. You're doing great.",
          
            "what is internet": "The internet is a global network of connected computers.",
            "what is computer": "A computer is a machine that processes data.",
            "what is mobile": "A mobile is a portable communication device.",
            "what is wifi": "Wi-Fi allows wireless internet access.",
          
            "what is school": "School is a place where students learn and grow.",
            "what is homework": "Homework is practice after learning in class.",
            "how to improve english": "Read daily and practice speaking.",
          
            "what is life": "Life is a journey full of learning.",
            "what is love": "Love is a strong feeling of affection.",
            "what is happiness": "Happiness is a state of joy and contentment.",
          
            "fun fact": "Smiling reduces stress and boosts mood.",
            
            // Additional Greetings
            "good afternoon": "Good afternoon! Hope you're having a wonderful day!",
            "good evening": "Good evening! How can I assist you?",
            "morning": "Good morning! Ready for a great day?",
            "afternoon": "Good afternoon! What's on your mind?",
            "evening": "Good evening! How can I help?",
            "nice to meet you": "Nice to meet you too! I'm here to help.",
            "pleasure": "The pleasure is all mine!",
            "see you": "See you later! Take care!",
            "talk to you later": "Sure! Talk to you later!",
            "take care": "You too! Take care!",
            
            // More Geography
            "capital of india": "New Delhi is the capital of India.",
            "capital of usa": "Washington D.C. is the capital of the USA.",
            "capital of uk": "London is the capital of the United Kingdom.",
            "capital of france": "Paris is the capital of France.",
            "capital of japan": "Tokyo is the capital of Japan.",
            "capital of china": "Beijing is the capital of China.",
            "largest country": "Russia is the largest country by area.",
            "smallest country": "Vatican City is the smallest country.",
            "most populated country": "China and India are the most populated countries.",
            "what is asia": "Asia is the largest continent on Earth.",
            "what is africa": "Africa is the second largest continent.",
            "what is europe": "Europe is a continent in the Northern Hemisphere.",
            "what is america": "America refers to North and South America continents.",
            "deepest ocean": "The Pacific Ocean is also the deepest.",
            "largest desert": "The Sahara Desert is the largest hot desert.",
            "coldest place": "Antarctica is the coldest place on Earth.",
            
            // More Science
            "what is atom": "An atom is the smallest unit of matter.",
            "what is molecule": "A molecule is made of two or more atoms.",
            "what is energy": "Energy is the ability to do work.",
            "what is electricity": "Electricity is the flow of electric charge.",
            "what is magnet": "A magnet attracts certain metals like iron.",
            "what is light": "Light is a form of electromagnetic radiation.",
            "what is sound": "Sound is vibrations that travel through air.",
            "what is heat": "Heat is a form of energy that makes things warm.",
            "what is cold": "Cold is the absence of heat energy.",
            "what is oxygen": "Oxygen is a gas we need to breathe.",
            "what is carbon dioxide": "Carbon dioxide is a gas we exhale.",
            "what is dna": "DNA carries genetic information in living things.",
            "what is cell": "A cell is the basic unit of life.",
            "what is evolution": "Evolution is how species change over time.",
            "what is solar system": "The solar system includes the Sun and planets.",
            "how many planets": "There are 8 planets in our solar system.",
            "what is moon": "The Moon is Earth's natural satellite.",
            "what is sun": "The Sun is a star at the center of our solar system.",
            "what is star": "A star is a glowing ball of hot gas.",
            "what is galaxy": "A galaxy is a huge collection of stars.",
            
            // More Health & Wellness
            "how to lose weight": "Eat balanced meals, exercise regularly, and stay hydrated.",
            "how to gain weight": "Eat nutritious foods and do strength training.",
            "how to exercise": "Start with light activities and gradually increase intensity.",
            "benefits of exercise": "Exercise improves mood, strength, and overall health.",
            "how to meditate": "Find a quiet place, sit comfortably, and focus on breathing.",
            "how to relax": "Take deep breaths, listen to music, or go for a walk.",
            "how to be confident": "Practice self-care, set goals, and believe in yourself.",
            "how to be productive": "Plan your day, prioritize tasks, and take breaks.",
            "how to manage time": "Create a schedule and stick to it.",
            "how to wake up early": "Go to bed early and set a consistent alarm.",
            "benefits of sleep": "Sleep helps your body and mind recover and recharge.",
            "how much water to drink": "Aim for 8 glasses or about 2 liters per day.",
            "benefits of water": "Water keeps you hydrated and helps your body function.",
            "how to quit smoking": "Seek support, use alternatives, and stay determined.",
            "how to build muscle": "Eat protein, do strength training, and rest well.",
            
            // More Food & Cooking
            "healthy breakfast": "Try eggs, fruits, oatmeal, or whole grain toast.",
            "healthy lunch": "Include vegetables, protein, and whole grains.",
            "healthy dinner": "A balanced meal with protein, veggies, and carbs.",
            "benefits of fruits": "Fruits provide vitamins, fiber, and natural sugars.",
            "benefits of vegetables": "Vegetables are rich in vitamins and minerals.",
            "what is protein": "Protein helps build and repair body tissues.",
            "what is carbohydrate": "Carbohydrates provide energy to your body.",
            "what is vitamin": "Vitamins are nutrients your body needs to function.",
            "benefits of exercise": "Exercise improves physical and mental health.",
            "how to make tea": "Boil water, add tea leaves, steep, and add milk/sugar if desired.",
            "how to make coffee": "Brew coffee grounds with hot water.",
            "best fruits": "Apples, bananas, oranges, berries are all great choices.",
            "best vegetables": "Spinach, broccoli, carrots, and bell peppers are nutritious.",
            
            // More Technology
            "what is ai": "AI (Artificial Intelligence) is computer systems that can think and learn.",
            "what is machine learning": "Machine learning is AI that learns from data.",
            "what is programming": "Programming is writing code to create software.",
            "what is coding": "Coding is writing instructions for computers.",
            "what is software": "Software is programs that run on computers.",
            "what is hardware": "Hardware is physical parts of a computer.",
            "what is app": "An app is a software application for mobile devices.",
            "what is website": "A website is a collection of web pages on the internet.",
            "what is browser": "A browser is software to access the internet.",
            "what is email": "Email is electronic mail sent over the internet.",
            "what is social media": "Social media are platforms for sharing and connecting online.",
            "what is cloud": "Cloud computing stores data and runs programs online.",
            "what is password": "A password is a secret code to protect your accounts.",
            "how to stay safe online": "Use strong passwords and be careful what you share.",
            
            // More Education
            "how to learn": "Practice regularly, ask questions, and stay curious.",
            "how to remember": "Use repetition, make connections, and review regularly.",
            "how to take notes": "Write key points, use headings, and review them later.",
            "how to prepare for exam": "Study regularly, practice questions, and get enough sleep.",
            "how to write essay": "Plan your ideas, write an outline, then draft and revise.",
            "how to read faster": "Practice regularly and avoid subvocalization.",
            "how to concentrate": "Remove distractions and focus on one task at a time.",
            "best study techniques": "Active recall, spaced repetition, and practice tests work well.",
            "how to learn math": "Practice problems regularly and understand concepts.",
            "how to learn language": "Practice daily, speak with others, and immerse yourself.",
            "what is education": "Education is the process of learning and gaining knowledge.",
            "importance of education": "Education opens doors and helps you grow.",
            
            // More Entertainment & Fun
            "tell me another joke": "Why did the scarecrow win an award? He was outstanding in his field!",
            "another joke": "What do you call a bear with no teeth? A gummy bear!",
            "more jokes": "Why don't eggs tell jokes? They'd crack each other up!",
            "random fact": "A group of flamingos is called a flamboyance.",
            "interesting fact": "Sharks have been around longer than trees.",
            "cool fact": "Wombat poop is cube-shaped!",
            "weird fact": "A day on Venus is longer than its year.",
            "amazing fact": "There are more possible chess games than atoms in the universe.",
            "surprising fact": "Humans share 50% of DNA with bananas.",
            
            // More Motivation & Support
            "i feel down": "It's okay to feel down. Remember, this feeling will pass.",
            "i am tired": "Rest is important. Take a break and recharge.",
            "i am worried": "Take deep breaths. Focus on what you can control.",
            "i am anxious": "Try deep breathing exercises. You're stronger than you think.",
            "i am confused": "It's okay to be confused. Take it one step at a time.",
            "i am scared": "Fear is natural. You can overcome it step by step.",
            "i need help": "I'm here to help! What do you need?",
            "i am lonely": "You're not alone. Reach out to friends or family.",
            "i am bored": "Try a new hobby, read a book, or go for a walk.",
            "i am angry": "Take a moment to breathe. It's okay to feel angry.",
            "believe in yourself": "You have the strength to achieve your goals!",
            "you can do it": "Yes, you absolutely can! Keep pushing forward!",
            "stay positive": "Positivity attracts positive outcomes. Stay strong!",
            
            // More Life & Philosophy
            "what is success": "Success is achieving your goals and being happy.",
            "what is failure": "Failure is a learning opportunity, not the end.",
            "what is friendship": "Friendship is a bond of trust and care between people.",
            "what is family": "Family are people who love and support you.",
            "what is respect": "Respect is treating others with kindness and consideration.",
            "what is kindness": "Kindness is being caring and helpful to others.",
            "what is patience": "Patience is staying calm while waiting.",
            "what is courage": "Courage is facing fears and challenges bravely.",
            "what is wisdom": "Wisdom is knowledge gained through experience.",
            "what is truth": "Truth is what is real and honest.",
            "what is beauty": "Beauty is found in many forms, inside and out.",
            "what is art": "Art is creative expression in various forms.",
            "what is music": "Music is organized sound that expresses emotion.",
            "what is culture": "Culture is the customs and beliefs of a group.",
            "what is tradition": "Tradition is customs passed down through generations.",
            
            // More Weather & Nature
            "what is snow": "Snow is frozen water that falls as white flakes.",
            "what is wind": "Wind is moving air caused by temperature differences.",
            "what is thunder": "Thunder is the sound caused by lightning.",
            "what is lightning": "Lightning is an electrical discharge in the sky.",
            "what is cloud": "Clouds are water vapor condensed in the sky.",
            "what is rainbow": "A rainbow appears when sunlight hits water droplets.",
            "why is sun hot": "The Sun is a star that produces heat through nuclear fusion.",
            "what is season": "Seasons are periods of the year with different weather.",
            "how many seasons": "There are 4 seasons: spring, summer, autumn, and winter.",
            "what is spring": "Spring is the season when flowers bloom.",
            "what is summer": "Summer is the warmest season of the year.",
            "what is autumn": "Autumn is when leaves change color and fall.",
            "what is winter": "Winter is the coldest season of the year.",
            
            // More Travel & Places
            "best places to visit": "Paris, Tokyo, New York, Dubai, and London are popular.",
            "places to visit in india": "Taj Mahal, Varanasi, Rishikesh, and Hampi are must-see.",
            "what to pack for travel": "Pack clothes, toiletries, documents, and essentials.",
            "how to plan trip": "Choose destination, book tickets, find accommodation, and plan activities.",
            "best time to travel": "Depends on destination, but spring and autumn are often ideal.",
            
            // More Medical & Remedies
            "stomach ache": "Drink water, rest, and avoid heavy foods.",
            "back pain": "Rest, apply heat or cold, and do gentle stretches.",
            "sore throat": "Gargle with warm salt water and stay hydrated.",
            "cough remedy": "Drink warm liquids and honey can help soothe.",
            "how to stop sneezing": "Avoid allergens and try pinching your nose.",
            "how to boost immunity": "Eat well, exercise, sleep enough, and manage stress.",
            "when to see doctor": "See a doctor if symptoms persist or worsen.",
            "importance of health": "Good health is the foundation of a happy life.",
            
            // More General Knowledge
            "what is time": "Time is a measure of duration and sequence of events.",
            "what is space": "Space is the vast area beyond Earth's atmosphere.",
            "what is universe": "The universe is everything that exists.",
            "how old is earth": "Earth is about 4.5 billion years old.",
            "how old is universe": "The universe is about 13.8 billion years old.",
            "what is history": "History is the study of past events.",
            "what is geography": "Geography is the study of Earth's features.",
            "what is science": "Science is the study of the natural world.",
            "what is mathematics": "Mathematics is the study of numbers and patterns.",
            "what is language": "Language is a system of communication.",
            "how many languages": "There are over 7,000 languages in the world.",
            "most spoken language": "Mandarin Chinese is the most spoken language.",
            "what is currency": "Currency is money used in a country.",
            "what is economy": "Economy is how a country manages its resources.",
            
            // More Conversational
            "what are you doing": "I'm here chatting with you! How about you?",
            "what do you think": "I think you're doing great! Keep it up!",
            "can you help": "Of course! I'm here to help you.",
            "do you understand": "Yes, I understand! How can I assist?",
            "are you sure": "I do my best to help, but I'm always learning!",
            "that's interesting": "I'm glad you find it interesting!",
            "i agree": "Great! It's nice to be on the same page.",
            "i disagree": "That's okay! Everyone has different opinions.",
            "maybe": "Take your time to think about it.",
            "i don't know": "That's okay! We can figure it out together.",
            "what should i do": "Think about your options and choose what feels right.",
            "give me advice": "I'd suggest taking things one step at a time.",
            "what do you recommend": "I recommend doing what makes you happy and healthy.",
            "that's helpful": "I'm glad I could help!",
            "you're welcome": "Happy to help anytime!",
            "no problem": "Anytime! Feel free to ask more.",
            "sure": "Great! Let me know how I can help.",
            "okay": "Sounds good! What would you like to know?",
            "yes": "Wonderful! How can I assist you further?",
            "no": "That's fine! Is there something else I can help with?",

            // HTML
"what is html": "HTML stands for HyperText Markup Language, used to structure webpages.",
"what is tag in html": "A tag is a markup element used to define the structure of HTML content.",
"what is html element": "An HTML element consists of an opening tag, content, and a closing tag.",
"what is attribute in html": "Attributes provide additional information about HTML elements.",
"what is doctype": "<!DOCTYPE html> tells the browser that the document is HTML5.",
"what is div": "<div> is a block-level container used to group elements.",
"what is span": "<span> is an inline container used for small text styling.",
"what is semantic html": "Semantic HTML uses meaningful tags like <header>, <footer>, and <article>.",
"what is html5": "HTML5 is the latest version of HTML with multimedia and semantic features.",
"what is iframe": "<iframe> embeds another webpage inside your web page.",
"what is form": "<form> is used to collect user input.",
"what is input tag": "The <input> tag is used to take user data like text, email, password, etc.",
"what is meta tag": "Meta tags provide metadata like charset, description, viewport, etc.",

// CSS
"what is css": "CSS stands for Cascading Style Sheets, used to style HTML pages.",
"what is selector": "A selector targets HTML elements to apply styles.",
"what is class in css": "A class is used to style multiple elements using '.classname'.",
"what is id in css": "An ID uniquely identifies an element using '#id'.",
"what is flexbox": "Flexbox is a layout model for aligning items in 1D.",
"what is grid": "CSS Grid is a 2D layout system for rows and columns.",
"what is padding": "Padding is the space inside an element between the content and border.",
"what is margin": "Margin is the space outside an element between the element and others.",
"what is border": "Border is the outline around padding and content.",
"what is media query": "Media queries make webpages responsive based on screen size.",
"what is z-index": "z-index controls stacking order of positioned elements.",
"what is css variable": "Custom properties defined using --variableName.",
"what is box model": "Box model includes margin, border, padding, and content.",

// JavaScript
"what is javascript": "JavaScript is a programming language used to add interactivity to websites.",
"what is variable": "A variable stores data and can be declared using var, let, or const.",
"what is function": "A function is a block of code designed to perform a task.",
"what is array": "An array stores multiple values in a single variable.",
"what is object": "An object stores key-value pairs.",
"what is promise": "A Promise represents an asynchronous operation's result.",
"what is async await": "Async/await is used to handle asynchronous code more easily.",
"what is dom": "DOM stands for Document Object Model, representing HTML as objects.",
"what is event listener": "Event listeners detect and respond to user actions.",
"what is api": "API allows communication between different software applications.",
"what is json": "JSON is a format for storing and transporting data.",
"what is hoisting": "Hoisting moves variable and function declarations to the top of their scope.",
"what is closure": "A closure is a function that remembers its outer scope variables.",

// React
"what is react": "React is a JavaScript library for building user interfaces.",
"what is component": "A component is a reusable piece of UI.",
"what is jsx": "JSX is a syntax that allows HTML-like code inside JavaScript.",
"what is props": "Props are used to pass data from parent to child components.",
"what is state": "State represents dynamic data that can change over time.",
"what is useState": "useState is a hook to create and manage state.",
"what is useEffect": "useEffect runs side effects like API calls or timers.",
"what is virtual dom": "Virtual DOM is a lightweight copy of the real DOM for faster updates.",
"what is routing in react": "Routing allows navigating between different pages in a React app.",
"what is redux": "Redux is a state management library for large applications.",
"what is component lifecycle": "The phases of mounting, updating, and unmounting.",
"what is context api": "Context API provides global state without prop drilling.",
"what is react hook": "Hooks let you use state and other features without classes.",




          };
          const normalizedText = text.toLowerCase().trim();

          // First try exact match
          let botResponse = botResponses[normalizedText];
          
          // If no exact match, try to expand shorthand queries
          if (!botResponse) {
              // Check if it's a single word or short phrase (1-3 words)
              const words = normalizedText.split(/\s+/).filter(w => w.length > 0);
              
              // If it's a single word or short phrase, try expanding to "what is [term]"
              if (words.length <= 3 && normalizedText.length > 1) {
                  // Try "what is [term]" format (most common pattern)
                  const expandedQuery = `what is ${normalizedText}`;
                  botResponse = botResponses[expandedQuery];
                  
                  // If still no match, try other common patterns
                  if (!botResponse) {
                      // For single word queries, try to find matching keys
                      if (words.length === 1) {
                          // Try to find keys that end with this word (e.g., "html" matches "what is html")
                          const matchingKey = Object.keys(botResponses).find(key => {
                              const keyWords = key.toLowerCase().split(/\s+/);
                              // Check if the last word(s) match
                              return keyWords.slice(-1).join(' ') === normalizedText || 
                                     keyWords.slice(-2).join(' ') === normalizedText ||
                                     key.includes(normalizedText);
                          });
                          if (matchingKey) {
                              botResponse = botResponses[matchingKey];
                          }
                      } else if (words.length > 1) {
                          // For multi-word queries, try "what is [first word]" or "what is [all words]"
                          const firstWordQuery = `what is ${words[0]}`;
                          botResponse = botResponses[firstWordQuery];
                          
                          // Also try with all words
                          if (!botResponse) {
                              const allWordsQuery = `what is ${words.join(' ')}`;
                              botResponse = botResponses[allWordsQuery];
                          }
                      }
                  }
              }
          }
          
          // Default response if still no match
          if (!botResponse) {
              botResponse = 'I am not sure what you mean. Please try again.';
          }

       const bot = await Bot.create({
           text: botResponse
       });
       
       return res.status(200).json({
           userMessage: user.text,
           botMessage: bot.text,
       });
   }
   catch(error){
       console.log(error);
       return res.status(500).json({message: error.message});
   }
}
