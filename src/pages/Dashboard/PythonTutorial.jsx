import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Terminal, 
  Code2, 
  BookOpen, 
  Cpu, 
  Activity, 
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Code,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PythonTutorial = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const accentColor = userData?.accentColor || '#6366f1';
  
  const [activeTopic, setActiveTopic] = useState('variables');
  const [isRunning, setIsRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const topics = {
    // Basics
    variables: {
      name: "Variables & Data Types",
      category: "basics",
      desc: "Variables are containers for storing data values. Python has no command for declaring a variable; a variable is created the moment you first assign a value to it.",
      code: `# Defining different data types in Python
age = 21          # Integer
gpa = 3.85         # Float
name = "Sriram"    # String
is_student = True  # Boolean

print(f"Name: {name}, Age: {age}")
print(f"GPA: {gpa}, Student Status: {is_student}")
print(f"Types: age is {type(age).__name__}, name is {type(name).__name__}")`,
      output: `Name: Sriram, Age: 21
GPA: 3.85, Student Status: True
Types: age is int, name is str`
    },
    operators: {
      name: "Operators & Expressions",
      category: "basics",
      desc: "Operators are used to perform operations on variables and values. Python divides operators into arithmetic, comparison, logical, and identity expressions.",
      code: `a = 15
b = 4

# Arithmetic operations
sum_val = a + b
mod_val = a % b
floor_div = a // b

# Logical comparison
is_greater = (a > b) and (b > 0)

print(f"15 + 4 = {sum_val}")
print(f"15 % 4 = {mod_val}")
print(f"15 // 4 = {floor_div}")
print(f"Is 15 > 4 and 4 > 0? {is_greater}")`,
      output: `15 + 4 = 19
15 % 4 = 3
15 // 4 = 3
Is 15 > 4 and 4 > 0? True`
    },
    conditionals: {
      name: "Conditionals (if-else)",
      category: "basics",
      desc: "Conditionals check logic expressions and branch program flow. Python uses if, elif, and else statements accompanied by colon block indentations.",
      code: `score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Score: {score}, Grade assigned: {grade}")`,
      output: `Score: 85, Grade assigned: B`
    },
    loops: {
      name: "Loops & Iterations",
      category: "basics",
      desc: "Loops allow code blocks to execute repeatedly. Python supports 'while' loops (executes as long as a condition holds) and 'for' loops (iterates over elements of a sequence).",
      code: `print("--- For Loop (range) ---")
for i in range(1, 4):
    print(f"Iteration {i}")
    
print("\\n--- While Loop ---")
count = 3
while count > 0:
    print(f"Countdown: {count}")
    count -= 1`,
      output: `--- For Loop (range) ---
Iteration 1
Iteration 2
Iteration 3

--- While Loop ---
Countdown: 3
Countdown: 2
Countdown: 1`
    },
    functions: {
      name: "Functions & Scope",
      category: "basics",
      desc: "A function is a reusable block of code defined with the def keyword. Functions can accept parameters and return values using the return statement.",
      code: `def greet_user(username, greeting="Hello"):
    # local variable scope
    message = f"{greeting}, {username}!"
    return message

result = greet_user("Abhishek", "Welcome")
print(result)

default_result = greet_user("Sriram")
print(default_result)`,
      output: `Welcome, Abhishek!
Hello, Sriram!`
    },

    // Intermediate
    collections: {
      name: "Collections (List/Tuple/Dict)",
      category: "intermediate",
      desc: "Python collections store batches of elements: Lists (ordered, mutable, duplicates), Tuples (ordered, immutable), and Dictionaries (unordered key-value pairs).",
      code: `# List (mutable)
fruits = ["apple", "banana"]
fruits.append("cherry")

# Tuple (immutable)
coordinates = (10, 20)

# Dictionary (key-value mapping)
student = {"name": "Sriram", "gpa": 3.9}

print("Fruits list:", fruits)
print("Coordinates tuple:", coordinates)
print("Student name:", student["name"], "with GPA:", student["gpa"])`,
      output: `Fruits list: ['apple', 'banana', 'cherry']
Coordinates tuple: (10, 20)
Student name: Sriram with GPA: 3.9`
    },
    strings: {
      name: "String Manipulation",
      category: "intermediate",
      desc: "Strings are immutable sequences of characters. Python has numerous built-in string methods to slice, split, join, strip, and format text arrays.",
      code: `phrase = "  Python is awesome!  "

# Slicing, stripping whitespace, and formatting
clean_phrase = phrase.strip()
words = clean_phrase.split(" ")
reversed_words = "-".join(reversed(words))

print(f"Original: '{phrase}'")
print(f"Cleaned: '{clean_phrase}'")
print(f"Sliced [0:6]: '{clean_phrase[0:6]}'")
print(f"Joined words reversed: '{reversed_words}'")`,
      output: `Original: '  Python is awesome!  '
Cleaned: 'Python is awesome!'
Sliced [0:6]: 'Python'
Joined words reversed: 'awesome!-is-Python'`
    },
    comprehensions: {
      name: "List Comprehensions",
      category: "intermediate",
      desc: "List comprehensions offer a shorter syntax to create new lists based on values of existing lists in a single, readable line of code.",
      code: `numbers = [1, 2, 3, 4, 5]

# Create list of squares for even numbers only
even_squares = [x**2 for x in numbers if x % 2 == 0]

# Converting values to strings
string_nums = [f"Num: {x}" for x in numbers]

print("Original list:", numbers)
print("Even squares list:", even_squares)
print("String representation:", string_nums)`,
      output: `Original list: [1, 2, 3, 4, 5]
Even squares list: [4, 16]
String representation: ['Num: 1', 'Num: 2', 'Num: 3', 'Num: 4', 'Num: 5']`
    },
    exceptions: {
      name: "Exception Handling",
      category: "intermediate",
      desc: "Exceptions are runtime errors. You can handle them gracefully using try, except, finally blocks to keep the application running when errors arise.",
      code: `def safe_division(numerator, denominator):
    try:
        result = numerator / denominator
        print(f"Result: {result}")
    except ZeroDivisionError as err:
        print(f"Error division failed: {err}")
    finally:
        print("Division execution frame finished.")

print("--- Valid Division ---")
safe_division(10, 2)

print("\\n--- Zero Division Error ---")
safe_division(10, 0)`,
      output: `--- Valid Division ---
Result: 5.0
Division execution frame finished.

--- Zero Division Error ---
Error division failed: division by zero
Division execution frame finished.`
    },

    // Advanced
    oop: {
      name: "OOP & Classes",
      category: "advanced",
      desc: "Object-Oriented Programming models real-world entities. Classes act as blueprints with fields (properties) and methods (member functions) instantiated into Objects.",
      code: `class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
        
    def display_info(self):
        return f"Student {self.name} has a {self.gpa} GPA."
        
# Instantiating objects
s1 = Student("Sriram", 3.95)
s2 = Student("Abhishek", 3.82)

print(s1.display_info())
print(s2.display_info())`,
      output: `Student Sriram has a 3.95 GPA.
Student Abhishek has a 3.82 GPA.`
    },
    recursion: {
      name: "Recursion Functions",
      category: "advanced",
      desc: "Recursion is when a function calls itself to solve smaller subproblems of the same type. It always requires a base case to terminate execution.",
      code: `def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)
        
print(f"5! = {factorial(5)}")
print(f"3! = {factorial(3)}")`,
      output: `5! = 120
3! = 6`
    },
    decorators: {
      name: "Decorators Pattern",
      category: "advanced",
      desc: "Decorators wrap functions to modify or extend their behavior dynamically. They are defined using functions returning functions, applied via the @ syntax.",
      code: `def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"[LOG] Executing function: {func.__name__}")
        result = func(*args, **kwargs)
        print("[LOG] Execution completed.")
        return result
    return wrapper

@log_decorator
def add_numbers(x, y):
    return x + y

ans = add_numbers(7, 8)
print(f"Answer: {ans}")`,
      output: `[LOG] Executing function: add_numbers
[LOG] Execution completed.
Answer: 15`
    },
    generators: {
      name: "Generators (yield)",
      category: "advanced",
      desc: "Generators return iterators lazily using the yield keyword. Unlike normal functions, they pause execution and save state between elements, conserving memory.",
      code: `def countdown_generator(num):
    while num > 0:
        yield num
        num -= 1
        
# Iterate over generator yield values
print("Counting down:")
for count in countdown_generator(3):
    print(count)`,
      output: `Counting down:
3
2
1`
    },
    lambdas: {
      name: "Lambdas, Map & Filter",
      category: "advanced",
      desc: "Lambda functions are single-expression anonymous functions. They are commonly passed as arguments to map() (applies to all elements) or filter() (selects matching elements).",
      code: `numbers = [1, 2, 3, 4, 5]

# Lambda for doubling
double = lambda x: x * 2

# Map: apply double to all elements
doubled_list = list(map(double, numbers))

# Filter: keep only odd numbers
odd_list = list(filter(lambda x: x % 2 != 0, numbers))

print("Doubled elements:", doubled_list)
print("Odds elements:", odd_list)`,
      output: `Doubled elements: [2, 4, 6, 8, 10]
Odds elements: [1, 3, 5]`
    }
  };

  const currentTopic = topics[activeTopic];

  const handleTopicChange = (key) => {
    setActiveTopic(key);
    setIsRunning(false);
    setHasExecuted(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasExecuted(true);
    }, 800);
  };

  const handleSendToCodeLab = () => {
    // Save to local storage for Code Lab tab ingestion
    localStorage.setItem('codeLabImportCode', currentTopic.code);
    localStorage.setItem('codeLabLanguage', 'python');
    // Navigate to Notebook
    navigate('/notebook');
  };

  const getSectionTitle = (cat) => {
    switch (cat) {
      case 'basics': return 'Core Python Basics';
      case 'intermediate': return 'Intermediate Python';
      case 'advanced': return 'Advanced Python OOP & Flow';
      default: return 'Python Course';
    }
  };

  // Group topics by category
  const categories = ['basics', 'intermediate', 'advanced'];

  return (
    <div className="flex flex-col h-screen bg-[#f9fafb] font-sans">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">Python Curriculum (Basic to Advanced)</span>
        </div>
        <div className="flex items-center gap-3">
          <span 
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            Interactive Learning Guide
          </span>
        </div>
      </header>

      {/* Main Layout: Course Sidebar navigation & Workspace pane */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Topic Outline */}
        <aside className="w-80 border-r border-gray-250 bg-white flex flex-col shrink-0 select-none">
          <div className="p-5 border-b border-gray-150 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Course Curriculum</h3>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
            {categories.map((cat) => (
              <div key={cat} className="space-y-1.5">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest px-2.5">
                  {getSectionTitle(cat)}
                </span>
                <div className="space-y-0.5">
                  {Object.entries(topics)
                    .filter(([_, value]) => value.category === cat)
                    .map(([key, value]) => {
                      const isActive = activeTopic === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleTopicChange(key)}
                          className={`w-full text-left py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isActive 
                              ? 'bg-indigo-55 hover:bg-indigo-50/50 text-indigo-650 font-black border-l-4 border-indigo-500 shadow-sm' 
                              : 'text-gray-655 hover:bg-gray-50 text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          <span>{value.name}</span>
                          {isActive && <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Right Side: Topic details, Interactive Code Block, and Output Simulator */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative bg-[#f9fafb]">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            {/* Concept Explanation Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 border border-indigo-100 py-1 px-2.5 rounded-lg">
                  {getSectionTitle(currentTopic.category)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-snug">{currentTopic.name}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mt-2">{currentTopic.desc}</p>
            </div>

            {/* Code & Output visualizer */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* Python Code snippet */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-400 font-mono">Example Python Implementation</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSendToCodeLab}
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-750 hover:border-slate-650 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Code className="w-3.5 h-3.5 text-indigo-400" /> Send to Code Lab
                    </button>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-4 py-1.5 text-xs font-bold text-white shadow-md rounded-xl transition-all cursor-pointer flex items-center gap-1.5 hover:brightness-95"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Play className="w-3 h-3 fill-white" /> Run Code
                    </button>
                  </div>
                </div>
                
                {/* Code syntax-style display */}
                <div className="font-mono text-[13px] text-slate-300 space-y-1 relative z-10 select-text overflow-x-auto">
                  <pre className="whitespace-pre">{currentTopic.code}</pre>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
              </div>

              {/* Console Output Simulator */}
              {(isRunning || hasExecuted) && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-xs font-black text-slate-450 text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Terminal className="w-4.5 h-4.5 text-emerald-400" /> Interactive Console Output
                  </h3>
                  <div className="font-mono text-xs text-emerald-400 min-h-[60px] flex flex-col justify-start pr-1 select-text">
                    <div className="text-slate-500 mb-1.5">&gt; python example.py</div>
                    {isRunning ? (
                      <div className="text-slate-400 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
                        <span>Initializing sandbox and compiling...</span>
                      </div>
                    ) : (
                      <>
                        <pre className="text-slate-105 text-white font-bold leading-relaxed whitespace-pre-wrap">{currentTopic.output}</pre>
                        <div className="text-emerald-500 font-extrabold mt-3">&gt; Process finished with exit code 0.</div>
                      </>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default PythonTutorial;
