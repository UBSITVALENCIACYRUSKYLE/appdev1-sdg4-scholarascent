import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  ranks = [
    { letter: 'E', name: 'Unranked Scholar', exp: '0' },
    { letter: 'D', name: 'Bronze Learner', exp: '500' },
    { letter: 'C', name: 'Silver Mind', exp: '1,500' },
    { letter: 'B', name: 'Gold Intellect', exp: '3,500' },
    { letter: 'A', name: 'Platinum Sage', exp: '7,000' },
    { letter: 'S', name: 'Shadow Scholar', exp: '12,000' },
  ];

  topics = [
    { icon: '🧱', title: 'Programming Basics', desc: 'Variables, data types, control flow, and loops — the foundation of all programming.', lessons: 3, rank: 'E' },
    { icon: '⚙️', title: 'Functions & Methods', desc: 'Write reusable code blocks, understand parameters, return values, and arrow functions.', lessons: 2, rank: 'E' },
    { icon: '📦', title: 'Data Structures', desc: 'Work with arrays, collections, sorting algorithms, and how to manipulate data efficiently.', lessons: 2, rank: 'D' },
    { icon: '🏛️', title: 'Object-Oriented Programming', desc: 'Model real-world problems using classes, objects, inheritance, and encapsulation.', lessons: 1, rank: 'D' },
    { icon: '🔷', title: 'TypeScript', desc: 'Add static typing to JavaScript, define interfaces, and write safer, more maintainable code.', lessons: 1, rank: 'C' },
    { icon: '🔁', title: 'Recursion', desc: 'Solve complex problems elegantly by having functions call themselves with a base case.', lessons: 1, rank: 'C' },
    { icon: '🛡️', title: 'Error Handling', desc: 'Write robust applications using try/catch/finally and custom error throwing patterns.', lessons: 1, rank: 'D' },
    { icon: '⚡', title: 'Async & Promises', desc: 'Handle asynchronous operations with Promises and the modern async/await syntax.', lessons: 1, rank: 'B' },
  ];

  features = [
    { icon: '⚔️', title: 'Complete Quests', description: 'Every lesson is a quest. Finish them to earn EXP and climb the Hunter ranks from E to S.' },
    { icon: '📈', title: 'Level Up', description: 'Track your progress through 6 ranks. Watch your EXP bar fill with every achievement.' },
    { icon: '🧠', title: 'Test Your Knowledge', description: 'Face unique quizzes at the end of every lesson. The harder the quiz, the more EXP you earn.' },
    { icon: '🎯', title: 'Daily Quests', description: 'New daily quests reset every day — earn bonus EXP for consistent learning habits.' },
    { icon: '🏆', title: 'Earn Badges', description: 'Unlock special badges for milestones like completing topics or maintaining a login streak.' },
    { icon: '🌍', title: 'SDG 4 Aligned', description: 'Every lesson contributes to quality education — making coding accessible to every learner.' },
  ];

  rankColors: { [key: string]: string } = {
    'E': 'rank-e', 'D': 'rank-d', 'C': 'rank-c',
    'B': 'rank-b', 'A': 'rank-a', 'S': 'rank-s'
  };
}