import { Injectable } from '@angular/core';

export interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
}

export interface LessonContent {
  title: string;
  text: string;
  code: string | null;
}

export interface LessonData {
  content: LessonContent[];
  quiz: QuizQuestion[];
  activity: {
    title: string;
    description: string;
    type: 'code' | 'reflection' | 'challenge' | 'debug';
    prompt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private lessonData: { [id: number]: LessonData } = {

    1: {
      content: [
        { title: 'What is Programming?', text: 'Programming is the process of giving instructions to a computer. Just like a recipe tells a chef what to do step by step, a program tells a computer what actions to perform.', code: null },
        { title: 'Your First Program', text: 'The classic first program in any language prints "Hello, World!" to the screen. This verifies your environment is working and introduces output.', code: '// JavaScript / TypeScript\nconsole.log("Hello, World!");\n\n// Output:\n// Hello, World!' },
        { title: 'How Computers Think', text: 'Computers process instructions sequentially — one at a time, top to bottom. They are incredibly fast but only do exactly what you tell them.', code: null }
      ],
      quiz: [
        { question: 'What is programming?', choices: ['Designing hardware', 'Giving instructions to a computer', 'Building websites only', 'Using a calculator'], correctIndex: 1 },
        { question: 'What does console.log() do in JavaScript?', choices: ['Saves a file', 'Prints output to the console', 'Declares a variable', 'Creates a loop'], correctIndex: 1 },
        { question: 'In what order does a computer process instructions?', choices: ['Randomly', 'Bottom to top', 'Sequentially, top to bottom', 'Only even-numbered lines'], correctIndex: 2 }
      ],
      activity: {
        title: '🖊️ Reflection Activity',
        description: 'Think about your daily life and programming.',
        type: 'reflection',
        prompt: 'Describe 3 real-life tasks that work like a program (step-by-step instructions). For example: making coffee, tying shoelaces. Write them out as numbered steps.'
      }
    },

    2: {
      content: [
        { title: 'What are Variables?', text: 'A variable is a named container that stores a value. Think of it like a labeled box — you can put something in it, look at it, or replace it.', code: 'let name = "Cyrus";\nlet age = 20;\nlet isStudent = true;\n\nconsole.log(name); // "Cyrus"\nconsole.log(age);  // 20' },
        { title: 'Data Types', text: 'Every value has a type. The most common types are: string (text), number (numeric), boolean (true/false), and null/undefined (empty).', code: 'let text: string = "Hello";\nlet count: number = 42;\nlet isActive: boolean = false;\nlet nothing: null = null;' },
        { title: 'const vs let vs var', text: 'Use const for values that never change, let for values that will change, and avoid var in modern code as it has confusing scoping rules.', code: 'const PI = 3.14159; // never changes\nlet score = 0;      // will change\nscore = 100;        // ✅ allowed\n// PI = 3; // ❌ error!' }
      ],
      quiz: [
        { question: 'Which keyword should you use for a value that never changes?', choices: ['var', 'let', 'const', 'static'], correctIndex: 2 },
        { question: 'What data type is the value "Hello, World!"?', choices: ['number', 'boolean', 'string', 'null'], correctIndex: 2 },
        { question: 'What will console.log(typeof 42) output?', choices: ['"string"', '"number"', '"boolean"', '"integer"'], correctIndex: 1 }
      ],
      activity: {
        title: '💻 Code Challenge',
        description: 'Practice declaring variables.',
        type: 'code',
        prompt: 'Write variables to represent a student profile:\n1. A const for their student ID\n2. A let for their current grade\n3. A let for their name\n4. A boolean for whether they passed\n\nThen log all four to the console.'
      }
    },

    3: {
      content: [
        { title: 'Making Decisions', text: 'Programs need to make decisions based on conditions. The if/else statement lets your code choose different paths depending on whether a condition is true or false.', code: 'let score = 85;\n\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C or below");\n}' },
        { title: 'Comparison Operators', text: 'To make conditions, you use comparison operators: === (equals), !== (not equals), > (greater than), < (less than), >= and <=.', code: 'console.log(5 === 5);  // true\nconsole.log(5 !== 3);  // true\nconsole.log(10 > 3);   // true\nconsole.log(2 >= 2);   // true' },
        { title: 'Logical Operators', text: 'Combine conditions using && (AND), || (OR), and ! (NOT). AND requires both to be true, OR requires at least one, NOT flips the value.', code: 'let age = 20;\nlet hasID = true;\n\nif (age >= 18 && hasID) {\n  console.log("Access granted");\n}' }
      ],
      quiz: [
        { question: 'Which operator checks if two values are strictly equal?', choices: ['==', '===', '=', '!='], correctIndex: 1 },
        { question: 'What does the && operator require?', choices: ['At least one condition true', 'Both conditions to be true', 'Neither condition to be true', 'Only the first condition'], correctIndex: 1 },
        { question: 'What will this output? if (false || true) { console.log("Yes") }', choices: ['Nothing', 'false', 'Yes', 'Error'], correctIndex: 2 }
      ],
      activity: {
        title: '🐛 Debug Challenge',
        description: 'Find and fix the bugs in this code.',
        type: 'debug',
        prompt: 'Fix the bugs in this code:\n\nlet temp = 35;\n\nif temp > 30 {\n  console.log("Hot day!");\n} else if (temp = 20) {\n  console.log("Nice day!");\n} else {\n  console.log("Cold day!");\n}\n\nHint: There are 2 bugs. What are they?'
      }
    },

    4: {
      content: [
        { title: 'Why Loops?', text: 'Loops let you repeat code without writing it multiple times. Instead of writing console.log 100 times, a loop does it in 3 lines.', code: '// Without loop — tedious:\nconsole.log(1);\nconsole.log(2);\nconsole.log(3);\n\n// With loop — clean:\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}' },
        { title: 'For Loop', text: 'The for loop has 3 parts: initialization (start), condition (when to stop), and increment (how to count). It runs as long as the condition is true.', code: 'for (let i = 0; i < 5; i++) {\n  console.log("Step " + i);\n}\n// Output: Step 0, Step 1, Step 2, Step 3, Step 4' },
        { title: 'While Loop', text: 'A while loop runs as long as a condition is true. Use it when you do not know in advance how many times to loop.', code: 'let hp = 100;\n\nwhile (hp > 0) {\n  console.log("HP: " + hp);\n  hp -= 25; // take damage\n}\nconsole.log("Defeated!");' }
      ],
      quiz: [
        { question: 'How many times will this run? for (let i = 0; i < 3; i++)', choices: ['2', '3', '4', 'Infinite'], correctIndex: 1 },
        { question: 'What is the risk of a while loop?', choices: ['It runs too fast', 'It may create an infinite loop if condition never becomes false', 'It cannot use variables', 'It only works with numbers'], correctIndex: 1 },
        { question: 'What does i++ mean?', choices: ['Decrease i by 1', 'Multiply i by itself', 'Increase i by 1', 'Reset i to 0'], correctIndex: 2 }
      ],
      activity: {
        title: '💻 Code Challenge',
        description: 'Write loops to solve these problems.',
        type: 'code',
        prompt: 'Write the following using loops:\n1. Print numbers 1 to 10\n2. Print only even numbers from 1 to 20\n3. Use a while loop to simulate a countdown from 5 to 0\n4. BONUS: Print the multiplication table of 3 (3x1 to 3x10)'
      }
    },

    5: {
      content: [
        { title: 'What is a Function?', text: 'A function is a reusable block of code that performs a specific task. You define it once and call it as many times as needed.', code: '// Define the function\nfunction greet(name: string): string {\n  return "Hello, " + name + "!";\n}\n\n// Call the function\nconsole.log(greet("Cyrus")); // Hello, Cyrus!' },
        { title: 'Parameters & Return Values', text: 'Functions can accept inputs (parameters) and send back outputs (return values). This makes them flexible and reusable.', code: 'function add(a: number, b: number): number {\n  return a + b;\n}\n\nlet result = add(5, 3);\nconsole.log(result); // 8' },
        { title: 'Arrow Functions', text: 'Arrow functions are a shorter syntax for writing functions. They are commonly used in modern JavaScript and TypeScript.', code: '// Regular function\nfunction square(n: number): number {\n  return n * n;\n}\n\n// Arrow function — same thing!\nconst square = (n: number): number => n * n;\n\nconsole.log(square(4)); // 16' }
      ],
      quiz: [
        { question: 'What keyword is used to send a value back from a function?', choices: ['send', 'output', 'return', 'yield'], correctIndex: 2 },
        { question: 'What are function inputs called?', choices: ['returns', 'parameters', 'outputs', 'variables'], correctIndex: 1 },
        { question: 'Which is a valid arrow function in TypeScript?', choices: ['func add(a,b) => a+b', 'const add = (a,b) => a+b', 'arrow add(a,b) { a+b }', 'function => (a+b)'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Function Challenge',
        description: 'Build a mini calculator using functions.',
        type: 'challenge',
        prompt: 'Create the following functions:\n1. add(a, b) — returns sum\n2. subtract(a, b) — returns difference\n3. multiply(a, b) — returns product\n4. divide(a, b) — returns quotient (handle division by zero!)\n5. BONUS: A calculate(a, b, operation) function that calls the right one based on a string like "add" or "multiply"'
      }
    },

    6: {
      content: [
        { title: 'What is an Array?', text: 'An array stores multiple values in a single variable, ordered by index starting at 0. Think of it like a numbered list.', code: 'let fruits: string[] = ["apple", "banana", "mango"];\n\nconsole.log(fruits[0]); // "apple"\nconsole.log(fruits[2]); // "mango"\nconsole.log(fruits.length); // 3' },
        { title: 'Array Methods', text: 'Arrays have powerful built-in methods: push (add), pop (remove last), map (transform), filter (select), and find (search).', code: 'let nums = [1, 2, 3, 4, 5];\n\nlet doubled = nums.map(n => n * 2);\n// [2, 4, 6, 8, 10]\n\nlet evens = nums.filter(n => n % 2 === 0);\n// [2, 4]' },
        { title: 'Looping Through Arrays', text: 'Use for...of or forEach to iterate through every item in an array cleanly.', code: 'let ranks = ["E", "D", "C", "B", "A", "S"];\n\nfor (let rank of ranks) {\n  console.log("Rank: " + rank);\n}\n\n// Or with index:\nranks.forEach((rank, i) => {\n  console.log(i + ": " + rank);\n});' }
      ],
      quiz: [
        { question: 'What index is the first element of an array?', choices: ['1', '-1', '0', 'First'], correctIndex: 2 },
        { question: 'Which method adds an element to the END of an array?', choices: ['add()', 'push()', 'insert()', 'append()'], correctIndex: 1 },
        { question: 'What does .filter() return?', choices: ['The first matching element', 'A new array with elements that pass the test', 'The index of matched elements', 'A boolean'], correctIndex: 1 }
      ],
      activity: {
        title: '💻 Array Manipulation Challenge',
        description: 'Practice array methods.',
        type: 'code',
        prompt: 'Given this array: let scores = [45, 78, 92, 61, 88, 34, 95, 71];\n\n1. Find all scores above 70\n2. Double every score using map()\n3. Find the first score above 90\n4. Calculate the average score\n5. BONUS: Sort the scores from highest to lowest'
      }
    },

    7: {
      content: [
        { title: 'Classes & Objects', text: 'OOP models real-world things as objects with properties (data) and methods (actions). A class is a blueprint; an object is an instance created from it.', code: 'class Hunter {\n  name: string;\n  rank: string;\n  exp: number;\n\n  constructor(name: string) {\n    this.name = name;\n    this.rank = "E";\n    this.exp = 0;\n  }\n\n  gainExp(amount: number): void {\n    this.exp += amount;\n    console.log(`${this.name} gained ${amount} EXP!`);\n  }\n}' },
        { title: 'Creating Objects', text: 'Use the new keyword to create an object from a class. Each object is independent — changing one does not affect another.', code: 'let hunter1 = new Hunter("Cyrus");\nlet hunter2 = new Hunter("Ding Dong");\n\nhunter1.gainExp(100);\nconsole.log(hunter1.exp); // 100\nconsole.log(hunter2.exp); // 0 — independent!' },
        { title: 'Inheritance', text: 'A class can extend another class to inherit its properties and methods, then add or override behavior.', code: 'class SRankHunter extends Hunter {\n  shadowArmy: string[] = [];\n\n  summon(shadow: string): void {\n    this.shadowArmy.push(shadow);\n    console.log(`${shadow} added to army!`);\n  }\n}' }
      ],
      quiz: [
        { question: 'What is a class in OOP?', choices: ['An instance of an object', 'A blueprint for creating objects', 'A type of variable', 'A built-in function'], correctIndex: 1 },
        { question: 'What keyword creates an object from a class?', choices: ['create', 'make', 'new', 'build'], correctIndex: 2 },
        { question: 'What does inheritance allow?', choices: ['Two classes to share the same instance', 'A class to receive properties from another class', 'Objects to delete themselves', 'Functions to return classes'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 OOP Design Challenge',
        description: 'Design a class system.',
        type: 'challenge',
        prompt: 'Design a class system for Scholar\'s Ascent:\n1. Create a Scholar class with: name, rank, exp, completedLessons[]\n2. Add a method: completeLesson(lessonName, expReward)\n3. Add a method: getRankTitle() that returns their rank name\n4. Create a ShadowScholar class that extends Scholar\n5. Add a special ability method to ShadowScholar\n6. Instantiate both and test all methods'
      }
    },

    8: {
      content: [
        { title: 'Why Handle Errors?', text: 'Programs encounter unexpected situations — files not found, bad user input, network failures. Without error handling, your program crashes. With it, you can recover gracefully.', code: null },
        { title: 'Try / Catch / Finally', text: 'Wrap risky code in a try block. If an error occurs, the catch block runs. The finally block always runs, regardless of success or failure.', code: 'try {\n  let result = riskyOperation();\n  console.log("Success:", result);\n} catch (error) {\n  console.error("Something went wrong:", error);\n} finally {\n  console.log("This always runs");\n}' },
        { title: 'Throwing Custom Errors', text: 'You can throw your own errors using the throw keyword to signal specific problems in your code.', code: 'function divide(a: number, b: number): number {\n  if (b === 0) {\n    throw new Error("Cannot divide by zero!");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 0));\n} catch (e) {\n  console.error(e.message);\n}' }
      ],
      quiz: [
        { question: 'What block contains code that might throw an error?', choices: ['catch', 'finally', 'try', 'throw'], correctIndex: 2 },
        { question: 'When does the finally block run?', choices: ['Only on success', 'Only on error', 'Always, regardless of success or failure', 'Never automatically'], correctIndex: 2 },
        { question: 'What keyword creates a custom error?', choices: ['raise', 'error', 'throw', 'catch'], correctIndex: 2 }
      ],
      activity: {
        title: '🐛 Error Handling Challenge',
        description: 'Add proper error handling to broken code.',
        type: 'debug',
        prompt: 'The following function crashes on bad input. Rewrite it with proper try/catch and input validation:\n\nfunction getUserAge(input: string): number {\n  return parseInt(input);\n}\n\nFix it so that:\n1. It throws a descriptive error if input is not a number\n2. It throws an error if age is negative or over 150\n3. The caller uses try/catch to handle errors gracefully\n4. Finally block logs "Validation complete"'
      }
    },

    9: {
      content: [
        { title: 'Why TypeScript?', text: 'TypeScript adds static typing to JavaScript. This means you declare what type each variable should be, and TypeScript catches type errors before your code runs.', code: '// JavaScript — no type safety\nlet score = "100";\nscore + 50; // "10050" — bug!\n\n// TypeScript — type safe\nlet score: number = 100;\nscore + 50; // 150 — correct!' },
        { title: 'Interfaces', text: 'Interfaces define the shape of an object — what properties it must have and their types. This makes your code self-documenting and catches mistakes early.', code: 'interface Hunter {\n  name: string;\n  rank: string;\n  exp: number;\n  isActive: boolean;\n}\n\nconst hunter: Hunter = {\n  name: "Cyrus",\n  rank: "E",\n  exp: 0,\n  isActive: true\n};' },
        { title: 'Generics', text: 'Generics let you write reusable code that works with any type while keeping type safety. Think of it as a type placeholder.', code: 'function getFirst<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconsole.log(getFirst<number>([1, 2, 3]));   // 1\nconsole.log(getFirst<string>(["a","b"]));   // "a"' }
      ],
      quiz: [
        { question: 'What does TypeScript add to JavaScript?', choices: ['Faster runtime', 'Static typing', 'New HTML elements', 'Built-in databases'], correctIndex: 1 },
        { question: 'What does an interface define?', choices: ['A UI element', 'The shape/structure of an object', 'A class method', 'An API endpoint'], correctIndex: 1 },
        { question: 'What is a generic in TypeScript?', choices: ['A variable without type', 'A type placeholder for reusable code', 'A special class', 'An error type'], correctIndex: 1 }
      ],
      activity: {
        title: '💻 TypeScript Typing Challenge',
        description: 'Add proper types to untyped code.',
        type: 'code',
        prompt: 'Convert this plain JavaScript to TypeScript with proper types:\n\nfunction createProfile(name, age, rank, skills) {\n  return {\n    name: name,\n    age: age,\n    rank: rank,\n    skills: skills,\n    joinDate: new Date()\n  };\n}\n\nSteps:\n1. Create a HunterProfile interface\n2. Type all parameters\n3. Set the return type\n4. Add a generic that lets skills be any array type'
      }
    },

    10: {
      content: [
        { title: 'What is Recursion?', text: 'Recursion is when a function calls itself. It solves problems by breaking them into smaller versions of the same problem. Every recursive function needs a base case to stop.', code: 'function countdown(n: number): void {\n  if (n <= 0) {          // base case\n    console.log("Go!");\n    return;\n  }\n  console.log(n);\n  countdown(n - 1);      // recursive call\n}\n\ncountdown(3); // 3, 2, 1, Go!' },
        { title: 'Factorial Example', text: 'Factorial (n!) is the classic recursion example. 5! = 5 × 4 × 3 × 2 × 1. The recursive definition: n! = n × (n-1)!', code: 'function factorial(n: number): number {\n  if (n <= 1) return 1;          // base case\n  return n * factorial(n - 1);  // recursive case\n}\n\nconsole.log(factorial(5)); // 120' },
        { title: 'When to Use Recursion', text: 'Use recursion for tree traversal, nested structures, and divide-and-conquer algorithms. Avoid it for simple loops — iteration is often faster.', code: null }
      ],
      quiz: [
        { question: 'What is a base case in recursion?', choices: ['The first call to the function', 'The condition that stops recursion', 'The return value', 'The parameter type'], correctIndex: 1 },
        { question: 'What happens without a base case?', choices: ['The function returns 0', 'The function runs once', 'Infinite recursion and stack overflow', 'TypeScript catches the error'], correctIndex: 2 },
        { question: 'What is factorial(3)?', choices: ['3', '6', '9', '12'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Recursion Challenge',
        description: 'Solve these problems recursively.',
        type: 'challenge',
        prompt: 'Solve using recursion only (no loops allowed!):\n1. Sum of array: sumArray([1,2,3,4,5]) → 15\n2. Power function: power(2, 8) → 256\n3. Fibonacci: fib(7) → 13 (0,1,1,2,3,5,8,13...)\n4. BONUS: Flatten nested array: flatten([1,[2,[3,[4]]]]) → [1,2,3,4]'
      }
    },

    11: {
      content: [
        { title: 'Why Sorting Matters', text: 'Sorting is one of the most fundamental operations in computer science. Sorted data is easier to search, display, and process. Different algorithms have different speeds.', code: null },
        { title: 'Bubble Sort', text: 'Bubble sort repeatedly swaps adjacent elements that are in the wrong order. Simple but slow — O(n²) time complexity.', code: 'function bubbleSort(arr: number[]): number[] {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}' },
        { title: 'Built-in Sort', text: 'JavaScript has a built-in .sort() method. By default it sorts as strings — always provide a comparator for numbers.', code: 'let nums = [64, 25, 12, 22, 11];\n\n// Wrong — sorts as strings!\nnums.sort();\n\n// Correct — numeric sort\nnums.sort((a, b) => a - b);\nconsole.log(nums); // [11, 12, 22, 25, 64]' }
      ],
      quiz: [
        { question: 'What does bubble sort do in each pass?', choices: ['Finds the minimum', 'Swaps adjacent elements in wrong order', 'Divides array in half', 'Removes duplicates'], correctIndex: 1 },
        { question: 'What does .sort((a, b) => a - b) do?', choices: ['Sorts descending', 'Sorts ascending numerically', 'Removes negatives', 'Shuffles the array'], correctIndex: 1 },
        { question: 'What is the time complexity of bubble sort?', choices: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctIndex: 2 }
      ],
      activity: {
        title: '💻 Sorting Challenge',
        description: 'Implement and compare sorting algorithms.',
        type: 'code',
        prompt: 'Given: let data = [64, 34, 25, 12, 22, 11, 90];\n\n1. Sort ascending using built-in sort\n2. Sort descending using built-in sort\n3. Implement selection sort from scratch\n4. Write a function that returns only unique values from the array\n5. BONUS: Find the median value of the sorted array'
      }
    },

    12: {
      content: [
        { title: 'The Problem with Synchronous Code', text: 'JavaScript runs synchronously by default — one line at a time. But tasks like fetching data from a server take time. Without async handling, your entire app freezes while waiting.', code: '// This would freeze the browser:\nlet data = fetchFromServer(); // waits...\nconsole.log(data); // only runs after fetch completes' },
        { title: 'Promises', text: 'A Promise represents a future value — something that will be available eventually. It can be pending, fulfilled, or rejected.', code: 'function fetchData(): Promise<string> {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve("Data loaded!");\n    }, 1000);\n  });\n}\n\nfetchData()\n  .then(data => console.log(data))\n  .catch(err => console.error(err));' },
        { title: 'Async / Await', text: 'Async/await is syntactic sugar over Promises that makes async code look synchronous. Mark a function with async, then use await to wait for a Promise.', code: 'async function loadData(): Promise<void> {\n  try {\n    let data = await fetchData();\n    console.log(data);\n  } catch (error) {\n    console.error("Failed:", error);\n  }\n}' }
      ],
      quiz: [
        { question: 'What are the three states of a Promise?', choices: ['start, middle, end', 'pending, fulfilled, rejected', 'loading, done, error', 'open, processing, closed'], correctIndex: 1 },
        { question: 'What does the await keyword do?', choices: ['Creates a new Promise', 'Pauses execution until the Promise resolves', 'Rejects a Promise', 'Cancels an async operation'], correctIndex: 1 },
        { question: 'What must a function be marked as to use await inside it?', choices: ['static', 'async', 'defer', 'promise'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Async Challenge',
        description: 'Practice async/await patterns.',
        type: 'challenge',
        prompt: 'Build an async data fetcher:\n1. Create an async function that simulates fetching a user profile (use setTimeout wrapped in a Promise)\n2. Create another that fetches their scores\n3. Use Promise.all() to fetch both simultaneously\n4. Handle errors with try/catch\n5. BONUS: Add a loading state variable that is true while fetching and false when done'
      }
    }
  };

  getLessonData(lessonId: number): LessonData | null {
    return this.lessonData[lessonId] ?? null;
  }

  getQuiz(lessonId: number): QuizQuestion[] {
    return this.lessonData[lessonId]?.quiz ?? [];
  }

  getContent(lessonId: number): LessonContent[] {
    return this.lessonData[lessonId]?.content ?? [];
  }
}