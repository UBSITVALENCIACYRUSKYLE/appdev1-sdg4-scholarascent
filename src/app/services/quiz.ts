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
    },
    13: {
      content: [
        { title: 'What are Higher Order Functions?', text: 'A higher-order function either takes a function as an argument, returns a function, or both. They are a cornerstone of functional programming and make code more composable, readable, and testable.', code: '// Function that takes a function:\nfunction applyTwice(fn: (x: number) => number, value: number): number {\n  return fn(fn(value));\n}\n\nconst double = (x: number) => x * 2;\nconsole.log(applyTwice(double, 3)); // 12 (3*2=6, 6*2=12)\n\n// Function that returns a function:\nfunction multiplier(factor: number) {\n  return (x: number) => x * factor;\n}\nconst triple = multiplier(3);\nconsole.log(triple(5)); // 15' },
        { title: 'map, filter, reduce', text: 'These three array methods are the most important higher-order functions in JavaScript/TypeScript. Together they can replace most loops and make data transformation pipelines extremely readable.', code: 'let scores = [45, 78, 92, 61, 88, 34, 95];\n\n// map - transform each item:\nlet grades = scores.map(s => s >= 75 ? "Pass" : "Fail");\n\n// filter - keep matching items:\nlet passing = scores.filter(s => s >= 75);\n\n// reduce - combine into one value:\nlet total = scores.reduce((sum, s) => sum + s, 0);\nlet average = total / scores.length;\n\nconsole.log(grades);   // ["Fail","Pass","Pass","Fail","Pass","Fail","Pass"]\nconsole.log(passing);  // [78, 92, 88, 95]\nconsole.log(average);  // 70.43' },
        { title: 'Chaining Methods', text: 'One of the most powerful aspects of array methods is chaining — calling multiple methods in sequence. Each method returns a new array, allowing you to build readable data transformation pipelines.', code: 'let hunters = [\n  { name: "Solo", exp: 12000, active: true },\n  { name: "Beru", exp: 8000,  active: true },\n  { name: "Iron", exp: 500,   active: false },\n  { name: "Igris", exp: 9500, active: true },\n];\n\n// Chain: filter active → sort by exp → get names:\nlet topHunters = hunters\n  .filter(h => h.active)\n  .sort((a, b) => b.exp - a.exp)\n  .map(h => h.name);\n\nconsole.log(topHunters); // ["Solo", "Igris", "Beru"]' }
      ],
      quiz: [
        { question: 'What defines a higher-order function?', choices: ['A function with many parameters', 'A function that takes or returns other functions', 'A function that runs faster', 'A function defined in a class'], correctIndex: 1 },
        { question: 'What does .reduce() do to an array?', choices: ['Removes the last element', 'Filters elements by condition', 'Combines all elements into a single value', 'Sorts the elements'], correctIndex: 2 },
        { question: 'What does method chaining allow you to do?', choices: ['Call multiple methods on the same object in sequence', 'Speed up execution', 'Avoid using variables', 'Create new classes'], correctIndex: 0 }
      ],
      activity: {
        title: '💻 Functional Programming Challenge',
        description: 'Solve data transformation problems using higher-order functions.',
        type: 'code',
        prompt: 'Given this data:\n\nlet students = [\n  { name: "Ana", grade: 88, subject: "Math", year: 2 },\n  { name: "Ben", grade: 45, subject: "Science", year: 3 },\n  { name: "Cara", grade: 92, subject: "Math", year: 1 },\n  { name: "Dan", grade: 76, subject: "English", year: 2 },\n  { name: "Eve", grade: 55, subject: "Science", year: 1 },\n  { name: "Finn", grade: 98, subject: "Math", year: 3 },\n];\n\nUsing ONLY map/filter/reduce (no loops):\n\n1. Get names of students who PASSED (grade >= 75)\n\n2. Calculate the AVERAGE grade of all students\n\n3. Get a list of UNIQUE subjects\n   Hint: reduce into a Set, then spread to array\n\n4. Find the TOP student (highest grade)\n   Hint: reduce comparing grades\n\n5. BONUS: Group students by subject:\n   { Math: [...], Science: [...], English: [...] }\n   Use reduce to build this object'
      }
    },
 
    14: {
      content: [
        { title: 'Scope in JavaScript', text: 'Scope determines where variables are accessible in your code. JavaScript has three types: global scope (accessible everywhere), function scope (accessible within a function), and block scope (accessible within {} using let/const).', code: 'let globalVar = "I am global";\n\nfunction outer() {\n  let outerVar = "I am in outer";\n\n  function inner() {\n    let innerVar = "I am in inner";\n    console.log(globalVar);  // accessible\n    console.log(outerVar);   // accessible\n    console.log(innerVar);   // accessible\n  }\n\n  inner();\n  // console.log(innerVar); // ERROR - out of scope!\n}' },
        { title: 'What is a Closure?', text: 'A closure is a function that "remembers" the variables from its surrounding scope even after that scope has finished executing. This is one of the most powerful and unique features of JavaScript.', code: 'function makeCounter() {\n  let count = 0; // remembered by the closure\n\n  return function() {\n    count++;       // accesses outer variable\n    return count;\n  };\n}\n\nconst counter1 = makeCounter();\nconst counter2 = makeCounter(); // independent!\n\nconsole.log(counter1()); // 1\nconsole.log(counter1()); // 2\nconsole.log(counter1()); // 3\nconsole.log(counter2()); // 1 - its own count!' },
        { title: 'Practical Uses of Closures', text: 'Closures are used to create private variables, factory functions, memoization, and event handlers. They are the foundation of many advanced JavaScript patterns including module patterns and currying.', code: '// Private variable pattern:\nfunction createHunter(name: string) {\n  let privateExp = 0; // cannot be accessed directly\n\n  return {\n    gainExp: (amount: number) => {\n      privateExp += amount;\n      console.log(`${name} now has ${privateExp} EXP`);\n    },\n    getExp: () => privateExp\n  };\n}\n\nconst hunter = createHunter("Cyrus");\nhunter.gainExp(100);\nhunter.gainExp(50);\nconsole.log(hunter.getExp()); // 150\n// privateExp is inaccessible from outside!' }
      ],
      quiz: [
        { question: 'What is lexical scope?', choices: ['Scope determined at runtime', 'Scope determined by where code is written', 'Scope only inside classes', 'Scope that changes dynamically'], correctIndex: 1 },
        { question: 'What is a closure?', choices: ['A way to close a program', 'A function that remembers variables from its surrounding scope', 'A type of loop', 'A private class method'], correctIndex: 1 },
        { question: 'What makes closures useful for creating "private" variables?', choices: ['They encrypt the data', 'They are faster than regular variables', 'The inner variable cannot be accessed directly from outside the function', 'They use less memory'], correctIndex: 2 }
      ],
      activity: {
        title: '🏆 Closure Challenge',
        description: 'Build real-world features using closures.',
        type: 'challenge',
        prompt: 'Build these features using closures:\n\n1. createMultiplier(factor: number)\n   Returns a function that multiplies any number by factor\n   const double = createMultiplier(2);\n   const triple = createMultiplier(3);\n   console.log(double(5)); // 10\n   console.log(triple(5)); // 15\n\n2. createBankAccount(initialBalance: number)\n   Returns an object with:\n   - deposit(amount): increases balance\n   - withdraw(amount): decreases balance (reject if insufficient)\n   - getBalance(): returns current balance\n   Balance should be PRIVATE (not directly accessible)\n\n3. memoize(fn: Function)\n   Returns a memoized version of fn that caches results:\n   If called with the same argument again, return cached result\n   Add a console.log to show when cache is used vs computed\n\n4. BONUS: createGameTimer()\n   Returns start(), stop(), getElapsed() functions\n   Using Date.now() to track elapsed time'
      }
    },
 
    15: {
      content: [
        { title: 'What is a Linked List?', text: 'A linked list is a sequence of nodes where each node stores a value and a reference (pointer) to the next node. Unlike arrays, elements are not stored in contiguous memory — they can be anywhere, connected by pointers.', code: 'class Node<T> {\n  value: T;\n  next: Node<T> | null = null;\n\n  constructor(value: T) {\n    this.value = value;\n  }\n}\n\nclass LinkedList<T> {\n  head: Node<T> | null = null;\n  size: number = 0;\n}' },
        { title: 'Basic Linked List Operations', text: 'The main operations are: append (add to end), prepend (add to front), delete (remove a node), and traverse (visit each node). Each operation requires updating the next pointers of the affected nodes.', code: 'class LinkedList<T> {\n  head: Node<T> | null = null;\n  size: number = 0;\n\n  append(value: T): void {\n    const node = new Node(value);\n    if (!this.head) {\n      this.head = node;\n    } else {\n      let current = this.head;\n      while (current.next) {\n        current = current.next;\n      }\n      current.next = node;\n    }\n    this.size++;\n  }\n\n  print(): void {\n    let current = this.head;\n    let result = "";\n    while (current) {\n      result += current.value + " -> ";\n      current = current.next;\n    }\n    console.log(result + "null");\n  }\n}' },
        { title: 'Linked Lists vs Arrays', text: 'Arrays and linked lists have different strengths. Arrays offer O(1) random access by index. Linked lists offer O(1) insertion/deletion at the front. Choose based on your most common operation.', code: '// Array:\n// Access by index: O(1) - fast!\n// Insert at start: O(n) - slow, must shift all elements\n\n// Linked List:\n// Access by index: O(n) - slow, must traverse\n// Insert at start: O(1) - fast, just update head pointer\n\nconst list = new LinkedList<number>();\nlist.append(1);\nlist.append(2);\nlist.append(3);\nlist.print(); // 1 -> 2 -> 3 -> null' }
      ],
      quiz: [
        { question: 'What does each node in a linked list contain?', choices: ['Only a value', 'A value and a pointer to the next node', 'An index and a value', 'A key and a value pair'], correctIndex: 1 },
        { question: 'What is the time complexity of accessing an element by index in a linked list?', choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 2 },
        { question: 'When is a linked list preferred over an array?', choices: ['When you need fast random access', 'When you frequently insert or delete at the beginning', 'When you need to sort data often', 'When memory is unlimited'], correctIndex: 1 }
      ],
      activity: {
        title: '💻 Linked List Implementation',
        description: 'Build a complete linked list with essential methods.',
        type: 'code',
        prompt: 'Implement a complete LinkedList<T> class with these methods:\n\n1. append(value: T): void\n   Add a node to the END of the list\n\n2. prepend(value: T): void\n   Add a node to the FRONT of the list\n\n3. delete(value: T): boolean\n   Remove the first node with the given value\n   Return true if deleted, false if not found\n\n4. contains(value: T): boolean\n   Return true if value exists in the list\n\n5. toArray(): T[]\n   Convert the linked list to a regular array\n\n6. print(): void\n   Print the list as: "1 -> 2 -> 3 -> null"\n\nTest your implementation:\n- Create a list of numbers [1, 2, 3, 4, 5]\n- Prepend 0\n- Delete 3\n- Check if it contains 4\n- Convert to array and log it'
      }
    },
 
    16: {
      content: [
        { title: 'Stacks — LIFO', text: 'A stack follows Last-In-First-Out (LIFO) order — like a stack of plates. The last item placed is the first removed. Main operations: push (add to top), pop (remove from top), peek (view top without removing).', code: 'class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n\n  size(): number {\n    return this.items.length;\n  }\n}' },
        { title: 'Queues — FIFO', text: 'A queue follows First-In-First-Out (FIFO) order — like a line at a store. The first item added is the first removed. Main operations: enqueue (add to back), dequeue (remove from front), front (view front item).', code: 'class Queue<T> {\n  private items: T[] = [];\n\n  enqueue(item: T): void {\n    this.items.push(item);\n  }\n\n  dequeue(): T | undefined {\n    return this.items.shift();\n  }\n\n  front(): T | undefined {\n    return this.items[0];\n  }\n\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n\n  size(): number {\n    return this.items.length;\n  }\n}' },
        { title: 'Real-World Applications', text: 'Stacks are used for: undo/redo operations, browser back button, function call stack, and expression evaluation. Queues are used for: task scheduling, print queues, BFS graph traversal, and message passing systems.', code: '// Stack - undo feature:\nconst undoStack = new Stack<string>();\nundoStack.push("typed hello");\nundoStack.push("added comma");\nundoStack.push("deleted word");\n\nconsole.log(undoStack.pop()); // undo "deleted word"\nconsole.log(undoStack.pop()); // undo "added comma"\n\n// Queue - task scheduler:\nconst taskQueue = new Queue<string>();\ntaskQueue.enqueue("download file");\ntaskQueue.enqueue("process data");\ntaskQueue.enqueue("send email");\nconsole.log(taskQueue.dequeue()); // "download file" first' }
      ],
      quiz: [
        { question: 'What does LIFO stand for?', choices: ['Last Input, First Output', 'Last-In, First-Out', 'Linear Input, Fast Output', 'List Input, File Output'], correctIndex: 1 },
        { question: 'Which operation adds an item to the BACK of a queue?', choices: ['push()', 'enqueue()', 'append()', 'insert()'], correctIndex: 1 },
        { question: 'Which data structure is used for the browser BACK button?', choices: ['Queue', 'Array', 'Stack', 'Linked List'], correctIndex: 2 }
      ],
      activity: {
        title: '🏆 Stack & Queue Challenge',
        description: 'Build real-world applications using stacks and queues.',
        type: 'challenge',
        prompt: 'Build these applications:\n\n1. Balanced Brackets Checker (use a Stack):\n   function isBalanced(input: string): boolean\n   Return true if all (), [], {} are properly balanced\n   isBalanced("({[]})") → true\n   isBalanced("({[})") → false\n   isBalanced("{[()]}") → true\n\n2. Hot Potato Game (use a Queue):\n   function hotPotato(players: string[], count: number): string\n   Simulate passing a potato count times\n   Each pass dequeues front player and enqueues to back\n   After count passes, eliminate the current holder\n   Repeat until one player remains - return the winner\n   hotPotato(["Ana","Ben","Cara","Dan"], 3) → winner name\n\n3. BONUS: Implement a simple text editor with:\n   - type(char): add character (push to stack)\n   - undo(): remove last character (pop from stack)\n   - getText(): return current text\n   Test with at least 5 operations'
      }
    },
 
    17: {
      content: [
        { title: 'Inheritance Revisited', text: 'Inheritance creates an "is-a" relationship between classes. A child class inherits all properties and methods of its parent, then can add new ones or override existing ones. Use extends keyword in TypeScript.', code: 'class Animal {\n  name: string;\n  sound: string;\n\n  constructor(name: string, sound: string) {\n    this.name = name;\n    this.sound = sound;\n  }\n\n  speak(): string {\n    return `${this.name} says ${this.sound}`;\n  }\n}\n\nclass Dog extends Animal {\n  breed: string;\n\n  constructor(name: string, breed: string) {\n    super(name, "Woof"); // call parent constructor\n    this.breed = breed;\n  }\n\n  fetch(): string {\n    return `${this.name} fetches the ball!`;\n  }\n}' },
        { title: 'Polymorphism', text: 'Polymorphism means "many forms" — the same method name behaves differently depending on the object type. Override a parent method in a child class with different behavior while keeping the same interface.', code: 'class Shape {\n  getArea(): number {\n    return 0;\n  }\n\n  describe(): string {\n    return `Area: ${this.getArea()}`;\n  }\n}\n\nclass Circle extends Shape {\n  constructor(private radius: number) { super(); }\n\n  getArea(): number {\n    return Math.PI * this.radius ** 2;\n  }\n}\n\nclass Rectangle extends Shape {\n  constructor(private w: number, private h: number) { super(); }\n\n  getArea(): number {\n    return this.w * this.h;\n  }\n}\n\nconst shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];\nshapes.forEach(s => console.log(s.describe()));\n// Works on any Shape thanks to polymorphism!' },
        { title: 'Abstract Classes & Interfaces', text: 'Abstract classes cannot be instantiated directly — they exist only as blueprints for subclasses. Abstract methods must be implemented by every concrete subclass. Interfaces define a contract without any implementation.', code: 'abstract class Vehicle {\n  abstract getMaxSpeed(): number;  // must implement\n\n  describe(): string {             // shared implementation\n    return `Max speed: ${this.getMaxSpeed()} km/h`;\n  }\n}\n\nclass Car extends Vehicle {\n  getMaxSpeed(): number { return 200; }\n}\n\nclass Bicycle extends Vehicle {\n  getMaxSpeed(): number { return 40; }\n}\n\n// new Vehicle(); // ERROR - cannot instantiate abstract\nnew Car().describe(); // "Max speed: 200 km/h"' }
      ],
      quiz: [
        { question: 'What keyword calls the parent class constructor in TypeScript?', choices: ['parent()', 'base()', 'super()', 'inherit()'], correctIndex: 2 },
        { question: 'What is polymorphism?', choices: ['Multiple inheritance', 'The same method name behaving differently based on object type', 'A class with many properties', 'Combining two interfaces'], correctIndex: 1 },
        { question: 'What is true about abstract classes?', choices: ['They can be instantiated directly', 'They cannot have any implemented methods', 'They cannot be instantiated but can have both abstract and concrete methods', 'They are the same as interfaces'], correctIndex: 2 }
      ],
      activity: {
        title: '🏆 Polymorphism Design Challenge',
        description: 'Design a polymorphic shape calculator.',
        type: 'challenge',
        prompt: 'Design a polymorphic system:\n\n1. Create an abstract class Shape with:\n   - abstract getArea(): number\n   - abstract getPerimeter(): number\n   - abstract getName(): string\n   - describe(): string (concrete - uses the abstract methods)\n\n2. Implement these concrete classes:\n   - Circle(radius: number)\n   - Rectangle(width: number, height: number)\n   - Triangle(a: number, b: number, c: number)\n     (use Heron\'s formula for area)\n   - Square(side: number) - extends Rectangle\n\n3. Create an array of at least 6 shapes (mix of all types)\n\n4. Use polymorphism to:\n   - Find the shape with the LARGEST area\n   - Calculate TOTAL area of all shapes\n   - Print describe() for each shape\n\n5. BONUS: Add an interface Drawable with:\n   draw(): string that returns an ASCII representation'
      }
    },
 
    18: {
      content: [
        { title: 'What are Design Patterns?', text: 'Design patterns are proven, reusable solutions to commonly occurring problems in software design. They are not code — they are templates or blueprints that you adapt to your specific situation. There are three categories: Creational, Structural, and Behavioral.', code: null },
        { title: 'Singleton Pattern', text: 'The Singleton pattern ensures only ONE instance of a class ever exists. Useful for shared resources like database connections, configuration managers, or logging services. TypeScript makes this clean with a static instance property.', code: 'class GameState {\n  private static instance: GameState | null = null;\n  private score: number = 0;\n  private level: number = 1;\n\n  private constructor() {} // private prevents new GameState()\n\n  static getInstance(): GameState {\n    if (!GameState.instance) {\n      GameState.instance = new GameState();\n    }\n    return GameState.instance;\n  }\n\n  addScore(points: number): void { this.score += points; }\n  getScore(): number { return this.score; }\n}\n\nconst game1 = GameState.getInstance();\nconst game2 = GameState.getInstance();\ngame1.addScore(100);\nconsole.log(game2.getScore()); // 100 - same instance!' },
        { title: 'Observer Pattern', text: 'The Observer pattern defines a one-to-many relationship. When one object (Subject) changes state, all dependent objects (Observers) are notified automatically. This is the foundation of event systems and reactive programming.', code: 'interface Observer {\n  update(event: string, data: any): void;\n}\n\nclass EventEmitter {\n  private listeners: Map<string, Observer[]> = new Map();\n\n  on(event: string, observer: Observer): void {\n    if (!this.listeners.has(event)) {\n      this.listeners.set(event, []);\n    }\n    this.listeners.get(event)!.push(observer);\n  }\n\n  emit(event: string, data: any): void {\n    this.listeners.get(event)?.forEach(obs =>\n      obs.update(event, data)\n    );\n  }\n}' }
      ],
      quiz: [
        { question: 'What is the main purpose of design patterns?', choices: ['To make code run faster', 'To provide proven, reusable solutions to common problems', 'To replace TypeScript interfaces', 'To generate code automatically'], correctIndex: 1 },
        { question: 'What does the Singleton pattern guarantee?', choices: ['A class has many instances', 'Only one instance of a class exists', 'The class cannot be modified', 'The class inherits from Object'], correctIndex: 1 },
        { question: 'In the Observer pattern, what happens when the Subject changes state?', choices: ['All instances are deleted', 'All Observers are notified automatically', 'Only the first Observer is notified', 'The program pauses'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Design Pattern Challenge',
        description: 'Implement design patterns for a game system.',
        type: 'challenge',
        prompt: "Implement these design patterns for Scholar's Ascent:\n\n1. SINGLETON - NotificationManager:\n   - Only one instance allowed\n   - Methods: notify(message: string), getHistory(): string[]\n   - Stores last 10 notifications\n   - Test that two variables point to the same instance\n\n2. OBSERVER - Achievement System:\n   - Create an AchievementSystem (Subject) class\n   - Create at least 2 Observer classes:\n     * ScoreObserver: logs when EXP changes\n     * RankObserver: checks if rank should increase\n   - Emit events: 'exp-gained', 'lesson-completed'\n   - Demonstrate all observers being notified\n\n3. BONUS - FACTORY Pattern:\n   - Create a QuestFactory class with:\n     createQuest(type: 'lesson' | 'quiz' | 'daily'): Quest\n   - Each quest type has different expReward\n   - The factory decides which Quest subclass to create"
      }
    },
 
    19: {
      content: [
        { title: 'What is Binary Search?', text: 'Binary search is an efficient algorithm for finding an item in a SORTED array. Instead of checking every element (linear search, O(n)), it repeatedly halves the search space by comparing the target to the middle element. Time complexity: O(log n).', code: '// Linear search - O(n):\nfunction linearSearch(arr: number[], target: number): number {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n\n// Binary search - O(log n) - much faster!\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n  // ...continues next block\n}' },
        { title: 'Binary Search Implementation', text: 'Binary search works by maintaining a left and right pointer. Each iteration computes the midpoint and compares to the target. If target is smaller, search the left half. If larger, search the right half. Repeat until found or exhausted.', code: 'function binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n\n    if (arr[mid] === target) {\n      return mid;         // Found!\n    } else if (arr[mid] < target) {\n      left = mid + 1;     // Search right half\n    } else {\n      right = mid - 1;   // Search left half\n    }\n  }\n\n  return -1;             // Not found\n}\n\nconst sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];\nconsole.log(binarySearch(sorted, 23)); // 5\nconsole.log(binarySearch(sorted, 10)); // -1' },
        { title: 'Why O(log n) is Powerful', text: 'O(log n) means that doubling the array size only adds ONE more step. Searching 1 billion sorted items takes only ~30 comparisons with binary search, versus 1 billion comparisons with linear search. This is why sorted data matters.', code: '// Comparison of steps needed:\n// n=10:        log2(10) ≈ 3-4 steps\n// n=1,000:     log2(1000) ≈ 10 steps\n// n=1,000,000: log2(1M) ≈ 20 steps\n// n=1,000,000,000: log2(1B) ≈ 30 steps!\n\n// vs Linear Search:\n// n=1,000,000,000: up to 1 BILLION steps' }
      ],
      quiz: [
        { question: 'What is the time complexity of binary search?', choices: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correctIndex: 2 },
        { question: 'What is required for binary search to work correctly?', choices: ['The array must be unsorted', 'The array must be sorted', 'The array must have no duplicates', 'The array must have an odd number of elements'], correctIndex: 1 },
        { question: 'If binary search cannot find the target, what should it return?', choices: ['0', 'null', '-1', 'undefined'], correctIndex: 2 }
      ],
      activity: {
        title: '💻 Binary Search Challenge',
        description: 'Implement and apply binary search algorithms.',
        type: 'code',
        prompt: 'Implement these binary search variations:\n\n1. Standard binarySearch(arr: number[], target: number): number\n   Return the INDEX of target, or -1 if not found\n   Test: [1,3,5,7,9,11,13,15,17,19], target=11 → index 5\n\n2. binarySearchFirst(arr: number[], target: number): number\n   Return index of FIRST occurrence (array may have duplicates)\n   Test: [1,2,2,2,3,4,5], target=2 → index 1\n\n3. binarySearchLast(arr: number[], target: number): number\n   Return index of LAST occurrence\n   Test: [1,2,2,2,3,4,5], target=2 → index 3\n\n4. findInsertPosition(arr: number[], target: number): number\n   Return where target SHOULD be inserted to keep array sorted\n   Test: [1,3,5,7,9], target=6 → index 3\n\n5. BONUS: Recursive binary search implementation\n   binarySearchRecursive(arr, target, left, right): number\n   Add a "steps" counter to compare with iterative version'
      }
    },
 
    20: {
      content: [
        { title: 'What is a Graph?', text: 'A graph is a collection of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles and can be directed (one-way edges) or undirected (two-way edges). Graphs model networks, social connections, maps, and more.', code: '// Adjacency List representation:\nclass Graph {\n  private adjacencyList: Map<string, string[]> = new Map();\n\n  addVertex(vertex: string): void {\n    this.adjacencyList.set(vertex, []);\n  }\n\n  addEdge(v1: string, v2: string): void {\n    this.adjacencyList.get(v1)?.push(v2);\n    this.adjacencyList.get(v2)?.push(v1); // undirected\n  }\n\n  getNeighbors(vertex: string): string[] {\n    return this.adjacencyList.get(vertex) ?? [];\n  }\n}' },
        { title: 'Breadth-First Search (BFS)', text: 'BFS explores all neighbors at the current depth before going deeper. It uses a queue and guarantees finding the shortest path in an unweighted graph. Perfect for social network connections and shortest routes.', code: 'function bfs(graph: Graph, start: string): string[] {\n  const visited = new Set<string>();\n  const queue = [start];\n  const result: string[] = [];\n\n  visited.add(start);\n\n  while (queue.length > 0) {\n    const vertex = queue.shift()!; // dequeue\n    result.push(vertex);\n\n    for (const neighbor of graph.getNeighbors(vertex)) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor); // enqueue\n      }\n    }\n  }\n\n  return result;\n}' },
        { title: 'Depth-First Search (DFS)', text: 'DFS explores as far as possible along each branch before backtracking. It uses a stack (or recursion) and is useful for detecting cycles, topological sorting, and solving mazes. It does not guarantee shortest path.', code: 'function dfs(graph: Graph, start: string): string[] {\n  const visited = new Set<string>();\n  const result: string[] = [];\n\n  function explore(vertex: string): void {\n    visited.add(vertex);\n    result.push(vertex);\n\n    for (const neighbor of graph.getNeighbors(vertex)) {\n      if (!visited.has(neighbor)) {\n        explore(neighbor); // recursive DFS\n      }\n    }\n  }\n\n  explore(start);\n  return result;\n}' }
      ],
      quiz: [
        { question: 'What data structure does BFS use internally?', choices: ['Stack', 'Queue', 'Linked List', 'Tree'], correctIndex: 1 },
        { question: 'Which algorithm guarantees finding the shortest path in an unweighted graph?', choices: ['DFS', 'Binary Search', 'BFS', 'Bubble Sort'], correctIndex: 2 },
        { question: 'What does DFS use internally (or its recursive equivalent)?', choices: ['Queue', 'Array', 'Stack (or recursion call stack)', 'Hash Map'], correctIndex: 2 }
      ],
      activity: {
        title: '🏆 Graph Algorithm Challenge',
        description: 'Build and traverse a graph of hunter relationships.',
        type: 'challenge',
        prompt: "Build a complete graph system:\n\n1. Implement the Graph class with:\n   - addVertex(name: string)\n   - addEdge(v1: string, v2: string)\n   - getNeighbors(vertex: string): string[]\n   - hasVertex(vertex: string): boolean\n\n2. Implement BFS:\n   function bfs(graph, start): string[]\n   Return vertices in BFS order\n\n3. Implement DFS (recursive):\n   function dfs(graph, start): string[]\n   Return vertices in DFS order\n\n4. Build this hunter network:\n   Solo -- Beru -- Iron\n    |             |\n   Igris -- Tusk -- Kaisel\n    |     \\      |\n   Greed  Fangs--Min\n\n5. Run BFS and DFS from Solo and compare results\n\n6. BONUS: isConnected(graph): boolean\n   Return true if all vertices can be reached from any vertex\n   (graph is fully connected)"
      }
    },
 
    21: {
      content: [
        { title: 'What are Regular Expressions?', text: 'Regular expressions (regex) are patterns used to match, search, and manipulate text. They look cryptic at first but are incredibly powerful for validation, parsing, and text transformation tasks.', code: '// Basic regex syntax:\n// /pattern/flags\n\nconst emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\n\nconsole.log(emailRegex.test("user@email.com")); // true\nconsole.log(emailRegex.test("not-an-email"));   // false\n\n// test() - returns boolean\n// match() - returns matches\n// replace() - substitutes matches\n// split() - splits by pattern' },
        { title: 'Common Regex Patterns', text: 'Learn the most useful regex building blocks: character classes, quantifiers, anchors, and groups. These components combine to create powerful patterns for real-world validation.', code: '// Anchors:\n// ^ = start of string\n// $ = end of string\n\n// Character classes:\n// [a-z] = lowercase letters\n// [0-9] or \\d = digits\n// \\w = word chars (a-z, 0-9, _)\n// \\s = whitespace\n\n// Quantifiers:\n// * = 0 or more\n// + = 1 or more\n// ? = 0 or 1 (optional)\n// {3} = exactly 3\n// {2,5} = 2 to 5\n\n// Phone number:\nconst phone = /^\\+?[0-9]{10,13}$/;\nconsole.log(phone.test("+639123456789")); // true' },
        { title: 'Using Regex in TypeScript', text: 'TypeScript/JavaScript provides several string and regex methods for practical text processing. The replace method with regex is especially powerful for text transformation.', code: 'const text = "Hello World! Hello TypeScript!";\n\n// Replace all occurrences (g flag = global):\nconsole.log(text.replace(/Hello/g, "Hi"));\n// "Hi World! Hi TypeScript!"\n\n// Extract all matches:\nconst matches = text.match(/Hello/g);\nconsole.log(matches); // ["Hello", "Hello"]\n\n// Split by regex:\nconst words = text.split(/\\s+/);\nconsole.log(words); // ["Hello", "World!", ...]\n\n// Named groups:\nconst dateStr = "2026-05-13";\nconst dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconst result = dateStr.match(dateRegex);\nconsole.log(result?.groups?.year); // "2026"' }
      ],
      quiz: [
        { question: 'What does the ^ anchor mean in a regex pattern?', choices: ['End of string', 'Start of string', 'Any character', 'Not a character'], correctIndex: 1 },
        { question: 'What does the + quantifier mean?', choices: ['0 or more occurrences', '1 or more occurrences', 'Exactly 1 occurrence', 'Optional (0 or 1)'], correctIndex: 1 },
        { question: 'Which flag makes a regex match ALL occurrences in a string instead of just the first?', choices: ['i (case insensitive)', 'm (multiline)', 'g (global)', 's (dotAll)'], correctIndex: 2 }
      ],
      activity: {
        title: '💻 Regex Validation Challenge',
        description: 'Build a complete form validator using regular expressions.',
        type: 'code',
        prompt: 'Build a FormValidator class with these validation methods:\n\n1. isValidEmail(email: string): boolean\n   Valid: user@domain.com, user.name@sub.domain.org\n   Invalid: @domain.com, user@, user@domain\n\n2. isValidPassword(password: string): boolean\n   Must have: 8+ chars, 1 uppercase, 1 lowercase, 1 digit\n   Optionally: allow special chars (!@#$%)\n\n3. isValidPhoneNumber(phone: string): boolean\n   Accept: +63XXXXXXXXXX or 09XXXXXXXXX (Philippines format)\n\n4. isValidUsername(username: string): boolean\n   3-20 chars, only letters/numbers/underscores\n   Cannot start with a number\n\n5. sanitizeInput(input: string): string\n   Remove HTML tags: <b>bold</b> → bold\n   Trim extra whitespace\n\nTest each method with 3 valid and 3 invalid examples.\nLog pass/fail for each test case.'
      }
    },
 
    22: {
      content: [
        { title: 'JavaScript Modules', text: 'As projects grow, organizing code into separate files (modules) becomes essential. ES Modules use import/export syntax and are the standard in modern JavaScript and TypeScript. Each file is its own scope.', code: '// math.ts - exporting:\nexport const PI = 3.14159;\n\nexport function add(a: number, b: number): number {\n  return a + b;\n}\n\nexport default class Calculator {\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n}\n\n// main.ts - importing:\nimport Calculator, { PI, add } from "./math";\n\nconsole.log(PI);          // 3.14159\nconsole.log(add(2, 3));   // 5\nconst calc = new Calculator();\nconsole.log(calc.multiply(4, 5)); // 20' },
        { title: 'Named vs Default Exports', text: 'A module can have one default export (the main export) and multiple named exports. Named exports are imported with curly braces; default exports can be imported with any name you choose.', code: '// Named exports - must use the exact name:\nexport const version = "1.0.0";\nexport interface Config { debug: boolean; }\nexport function log(msg: string) { console.log(msg); }\n\n// Default export - can import with any name:\nexport default class App { run() {} }\n\n// Importing:\nimport MyApp from "./app";       // default - any name\nimport { version, log } from "./app"; // named - exact name\nimport * as App from "./app";    // import everything\nconsole.log(App.version);' },
        { title: 'TypeScript Path Aliases & Barrel Files', text: 'Barrel files (index.ts) re-export multiple modules from one entry point, simplifying imports. TypeScript path aliases in tsconfig.json allow clean imports instead of long relative paths.', code: '// Without barrel - messy imports:\nimport { Lesson } from "../../models/lesson.model";\nimport { User } from "../../models/user.model";\nimport { Quiz } from "../../models/quiz.model";\n\n// models/index.ts (barrel file):\nexport * from "./lesson.model";\nexport * from "./user.model";\nexport * from "./quiz.model";\n\n// With barrel - clean imports:\nimport { Lesson, User, Quiz } from "../../models";\n\n// tsconfig path alias:\n// "@models/*": ["src/app/models/*"]\nimport { Lesson } from "@models/lesson.model";' }
      ],
      quiz: [
        { question: 'How many default exports can a TypeScript module have?', choices: ['Unlimited', 'Exactly 2', 'Only 1', 'None'], correctIndex: 2 },
        { question: 'What syntax is used to import a named export?', choices: ['import name from module', 'import { name } from module', 'import <name> from module', 'require(name)'], correctIndex: 1 },
        { question: 'What is a barrel file (index.ts)?', choices: ['A file that compresses other files', 'A file that re-exports from multiple modules in one place', 'The main entry file of every Angular app', 'A TypeScript configuration file'], correctIndex: 1 }
      ],
      activity: {
        title: '💻 Module Organization Challenge',
        description: 'Refactor spaghetti code into a clean module structure.',
        type: 'code',
        prompt: 'Organize this messy code into proper TypeScript modules:\n\n// Everything is in one file currently:\nconst PI = 3.14159;\nfunction circleArea(r) { return PI * r * r; }\nfunction rectangleArea(w, h) { return w * h; }\nfunction triangleArea(b, h) { return 0.5 * b * h; }\n\nclass User { constructor(name, email) {...} }\nclass Admin extends User { constructor(name, email, role) {...} }\n\nfunction validateEmail(email) { ... }\nfunction validatePassword(password) { ... }\nfunction hashPassword(password) { ... }\n\nconst API_URL = "https://api.example.com";\nfunction fetchUsers() { ... }\nfunction fetchPosts() { ... }\n\nRefactor into this module structure:\n1. math/geometry.ts - geometry functions (typed)\n2. models/user.model.ts - User and Admin interfaces\n3. models/user.ts - User and Admin classes\n4. utils/validation.ts - validation functions\n5. utils/security.ts - password utilities\n6. api/config.ts - API constants\n7. api/endpoints.ts - fetch functions\n8. models/index.ts - barrel file\n9. utils/index.ts - barrel file\n10. main.ts - imports and uses everything\n\nAll code must be fully TypeScript typed.'
      }
    },
 
    23: {
      content: [
        { title: 'What are TypeScript Decorators?', text: 'Decorators are a TypeScript feature that lets you attach metadata and modify the behavior of classes, methods, properties, and parameters using a special @ syntax. They are heavily used in Angular for @Component, @Injectable, @Input, etc.', code: '// Enable in tsconfig.json:\n// "experimentalDecorators": true\n\n// A simple class decorator:\nfunction Logger(constructor: Function) {\n  console.log("Class created:", constructor.name);\n}\n\n@Logger\nclass HunterService {\n  getHunters() { return []; }\n}\n// Logs: "Class created: HunterService"' },
        { title: 'Method & Property Decorators', text: 'Method decorators can intercept method calls, add logging, measure timing, or enforce validation. Property decorators can add validation or transformation to class properties when they are set or accessed.', code: '// Method decorator - measure execution time:\nfunction MeasureTime(\n  target: any,\n  propertyKey: string,\n  descriptor: PropertyDescriptor\n) {\n  const original = descriptor.value;\n\n  descriptor.value = function(...args: any[]) {\n    const start = Date.now();\n    const result = original.apply(this, args);\n    const end = Date.now();\n    console.log(`${propertyKey} took ${end - start}ms`);\n    return result;\n  };\n\n  return descriptor;\n}\n\nclass DataService {\n  @MeasureTime\n  processData(data: any[]) {\n    // ... complex processing\n    return data.length;\n  }\n}' },
        { title: 'Decorator Factories', text: 'A decorator factory is a function that returns a decorator. This allows you to pass parameters to your decorators, making them configurable and more reusable across different contexts.', code: '// Decorator factory with parameter:\nfunction MinLength(min: number) {\n  return function(target: any, propertyKey: string) {\n    let value: string;\n\n    const getter = () => value;\n    const setter = (newVal: string) => {\n      if (newVal.length < min) {\n        throw new Error(\n          `${propertyKey} must be at least ${min} chars`\n        );\n      }\n      value = newVal;\n    };\n\n    Object.defineProperty(target, propertyKey, {\n      get: getter, set: setter\n    });\n  };\n}\n\nclass User {\n  @MinLength(3)\n  username: string = "";\n}' }
      ],
      quiz: [
        { question: 'What symbol is used to apply a decorator in TypeScript?', choices: ['#', '$', '@', '&'], correctIndex: 2 },
        { question: 'What TypeScript config must be enabled to use decorators?', choices: ['strictMode', 'experimentalDecorators', 'allowDecorators', 'useDecorators'], correctIndex: 1 },
        { question: 'What is a decorator factory?', choices: ['A class that creates decorators', 'A function that takes parameters and returns a decorator function', 'A built-in TypeScript feature', 'A design pattern for factories'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Decorator Implementation Challenge',
        description: 'Build useful TypeScript decorators for a real application.',
        type: 'challenge',
        prompt: 'Build these decorators (enable experimentalDecorators in tsconfig):\n\n1. @Singleton class decorator:\n   Ensures only one instance can be created\n   Second call to new returns the existing instance\n\n2. @Log method decorator:\n   Logs the method name, arguments, and return value\n   every time the method is called\n   Format: "[ClassName.methodName] args: [...] → result"\n\n3. @Validate(min: number, max: number) property decorator factory:\n   Throws an error if a number property is set outside the range\n   @Validate(0, 100)\n   score: number = 0; // throws if score = 150\n\n4. @Deprecated(message: string) method decorator factory:\n   Logs a console warning whenever the decorated method is called\n   The warning should include the custom message\n\n5. BONUS: @Memoize method decorator:\n   Caches the result of a method based on its arguments\n   Returns cached result on subsequent calls with same args\n\nTest each decorator with TypeScript classes.'
      }
    },
 
    24: {
      content: [
        { title: 'What is Functional Programming?', text: 'Functional Programming (FP) is a programming paradigm that treats computation as the evaluation of mathematical functions. It emphasizes: pure functions (no side effects), immutability (no mutation), and function composition (combining small functions).', code: '// Imperative (how to do it):\nlet total = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  total += numbers[i];\n}\n\n// Functional (what to compute):\nconst total = numbers.reduce((sum, n) => sum + n, 0);\n\n// Functional is:\n// - Shorter\n// - More readable\n// - Easier to test (pure function)' },
        { title: 'Pure Functions & Immutability', text: 'A pure function always returns the same output for the same input and has NO side effects (does not modify external state). Pure functions are easy to test, debug, and reason about. Immutability means never modifying data — create new data instead.', code: '// IMPURE - modifies external state:\nlet count = 0;\nfunction increment() {\n  count++;  // side effect!\n  return count;\n}\n\n// PURE - no side effects:\nfunction add(a: number, b: number): number {\n  return a + b;  // always same output for same input\n}\n\n// Immutability - create new instead of mutate:\nconst original = [1, 2, 3];\n\n// WRONG - mutating:\noriginal.push(4);\n\n// CORRECT - new array:\nconst updated = [...original, 4];\nconsole.log(original); // [1, 2, 3] - unchanged!' },
        { title: 'Function Composition & Currying', text: 'Composition is combining simple functions to build complex behavior — like mathematical f(g(x)). Currying transforms a function with multiple arguments into a chain of single-argument functions, enabling partial application.', code: '// Function Composition:\nconst double = (x: number) => x * 2;\nconst addOne = (x: number) => x + 1;\nconst square = (x: number) => x * x;\n\n// compose runs right to left:\nconst compose = (...fns: Function[]) =>\n  (x: any) => fns.reduceRight((v, f) => f(v), x);\n\nconst transform = compose(square, addOne, double);\nconsole.log(transform(3)); // square(addOne(double(3))) = 49\n\n// Currying:\nconst curriedAdd = (a: number) => (b: number) => a + b;\nconst add5 = curriedAdd(5);\nconsole.log(add5(3)); // 8\nconsole.log(add5(7)); // 12' }
      ],
      quiz: [
        { question: 'What defines a pure function?', choices: ['It runs faster than regular functions', 'It always returns the same output for the same input and has no side effects', 'It uses only built-in methods', 'It is defined with const'], correctIndex: 1 },
        { question: 'What does immutability mean in functional programming?', choices: ['Variables cannot be declared', 'Data is never modified — new data is created instead', 'Functions cannot return values', 'Arrays cannot be used'], correctIndex: 1 },
        { question: 'What is currying?', choices: ['A cooking-inspired algorithm', 'Transforming a multi-argument function into a chain of single-argument functions', 'A way to speed up function calls', 'Combining two classes into one'], correctIndex: 1 }
      ],
      activity: {
        title: '🏆 Functional Programming Challenge',
        description: 'Refactor imperative code into functional style.',
        type: 'challenge',
        prompt: 'Refactor this imperative code into functional style:\n\n// Imperative version to refactor:\nlet students = [\n  {name:"Ana", grade:88, passed:false, doubled:0},\n  {name:"Ben", grade:45, passed:false, doubled:0},\n  {name:"Cara", grade:92, passed:false, doubled:0},\n];\n\nfor (let i = 0; i < students.length; i++) {\n  if (students[i].grade >= 75) {\n    students[i].passed = true;\n  }\n  students[i].doubled = students[i].grade * 2;\n}\n\nlet passingNames = [];\nfor (let s of students) {\n  if (s.passed) passingNames.push(s.name);\n}\n\nFunctional requirements:\n1. Write PURE functions for each transformation\n2. Use map/filter/reduce - NO loops or mutations\n3. Original students array must NOT be modified\n4. Implement compose() to chain transformations\n5. Implement curry() that works with 2-argument functions\n\nBONUS: Write a pipeline() function (left-to-right compose)\nand refactor the student processing into a single pipeline call'
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