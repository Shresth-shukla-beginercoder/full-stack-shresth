/* ========= CONTENT =========
 topic = {k:'js'|'sh'|'git', t:title, def:[...], pts:[...], ex:code, tbl:[[cmd,meaning]...], q:{task,start,hint,sol,chk?}}
 k='js'  -> practice runs real JavaScript
 k='sh'  -> practice runs in a mini Git Bash simulator (virtual folders)
 k='git' -> practice is checked (are the right commands typed?) */
const SECTIONS = [
{ name: '🧬 Prototypes, Classes & OOP', items: [
{k:'js',t:'What on earth are Prototypes?',
 def:['Every JavaScript object has a hidden link to another object called its <b>prototype</b>.','If a property is not found on an object, JS follows the link and searches the prototype (the <b>prototype chain</b>).'],
 pts:['The link is visible as <code>obj.__proto__</code> (better: <code>Object.getPrototypeOf(obj)</code>).','Chain ends at <code>Object.prototype</code>, whose prototype is <code>null</code>.','Array methods like <code>map</code> live once on <code>Array.prototype</code> - arrays do not copy them (saves memory).','<code>Object.create(x)</code> makes a new object whose prototype is x.'],
 ex:`const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);   // true

// add our own method to ALL arrays
Array.prototype.last = function () { return this[this.length - 1]; };
console.log(arr.last());                          // 3

const animal = { eats: true };
const dog = Object.create(animal);   // dog's prototype = animal
dog.barks = true;
console.log(dog.eats, dog.barks);                 // true true
console.log(Object.getPrototypeOf(dog) === animal);`,
 q:{task:'Create an object <code>vehicle</code> with a method <code>wheels()</code> returning 4. Make <code>car</code> using <code>Object.create(vehicle)</code> and log <code>car.wheels()</code>.',start:'// write your code here\n',hint:'Method inside object: wheels(){ return 4 }. Then const car = Object.create(vehicle).',sol:'const vehicle = { wheels() { return 4; } };\nconst car = Object.create(vehicle);\nconsole.log(car.wheels());'}},

{k:'js',t:'Intro to Object Oriented Programming',
 def:['<b>OOP</b> = organising code as <b>objects</b> that bundle data (properties) and behaviour (methods).','Goal: model real things (User, Car, Button) so code is reusable and easy to maintain.'],
 pts:['<b>Encapsulation</b> - keep data + methods together, hide internals.','<b>Abstraction</b> - expose a simple interface, hide complexity.','<b>Inheritance</b> - a child reuses features of a parent.','<b>Polymorphism</b> - same method name, different behaviour per object.','JS is prototype-based; <code>class</code> is a cleaner syntax on top of it.'],
 ex:`const cat = { name: 'Tom', speak() { return this.name + ' says meow'; } };
const cow = { name: 'Gauri', speak() { return this.name + ' says moo'; } };

// Polymorphism: same call, different result
[cat, cow].forEach(a => console.log(a.speak()));`,
 q:{task:'Create two objects <code>circle</code> (radius 3) and <code>square</code> (side 4), each with <code>area()</code>. Log both areas (use 3.14 for pi).',start:'',hint:'circle.area(){ return 3.14*this.radius*this.radius }',sol:'const circle = { radius: 3, area() { return 3.14 * this.radius ** 2; } };\nconst square = { side: 4, area() { return this.side ** 2; } };\nconsole.log(circle.area(), square.area());'}},

{k:'js',t:'Factory Functions',
 def:['A <b>factory function</b> is a normal function that <b>returns a new object</b> every time you call it.'],
 pts:['No <code>new</code>, no <code>this</code> confusion at creation.','Arguments become properties; methods are defined inside.','Downside: every object gets its own copy of each method (more memory).','Downside: <code>instanceof</code> does not work.'],
 ex:`function makeColor(r, g, b) {
  return {
    r, g, b,
    rgb() { return 'rgb(' + r + ',' + g + ',' + b + ')'; },
    hex() { return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join(''); }
  };
}
const red = makeColor(255, 0, 0);
console.log(red.rgb(), red.hex());`,
 q:{task:'Write factory <code>makePerson(name, age)</code> returning an object with <code>intro()</code> that returns "Hi, I am NAME, AGE years old". Test it.',start:'function makePerson(name, age) {\n  // return an object\n}\n',hint:'return { name, age, intro(){ return "Hi, I am " + name + ", " + age + " years old" } }',sol:'function makePerson(name, age) {\n  return { name, age, intro() { return "Hi, I am " + name + ", " + age + " years old"; } };\n}\nconsole.log(makePerson("Shresth", 20).intro());'}},

{k:'js',t:'Constructor Functions',
 def:['A <b>constructor function</b> (name starts with a Capital) builds objects when called with <b>new</b>.'],
 pts:['<code>new F()</code> does 4 things: 1) creates empty object 2) links its prototype to <code>F.prototype</code> 3) runs F with <code>this</code> = new object 4) returns it.','Put shared methods on <code>F.prototype</code> so they are stored once.','<code>instanceof</code> works.','Forgetting <code>new</code> breaks things (<code>this</code> becomes undefined / global).'],
 ex:`function Color(r, g, b) {
  this.r = r; this.g = g; this.b = b;
}
Color.prototype.rgb = function () {
  return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
};
const c1 = new Color(0, 128, 255);
const c2 = new Color(9, 9, 9);
console.log(c1.rgb());
console.log(c1.rgb === c2.rgb);      // true -> shared
console.log(c1 instanceof Color);`,
 q:{task:'Make constructor <code>Car(brand, speed)</code>. Add prototype method <code>drive()</code> returning "BRAND is driving at SPEED km/h". Create one car and log.',start:'',hint:'Use this.brand = brand; then Car.prototype.drive = function(){...}',sol:'function Car(brand, speed) { this.brand = brand; this.speed = speed; }\nCar.prototype.drive = function () { return this.brand + " is driving at " + this.speed + " km/h"; };\nconsole.log(new Car("BMW", 120).drive());'}},

{k:'js',t:'JavaScript Classes',
 def:['A <b>class</b> is a template for objects. It is "syntactic sugar" over constructor functions + prototypes.'],
 pts:['<code>constructor()</code> runs on <code>new</code> and sets up properties.','Methods written in the class go on the prototype automatically.','<code>static</code> methods belong to the class, not instances.','<code>get</code>/<code>set</code> make computed properties.','Classes are not hoisted like functions.'],
 ex:`class Color {
  constructor(r, g, b, name) { this.r = r; this.g = g; this.b = b; this.name = name; }
  innerRGB() { return this.r + ', ' + this.g + ', ' + this.b; }
  rgb() { return 'rgb(' + this.innerRGB() + ')'; }
  get isDark() { return this.r + this.g + this.b < 300; }
  static white() { return new Color(255, 255, 255, 'white'); }
}
const navy = new Color(0, 0, 80, 'navy');
console.log(navy.rgb(), navy.isDark);
console.log(Color.white().rgb());`,
 q:{task:'Create class <code>Rectangle(w, h)</code> with method <code>area()</code> and getter <code>isSquare</code>. Test with 4x4 and 3x5.',start:'class Rectangle {\n\n}\n',hint:'get isSquare(){ return this.w === this.h }',sol:'class Rectangle {\n  constructor(w, h) { this.w = w; this.h = h; }\n  area() { return this.w * this.h; }\n  get isSquare() { return this.w === this.h; }\n}\nconsole.log(new Rectangle(4,4).isSquare, new Rectangle(3,5).area());'}},

{k:'js',t:'More Classes Practice',
 def:['Practice combining <b>private fields</b> (<code>#x</code>), <b>static counters</b>, getters and method chaining.'],
 pts:['<code>#balance</code> is truly private - outside code cannot read it.','Return <code>this</code> from a method to allow chaining: <code>a.add(1).add(2)</code>.','<code>static</code> property can count how many objects were created.'],
 ex:`class BankAccount {
  #balance = 0;
  static count = 0;
  constructor(owner) { this.owner = owner; BankAccount.count++; }
  deposit(n) { this.#balance += n; return this; }
  withdraw(n) {
    if (n > this.#balance) { console.log('Insufficient funds'); return this; }
    this.#balance -= n; return this;
  }
  get balance() { return this.#balance; }
}
const a = new BankAccount('Ravi');
a.deposit(500).withdraw(200).withdraw(900);
console.log(a.balance, BankAccount.count);`,
 q:{task:'Build class <code>Counter</code> with private <code>#n</code>, methods <code>inc()</code>, <code>dec()</code> (chainable) and getter <code>value</code>. Run inc 3 times, dec once, log value (expect 2).',start:'',hint:'Each method: this.#n++; return this;',sol:'class Counter {\n  #n = 0;\n  inc() { this.#n++; return this; }\n  dec() { this.#n--; return this; }\n  get value() { return this.#n; }\n}\nconsole.log(new Counter().inc().inc().inc().dec().value);'}},

{k:'js',t:'extends and super keyword',
 def:['<code>extends</code> makes a class <b>inherit</b> from another class (parent).','<code>super</code> refers to the parent: <code>super(...)</code> calls its constructor, <code>super.method()</code> calls its method.'],
 pts:['In a child constructor you <b>must</b> call <code>super()</code> before using <code>this</code>.','Child can <b>override</b> parent methods (polymorphism).','Prototype chain: child instance -> Child.prototype -> Parent.prototype.','Child can add its own new methods.'],
 ex:`class Pet {
  constructor(name) { this.name = name; }
  eat() { return this.name + ' is eating'; }
}
class Dog extends Pet {
  constructor(name, breed) { super(name); this.breed = breed; }
  eat() { return super.eat() + ' loudly'; }   // override
  bark() { return 'Woof!'; }
}
const d = new Dog('Bruno', 'Lab');
console.log(d.eat(), d.bark());
console.log(d instanceof Pet);`,
 q:{task:'Create <code>Shape</code> with <code>describe()</code> returning "I am a shape". Create <code>Circle extends Shape</code> (radius) that overrides <code>describe()</code> to use <code>super.describe()</code> plus " with radius R".',start:'',hint:'return super.describe() + " with radius " + this.r',sol:'class Shape { describe() { return "I am a shape"; } }\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  describe() { return super.describe() + " with radius " + this.r; }\n}\nconsole.log(new Circle(5).describe());'}}
]},

{ name: '💻 Mastering the Terminal (Git Bash)', items: [
{k:'sh',t:'Backend Overview & Pep Talk',
 def:['<b>Backend</b> = the part of an app users do not see: servers, databases, APIs, authentication.','The <b>terminal</b> is a text window where you control the computer with commands instead of clicking.'],
 pts:['Frontend (HTML/CSS/JS in browser) talks to backend (Node.js, Python, DBs) over the internet.','Backend tools (Node, npm, Git, databases, servers) are used <b>from the terminal</b>.','Pep talk: it looks scary, but you only need ~20 commands. Everyone starts by typing <code>ls</code>.','Terminal = fast, scriptable, works the same on every server.','<b>Git Bash</b> = terminal for Windows giving Linux-style commands + Git.'],
 ex:`# Anatomy of a Git Bash prompt
user@PC MINGW64 ~/Desktop (main)
$ command  -flags  arguments

# user@PC  -> who / which machine
# ~/Desktop -> current folder (~ = home)
# (main)   -> current git branch`,
 q:{task:'Warm-up: type <code>pwd</code> then <code>ls</code> in the mini terminal. (Run to see output.)',start:'pwd\nls',hint:'Just press Run. pwd = where am I, ls = what is here.',sol:'pwd\nls'}},

{k:'sh',t:'Why Learn Terminal Commands + Setup',
 def:['Git Bash gives Windows the same commands used on Linux servers and Macs.'],
 pts:['<b>Install:</b> download Git for Windows from git-scm.com, keep defaults, then right-click any folder -> "Open Git Bash here".','Check installs: <code>git --version</code>, <code>node -v</code>, <code>npm -v</code>.','<b>Shortcuts:</b> <kbd>Tab</kbd> autocomplete, <kbd>↑</kbd> previous command, <kbd>Ctrl+C</kbd> stop, <kbd>Ctrl+L</kbd> clear, <kbd>Ctrl+R</kbd> search history.','Paste = <kbd>Shift+Insert</kbd> (or right click).','Why: automate tasks, use Git, run servers, install packages, work on remote machines.'],
 ex:`git --version
node -v
npm -v
clear        # clean the screen
history      # show past commands`,
 q:{task:'Use <code>echo</code> to print "Terminal is my friend" and then <code>clear</code>-free run of <code>pwd</code>.',start:'',hint:'echo "Terminal is my friend"',sol:'echo "Terminal is my friend"\npwd'}},

{k:'sh',t:'pwd and ls',
 def:['<code>pwd</code> = <b>p</b>rint <b>w</b>orking <b>d</b>irectory (where am I?).','<code>ls</code> = <b>l</b>i<b>s</b>t files and folders in the current directory.'],
 pts:['<code>ls -a</code> shows hidden files (names starting with <code>.</code>).','<code>ls -l</code> long list (permissions, size, date). <code>ls -la</code> both.','<code>ls -R</code> lists folders recursively.','<code>ls folder</code> lists another folder without moving.','Folders are shown with a trailing <code>/</code>.'],
 ex:`pwd            # /c/Users/you
ls             # Documents  Desktop  notes.txt
ls -a          # also .bashrc (hidden)
ls -l          # detailed list
ls Documents   # peek inside Documents`,
 q:{task:'Run <code>pwd</code>, then list all files including hidden ones, then list what is inside <code>Documents</code>.',start:'',hint:'ls -a  and  ls Documents',sol:'pwd\nls -a\nls Documents'}},

{k:'sh',t:'Changing Directories, Relative & Absolute Paths',
 def:['<code>cd</code> = <b>c</b>hange <b>d</b>irectory.','<b>Absolute path</b> starts from root <code>/</code> (full address). <b>Relative path</b> starts from where you are now.'],
 pts:['<code>cd Documents</code> go into a folder (relative).','<code>cd ..</code> go up one level. <code>cd ../..</code> up two.','<code>cd .</code> stay (dot = current folder).','<code>cd ~</code> or just <code>cd</code> = home. <code>cd -</code> = previous folder.','<code>cd /home/user/Documents</code> = absolute path (works from anywhere).','Spaces in names: use quotes <code>cd "My Files"</code>.'],
 ex:`pwd                       # /home/user
cd Documents              # relative
pwd                       # /home/user/Documents
cd ..                     # back up
cd /home/user/Desktop     # absolute
cd ~                      # home`,
 q:{task:'Go into <code>Documents</code>, print location, go back up with <code>..</code>, then jump to <code>Desktop</code> using an absolute path <code>/home/user/Desktop</code> and print location.',start:'',hint:'cd Documents / pwd / cd .. / cd /home/user/Desktop / pwd',sol:'cd Documents\npwd\ncd ..\ncd /home/user/Desktop\npwd'}},

{k:'sh',t:'Making Directories (mkdir)',
 def:['<code>mkdir</code> = <b>m</b>a<b>k</b>e <b>dir</b>ectory. Creates new folders.'],
 pts:['<code>mkdir project</code> one folder.','<code>mkdir a b c</code> many at once.','<code>mkdir -p web/css/fonts</code> creates nested folders (-p = parents).','Error "File exists" if folder already there.','Avoid spaces in names: use <code>my-project</code> or <code>my_project</code>.'],
 ex:`mkdir portfolio
mkdir -p portfolio/assets/img
cd portfolio
ls`,
 q:{task:'Create <code>site/css</code> and <code>site/js</code> in one go (nested), then <code>ls site</code>.',start:'',hint:'mkdir -p site/css site/js',sol:'mkdir -p site/css site/js\nls site'}},

{k:'sh',t:'Man Pages & Flags',
 def:['A <b>flag</b> (option) changes how a command behaves, e.g. <code>-l</code> or <code>--all</code>.','<b>man pages</b> are built-in manuals. In Git Bash use <code>command --help</code> (and <code>git help commit</code>).'],
 pts:['Short flags: one dash, one letter: <code>ls -l</code>. Combine: <code>ls -la</code>.','Long flags: two dashes: <code>ls --all</code>.','Flags can take values: <code>head -n 5 file</code>.','<code>ls --help</code> = quick manual. <code>man ls</code> works on Mac/Linux (Git Bash may lack it).','Git manuals open in browser: <code>git help status</code>.'],
 ex:`ls --help        # see all options
ls -la           # combine -l and -a
mkdir -p a/b     # flag -p
rm -r folder     # flag -r
git help commit  # opens Git manual`,
 q:{task:'Use <code>ls -la</code> in the simulator, then <code>man ls</code> to see the built-in tip.',start:'',hint:'Type ls -la then man ls',sol:'ls -la\nman ls'}},

{k:'sh',t:'touch - Create Files',
 def:['<code>touch</code> creates an <b>empty file</b> (or updates its timestamp if it exists).'],
 pts:['<code>touch index.html</code>','<code>touch a.txt b.txt c.txt</code> many files.','<code>touch .gitignore</code> hidden file.','Brace expansion (real Git Bash): <code>touch page{1..3}.html</code>.','Write content: <code>echo "hi" > file.txt</code> (overwrite), <code>>></code> (append).'],
 ex:`mkdir demo && cd demo
touch index.html style.css script.js
echo "console.log('hi')" > script.js
ls`,
 q:{task:'Make a folder <code>web</code>, go inside, create <code>index.html</code>, <code>style.css</code>, <code>app.js</code>, then list them.',start:'',hint:'mkdir web / cd web / touch index.html style.css app.js / ls',sol:'mkdir web\ncd web\ntouch index.html style.css app.js\nls'}},

{k:'sh',t:'Removing Files & Folders (rm, rmdir)',
 def:['<code>rm</code> removes files. <code>rm -r</code> removes folders with everything inside. <code>rmdir</code> removes only <b>empty</b> folders.'],
 pts:['⚠️ <b>No Recycle Bin!</b> Deleted = gone forever.','<code>rm file.txt</code> | <code>rm a b c</code>','<code>rm -r folder</code> recursive | <code>rm -rf folder</code> force (dangerous).','<code>rm -i file</code> asks before deleting (safer).','<b>Never</b> run <code>rm -rf /</code> or <code>rm -rf *</code> unless you are 100% sure of your location (use <code>pwd</code> first).'],
 ex:`rm notes.txt
rmdir emptyfolder
rm -r old-project
rm -i important.txt   # asks first`,
 q:{task:'Delete file <code>notes.txt</code> and folder <code>Documents</code> (it has a file inside), then <code>ls</code>.',start:'',hint:'rm notes.txt then rm -r Documents',sol:'rm notes.txt\nrm -r Documents\nls'}},

{k:'sh',t:'cat, echo, cp, mv - Read, Write, Copy, Move',
 def:['<code>cat</code> shows file content, <code>echo</code> prints/writes text, <code>cp</code> copies, <code>mv</code> moves <i>or renames</i>.'],
 pts:['<code>cat file</code> | <code>echo "text" > file</code> | <code>echo "more" >> file</code>','<code>cp a.txt b.txt</code> copy file | <code>cp -r dir1 dir2</code> copy folder.','<code>mv old.txt new.txt</code> rename | <code>mv file.txt Documents/</code> move.','Wildcards: <code>*.js</code> all JS files, <code>?</code> one character.'],
 ex:`echo "Hello" > hi.txt
echo "World" >> hi.txt
cat hi.txt
cp hi.txt copy.txt
mv copy.txt Documents/`,
 q:{task:'Write "Hello" into <code>hi.txt</code>, copy it to <code>hi2.txt</code>, rename <code>hi2.txt</code> to <code>final.txt</code>, then <code>cat final.txt</code>.',start:'',hint:'echo "Hello" > hi.txt / cp hi.txt hi2.txt / mv hi2.txt final.txt / cat final.txt',sol:'echo "Hello" > hi.txt\ncp hi.txt hi2.txt\nmv hi2.txt final.txt\ncat final.txt'}},

{k:'sh',t:'More Essential Commands (Cheat Sheet)',
 def:['Other commands every developer uses daily. Try these in real Git Bash (the mini terminal supports the basics).'],
 pts:['<code>|</code> pipe sends output of one command into another: <code>ls | grep js</code>.','<code>&&</code> run next only if previous succeeded. <code>;</code> run always.','<code>Ctrl+C</code> stops a running process (e.g. a server).','<code>code .</code> opens current folder in VS Code.','<code>start .</code> opens folder in Explorer (Windows).'],
 tbl:[['head -n 5 f / tail -n 5 f','first / last lines of file'],['less f','scroll a big file (q to quit)'],['wc -l f','count lines'],['grep "word" f','search text inside files (-r folder, -i ignore case)'],['find . -name "*.js"','find files by name'],['which node','where a program is installed'],['history','list old commands'],['clear / Ctrl+L','clear screen'],['env / export X=1','environment variables'],['chmod +x run.sh','make file executable'],['curl url','download / call an API'],['ping google.com','test network'],['date, whoami','time, current user'],['alias ll="ls -la"','make own shortcut'],['exit','close terminal'],['npm init -y / npm i pkg','start Node project / install package'],['node file.js','run a JS file']],
 ex:`ls | grep ".js"
grep -ri "todo" .
find . -name "*.html"
mkdir app && cd app && npm init -y`,
 q:{task:'Create <code>a.js</code> and <code>b.txt</code>, then list them. (Pipes like grep work in real Git Bash.)',start:'',hint:'touch a.js b.txt then ls',sol:'touch a.js b.txt\nls'}},

{k:'git',t:'Git Basics: init, add, commit, status, log',
 def:['<b>Git</b> is a version-control tool: it saves snapshots (commits) of your project so you can go back in time and collaborate.'],
 pts:['One-time setup: <code>git config --global user.name "Your Name"</code> and <code>git config --global user.email "you@mail.com"</code>.','<code>git init</code> start tracking a folder.','Flow: <b>Working folder -> <code>git add</code> (staging) -> <code>git commit</code> (saved snapshot)</b>.','<code>git status</code> what changed? | <code>git log --oneline</code> history | <code>git diff</code> exact changes.','<code>.gitignore</code> lists files Git should skip (like <code>node_modules/</code>).'],
 ex:`git config --global user.name "Shresth"
git config --global user.email "me@mail.com"
mkdir mysite && cd mysite
git init
touch index.html
git status
git add .
git commit -m "first commit"
git log --oneline`,
 q:{task:'Type the commands to: initialise a repo, stage all files, and commit with message "init".',start:'',hint:'git init / git add . / git commit -m "init"',sol:'git init\ngit add .\ngit commit -m "init"',chk:[['git init','git init'],['git add','git add .'],['git commit -m','git commit -m "init"']]}},

{k:'git',t:'Branches, Merge & Undo',
 def:['A <b>branch</b> is a separate line of work so you can try features without breaking <code>main</code>.'],
 pts:['<code>git branch</code> list | <code>git branch feature</code> create.','<code>git switch feature</code> (or <code>git checkout feature</code>) move to it. <code>git switch -c feature</code> create + move.','<code>git merge feature</code> (while on main) brings its work in.','Undo unstaged edit: <code>git restore file</code> | unstage: <code>git restore --staged file</code>.','Undo last commit but keep work: <code>git reset --soft HEAD~1</code>.','<code>git stash</code> temporarily shelve changes | <code>git stash pop</code> bring them back.'],
 ex:`git switch -c login-page
# ...work, add, commit...
git switch main
git merge login-page
git branch -d login-page`,
 q:{task:'Create and switch to branch <code>feature</code>, commit-free: then switch back to <code>main</code> and merge <code>feature</code>.',start:'',hint:'git switch -c feature / git switch main / git merge feature',sol:'git switch -c feature\ngit switch main\ngit merge feature',chk:[['git switch -c|git checkout -b','create + switch to feature'],['git switch main|git checkout main','back to main'],['git merge feature','merge feature']]}},

{k:'git',t:'Connect Git Bash with GitHub',
 def:['<b>GitHub</b> is a website that stores your Git repositories online. You connect your computer to it using <b>HTTPS + token</b> or (recommended) an <b>SSH key</b>.'],
 pts:['<b>Step 1</b> - Make a GitHub account + a new empty repository.','<b>Step 2</b> - Generate SSH key: <code>ssh-keygen -t ed25519 -C "you@mail.com"</code> (press Enter for defaults).','<b>Step 3</b> - Start agent: <code>eval "$(ssh-agent -s)"</code> then <code>ssh-add ~/.ssh/id_ed25519</code>.','<b>Step 4</b> - Copy public key: <code>cat ~/.ssh/id_ed25519.pub</code> -> GitHub -> Settings -> SSH and GPG keys -> New SSH key -> paste.','<b>Step 5</b> - Test: <code>ssh -T git@github.com</code> (should greet you by username).','<b>Step 6</b> - Link project: <code>git remote add origin git@github.com:USER/REPO.git</code>.','<b>Step 7</b> - Rename branch + push: <code>git branch -M main</code> then <code>git push -u origin main</code>.','Later: <code>git push</code> upload, <code>git pull</code> download updates, <code>git clone URL</code> copy a repo, <code>git remote -v</code> see links.','Contributing: <b>fork</b> -> clone -> branch -> push -> open <b>Pull Request</b> on GitHub.'],
 ex:`ssh-keygen -t ed25519 -C "you@mail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub     # paste into GitHub
ssh -T git@github.com

cd mysite
git remote add origin git@github.com:USER/mysite.git
git branch -M main
git push -u origin main`,
 q:{task:'Type the commands: link remote <code>origin</code> to <code>git@github.com:me/app.git</code>, rename branch to main, and push with upstream.',start:'',hint:'git remote add origin ... / git branch -M main / git push -u origin main',sol:'git remote add origin git@github.com:me/app.git\ngit branch -M main\ngit push -u origin main',chk:[['git remote add origin git@github.com:me/app.git','add remote origin'],['git branch -M main','rename branch to main'],['git push -u origin main','push with upstream']]}}
]}
];

/* ========= MINI GIT BASH SIMULATOR ========= */
const freshFS = () => ({home:{user:{Documents:{'report.txt':'Q3 report'},Desktop:{},'notes.txt':'my notes','.bashrc':'# config'}}});
function runShell(src) {
  const fs = freshFS(); let cwd = ['home','user'], out = [];
  const res = p => { let a = [...cwd]; if (p.startsWith('/')) a = []; if (p.startsWith('~')) { a = ['home','user']; p = p.slice(1); }
    p.split('/').forEach(s => s === '..' ? a.pop() : s && s !== '.' && a.push(s)); return a; };
  const node = a => a.reduce((n, k) => n && typeof n === 'object' ? n[k] : undefined, fs);
  const isDir = n => n && typeof n === 'object';
  const prompt = () => 'user@PC MINGW64 ' + (cwd.join('/') === 'home/user' ? '~' : '/' + cwd.join('/')) + ' $ ';
  src.split('\n').forEach(line => {
    if (!line.trim()) return; out.push(prompt() + line);
    const tk = (line.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(s => s.replace(/^["']|["']$/g, ''));
    const [cmd, ...args] = tk, flags = args.filter(a => a[0] === '-' && a.length > 1).join(''), ps = args.filter(a => a[0] !== '-');
    const say = s => out.push(s), err = s => out.push(cmd + ': ' + s);
    const put = (a, txt, app) => { const par = node(a.slice(0, -1)); if (!isDir(par)) return err('No such directory'); par[a.at(-1)] = (app && typeof par[a.at(-1)] === 'string' ? par[a.at(-1)] + '\n' : '') + txt; };
    if (cmd === 'pwd') say('/' + cwd.join('/'));
    else if (cmd === 'ls') { const a = res(ps[0] || '.'), n = node(a); if (n === undefined) return err("cannot access '" + ps[0] + "': No such file or directory");
      if (!isDir(n)) return say(ps[0]);
      let names = Object.keys(n).filter(k => flags.includes('a') || k[0] !== '.').sort();
      if (flags.includes('a')) names = ['.', '..', ...names];
      say(flags.includes('l') ? names.map(k => (isDir(n[k]) || k[0] === '.' && k.length < 3 ? 'drwxr-xr-x ' : '-rw-r--r-- ') + k).join('\n') : names.map(k => isDir(n[k]) ? k + '/' : k).join('  ')); }
    else if (cmd === 'cd') { const a = ps.length ? res(ps[0]) : ['home','user']; isDir(node(a)) ? cwd = a : err(ps[0] + ': No such file or directory'); }
    else if (cmd === 'mkdir') ps.forEach(p => { const a = res(p), par = node(a.slice(0, -1));
      if (flags.includes('p')) { let n = fs; a.forEach(k => n = n[k] = isDir(n[k]) ? n[k] : {}); }
      else if (!isDir(par)) err("cannot create directory '" + p + "': No such file or directory");
      else if (par[a.at(-1)] !== undefined) err("cannot create directory '" + p + "': File exists");
      else par[a.at(-1)] = {}; });
    else if (cmd === 'touch') ps.forEach(p => { const a = res(p), par = node(a.slice(0, -1)); isDir(par) ? par[a.at(-1)] ??= '' : err("cannot touch '" + p + "'"); });
    else if (cmd === 'rm' || cmd === 'rmdir') ps.forEach(p => { const a = res(p), par = node(a.slice(0, -1)), n = node(a);
      if (n === undefined) return err("cannot remove '" + p + "': No such file or directory");
      if (isDir(n) && cmd === 'rm' && !flags.includes('r')) return err("cannot remove '" + p + "': Is a directory (use -r)");
      if (cmd === 'rmdir' && (!isDir(n) || Object.keys(n).length)) return err("failed to remove '" + p + "': not an empty directory");
      delete par[a.at(-1)]; });
    else if (cmd === 'cat') ps.forEach(p => typeof node(res(p)) === 'string' ? say(node(res(p))) : err(p + ': No such file'));
    else if (cmd === 'echo') { const gi = tk.findIndex(t => t === '>' || t === '>>');
      if (gi < 0) say(args.join(' ')); else put(res(tk[gi + 1]), tk.slice(1, gi).join(' '), tk[gi] === '>>'); }
    else if (cmd === 'cp' || cmd === 'mv') { const [s, d] = ps, sa = res(s), n = node(sa); if (n === undefined) return err("cannot stat '" + s + "'");
      let da = res(d); if (isDir(node(da))) da = [...da, sa.at(-1)];
      node(da.slice(0, -1))[da.at(-1)] = isDir(n) ? JSON.parse(JSON.stringify(n)) : n; if (cmd === 'mv') delete node(sa.slice(0, -1))[sa.at(-1)]; }
    else if (cmd === 'man' || args.includes('--help')) say('Tip: flags change behaviour. Try: ' + (ps[0] || cmd) + ' -l / -a / -r. Real Git Bash: ' + (ps[0] || cmd) + ' --help');
    else if (cmd === 'clear') out.length = 0;
    else if (cmd === 'whoami') say('user');
    else if (cmd === 'git') say('(Git is checked in the Git practice topics - use a real Git Bash to run it)');
    else say('bash: ' + cmd + ': command not found (mini terminal supports pwd ls cd mkdir touch rm rmdir cat echo cp mv)');
  });
  return out.join('\n');
}

/* ========= JS RUNNER ========= */
function runJS(code) {
  const out = [], fmt = x => typeof x === 'object' ? JSON.stringify(x) : String(x);
  const con = { log: (...a) => out.push(a.map(fmt).join(' ')) };
  try { new Function('console', code)(con); } catch (e) { out.push('❌ ' + e.name + ': ' + e.message); }
  return out.join('\n') || '(no output - use console.log)';
}

/* ========= APP ========= */
const flat = SECTIONS.flatMap(s => s.items), done = new Set(), $ = id => document.getElementById(id);
let cur = 0;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function buildNav() {
  let i = 0;
  $('nav').innerHTML = SECTIONS.map(s => '<h3>' + s.name + '</h3>' + s.items.map(t => { const n = i++; return '<button data-i="' + n + '">' + (n + 1) + '. ' + t.t + '</button>'; }).join('')).join('');
  $('nav').onclick = e => e.target.dataset.i && show(+e.target.dataset.i);
}

function show(i) {
  cur = i; const t = flat[i], q = t.q, isSh = t.k === 'sh', isGit = t.k === 'git';
  $('main').innerHTML = `
  <section class="card">
    <span class="tag">Topic ${i + 1} of ${flat.length} · ${t.k === 'js' ? 'JavaScript' : 'Git Bash'}</span>
    <h2>${t.t}</h2>
    <h4>📖 Definition</h4><ul>${t.def.map(d => '<li>' + d + '</li>').join('')}</ul>
    <h4>🧠 Explanation (point by point)</h4><ul>${t.pts.map(d => '<li>' + d + '</li>').join('')}</ul>
    ${t.tbl ? '<table><tr><th>Command</th><th>What it does</th></tr>' + t.tbl.map(r => '<tr><td><code>' + esc(r[0]) + '</code></td><td>' + r[1] + '</td></tr>').join('') + '</table>' : ''}
    <h4>💻 Code Example</h4>
    <pre>${esc(t.ex)}</pre>
    <div class="row">${t.k === 'js' ? '<button class="go" id="rex">▶ Run this example</button>' : ''}<button id="cp">📋 Copy</button></div>
    ${t.k === 'js' ? '<div class="out" id="exo">Click "Run this example" to see output.</div>' : ''}
  </section>
  <section class="card">
    <h4>🎯 Practice Question</h4><p>${q.task}</p>
    <textarea id="ed" spellcheck="false" placeholder="${isSh ? 'Type terminal commands, one per line' : isGit ? 'Type Git commands, one per line' : '// write JavaScript here'}">${esc(q.start)}</textarea>
    <div class="row">
      <button class="go" id="run">▶ ${isSh || isGit ? 'Run / Check' : 'Run Code'}</button>
      <button id="hb">💡 Hint</button><button id="sb">✅ Show Solution</button><button id="rs">↺ Reset</button>
    </div>
    <div class="hint" id="hint">💡 ${esc(q.hint)}</div>
    <div class="out" id="out">Output appears here…</div>
  </section>
  <div class="nx"><button id="pv" ${i ? '' : 'disabled'}>← Previous</button><button id="dn">✔ Mark done</button><button id="nt" ${i < flat.length - 1 ? '' : 'disabled'}>Next →</button></div>`;
  const ed = $('ed'), out = $('out');
  if ($('rex')) $('rex').onclick = () => $('exo').textContent = runJS(t.ex);
  $('cp').onclick = () => navigator.clipboard?.writeText(t.ex).then(() => $('cp').textContent = '✔ Copied');
  $('run').onclick = () => {
    if (isGit) { const v = ed.value; out.textContent = q.chk.map(([re, l]) => (new RegExp(re).test(v) ? '✔ ' : '✘ ') + l).join('\n'); }
    else out.textContent = isSh ? runShell(ed.value) : runJS(ed.value);
  };
  $('hb').onclick = () => { const h = $('hint'); h.style.display = h.style.display === 'block' ? 'none' : 'block'; };
  $('sb').onclick = () => { ed.value = q.sol; out.textContent = 'Solution loaded - press Run.'; };
  $('rs').onclick = () => { ed.value = q.start; out.textContent = 'Output appears here…'; $('hint').style.display = 'none'; };
  ed.onkeydown = e => { if (e.key === 'Tab') { e.preventDefault(); const s = ed.selectionStart; ed.setRangeText('  ', s, ed.selectionEnd, 'end'); } if (e.ctrlKey && e.key === 'Enter') $('run').click(); };
  $('pv').onclick = () => show(i - 1); $('nt').onclick = () => show(i + 1);
  $('dn').onclick = () => { done.add(i); refresh(); };
  refresh(); scrollTo({ top: 0, behavior: 'smooth' });
}

function refresh() {
  document.querySelectorAll('#nav button').forEach((b, i) => { b.classList.toggle('on', i === cur); b.classList.toggle('done', done.has(i)); });
  const p = Math.round(done.size / flat.length * 100); $('prog').style.width = p + '%'; $('pct').textContent = p + '% done';
}

buildNav(); show(0);