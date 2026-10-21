/* ============================================================
   1. INTRO TO FUNCTIONS — YOUR FIRST FUNCTION
   ------------------------------------------------------------
   - "function" keyword + a name + () + { } body = a function declaration.
   - Nothing runs until you CALL it (greet()) — writing it just defines it.
   ============================================================ */
function greet() {
  console.log("Hello! This is my very first function.");
  document.getElementById("out1").textContent =
    "Hello! This is my very first function.";
}


/* ============================================================
   2. ARGUMENTS — PASSING DATA IN
   ------------------------------------------------------------
   - "name" here is a PARAMETER (the placeholder in the definition).
   - Whatever you pass when calling, e.g. greetPerson('Shresth'),
     is the ARGUMENT (the actual value).
   ============================================================ */
function greetPerson(name) {
  const message = "Hello, " + name + "! Welcome to functions.";
  console.log(message);
  document.getElementById("out2").textContent = message;
}


/* ============================================================
   3. FUNCTION WITH MULTIPLE ARGUMENTS
   ------------------------------------------------------------
   - You can list as many parameters as you need, separated by commas.
   - They are matched to arguments IN ORDER.
   ============================================================ */
function addNumbers(a, b) {
  const sum = a + b;
  console.log(a + " + " + b + " = " + sum);
  document.getElementById("out3").textContent = a + " + " + b + " = " + sum;
}


/* ============================================================
   4. THE return KEYWORD
   ------------------------------------------------------------
   - "return" hands a value back to whoever called the function.
   - As soon as "return" runs, the function STOPS — code after it
     inside the function will not execute.
   - Without "return", a function gives back "undefined".
   ============================================================ */
function square(num) {
  return num * num; // sends num*num back out
}

function showSquare(num) {
  const result = square(num); // we CAPTURE the returned value here
  console.log("Square of " + num + " is " + result);
  document.getElementById("out4").textContent =
    "Square of " + num + " is " + result;
}


/* ============================================================
   5. FUNCTION SCOPE
   ------------------------------------------------------------
   - Any variable declared with var/let/const INSIDE a function
     only exists inside that function.
   - Trying to use it outside would throw a ReferenceError.
   ============================================================ */
function demoFunctionScope() {
  let secretNumber = 42; // only lives inside this function
  const message = "Inside the function, secretNumber = " + secretNumber;
  console.log(message);
  document.getElementById("out5").textContent =
    message + "  (secretNumber is NOT accessible outside this function)";
}
// console.log(secretNumber); // <-- this would throw an error if uncommented


/* ============================================================
   6. BLOCK SCOPE
   ------------------------------------------------------------
   - let/const are scoped to the nearest { } block (if, for, while...),
     NOT just to the function.
   - var, by contrast, ignores block scope (it's function-scoped only) —
     that's why let/const are generally preferred today.
   ============================================================ */
function demoBlockScope() {
  let output = "";

  if (true) {
    let blockVar = "I exist only inside this if-block";
    var funcVar = "I exist through the whole function (var ignores blocks)";
    output += blockVar + "\n";
  }

  // blockVar is NOT accessible here — only inside the { } above
  output += funcVar; // this works fine, var leaks out of the block

  console.log(output);
  document.getElementById("out6").textContent = output;
}


/* ============================================================
   7. LEXICAL SCOPE
   ------------------------------------------------------------
   - "Lexical" = based on WHERE the code is physically written.
   - An inner function can read variables from the outer function
     it is defined inside, because of where it sits in the code —
     not because of who calls it.
   ============================================================ */
function outerFunction() {
  const outerVariable = "I belong to outerFunction";

  function innerFunction() {
    // innerFunction can see outerVariable because it is WRITTEN
    // inside outerFunction — this is lexical scoping.
    return "innerFunction can see: \"" + outerVariable + "\"";
  }

  return innerFunction();
}

function demoLexicalScope() {
  const result = outerFunction();
  console.log(result);
  document.getElementById("out7").textContent = result;
}


/* ============================================================
   8. FUNCTION EXPRESSIONS
   ------------------------------------------------------------
   - Instead of "function name() {}", you store an ANONYMOUS
     (or named) function inside a variable.
   - Function expressions are NOT hoisted the way declarations are —
     you must define them before you call them.
   ============================================================ */
const multiply = function (a, b) {
  const product = a * b;
  console.log(a + " × " + b + " = " + product);
  document.getElementById("out8").textContent = a + " × " + b + " = " + product;
  return product;
};
// Note: an arrow-function version would look like:
// const multiply = (a, b) => a * b;


/* ============================================================
   9. HIGHER ORDER FUNCTIONS
   ------------------------------------------------------------
   - A function is "higher order" if it:
     (a) takes another function as an argument, OR
     (b) returns a function.
   - Array methods like map/filter/forEach are classic examples.
   ============================================================ */
function processArray(arr, callback) {
  // "callback" is a function passed IN as an argument
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

function demoHigherOrder() {
  const numbers = [1, 2, 3, 4];

  // We pass a function expression directly as the "callback" argument
  const doubled = processArray(numbers, function (n) {
    return n * 2;
  });

  const message =
    "Original: [" + numbers.join(", ") + "]\n" +
    "Doubled (via higher order function): [" + doubled.join(", ") + "]";

  console.log(message);
  document.getElementById("out9").textContent = message;
}


/* ============================================================
   10. RETURNING A FUNCTION (CLOSURES)
   ------------------------------------------------------------
   - A function can create and RETURN another function.
   - That returned function keeps ("closes over") access to the
     variables that existed around it when it was created —
     this is called a CLOSURE.
   ============================================================ */
function createMultiplier(factor) {
  // "factor" stays alive inside the returned function below,
  // even after createMultiplier has finished running.
  return function (num) {
    return num * factor;
  };
}

function demoReturningFunction() {
  const triple = createMultiplier(3); // triple is now a function
  const result = triple(5); // uses factor = 3 from before, remembered via closure

  const message =
    "createMultiplier(3) returned a new function, stored as 'triple'.\n" +
    "triple(5) = " + result + " (it remembered factor = 3)";

  console.log(message);
  document.getElementById("out10").textContent = message;
}


/* ============================================================
   11. DEFINING METHODS
   ------------------------------------------------------------
   - A METHOD is just a function stored as a property of an object.
   - Inside a method, "this" refers to the object it belongs to.
   ============================================================ */
const student = {
  name: "Shresth",
  course: "JavaScript Functions",

  // method defined using shorthand syntax
  introduce() {
    return "Hi, I'm " + this.name + " and I'm learning " + this.course + ".";
  },

  // method defined the older, explicit way
  studyTip: function () {
    return "Tip: practice each concept by changing the numbers and re-running it.";
  },
};

function demoMethods() {
  const message = student.introduce() + "\n" + student.studyTip();
  console.log(message);
  document.getElementById("out11").textContent = message;
}