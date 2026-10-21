module.exports = [
{ slug:'intro', group:'Foundations', title:'Introduction to Express', lead:"Express is a minimal, unopinionated web framework built on top of Node's http module.",
  points:["Plain Node <code>http</code> works, but you hand-write routing, parsing and headers. Express wraps all of that.","Express = <b>routing + middleware + helpers</b> (<code>res.json</code>, <code>res.render</code>, <code>res.redirect</code>).","It does not force a folder structure, database or template engine - you choose.","Request flow: <b>client → middleware chain → route handler → response</b>.","Express 5 is the current major version (needs Node 18+)."],
  code:['terminal',`mkdir myapp && cd myapp
npm init -y
npm i express`] },
{ slug:'first-app', group:'Foundations', title:'Our First Express App', lead:'Five lines are enough to get a running server.',
  points:["<code>require('express')</code> returns a function; calling it creates the <code>app</code>.","<code>app.get(path, handler)</code> says: when a GET hits <code>path</code>, run <code>handler</code>.","<code>app.listen(port)</code> starts the server; the callback runs once it is ready.","Run with <code>node app.js</code>, open <code>http://localhost:3000</code>.","Every code change needs a restart (fixed in the nodemon topic)."],
  code:['app.js',`const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello Express!'));

app.listen(3000, () => console.log('Listening on 3000'));`], demo:{href:'/demo/hello',label:'Open /demo/hello'} },
{ slug:'req-res', group:'Foundations', title:'Request & Response Objects', lead:'Every handler receives req (what came in) and res (what goes out).',
  points:["<b>req</b>: <code>method</code>, <code>path</code>, <code>params</code>, <code>query</code>, <code>body</code>, <code>ip</code>, <code>get('Header')</code>.","<b>res</b>: <code>send</code>, <code>json</code>, <code>status</code>, <code>redirect</code>, <code>render</code>, <code>sendFile</code>, <code>set</code>.","<code>res.status(404).send('Nope')</code> - methods chain.","Send <b>one</b> response per request, or you get 'Cannot set headers after they are sent'.","Express adds helpers on top of Node's req/res - it does not replace them."],
  code:['app.js',`app.get('/demo/json', (req, res) => {
  res.json({
    method: req.method,
    path: req.path,
    userAgent: req.get('User-Agent')
  });
});`], demo:{href:'/demo/json',label:'Open /demo/json'} },
{ slug:'routing', group:'Routing', title:'Routing: Basics to Advanced', lead:'A route = HTTP method + path pattern + handler(s).',
  points:["Methods: <code>get post put patch delete</code>; <code>app.all</code> matches every method.","<b>Order matters</b> - first matching route wins and ends the response.","Chain verbs on one path with <code>app.route('/x').get(..).post(..)</code>.","A route can have several handlers; call <code>next()</code> to pass on.","Express 5 patterns: optional segment <code>/users{/:id}</code>, named wildcard <code>/files/*splat</code>.","Catch-all <code>app.use(...)</code> placed <b>last</b> becomes your 404 page."],
  code:['app.js',`app.route('/cats')
  .get((req, res) => res.send('list cats'))
  .post((req, res) => res.send('create cat'));

app.get('/users{/:id}', (req, res) => res.send('id: ' + req.params.id));
app.get('/files/*splat', (req, res) => res.json(req.params.splat));

app.use((req, res) => res.status(404).send('Not found')); // last`] },
{ slug:'path-params', group:'Routing', title:'Path Parameters', lead:'Dynamic parts of a URL, written with a colon.',
  points:["<code>/r/:sub</code> matches <code>/r/cats</code> and gives <code>req.params.sub = 'cats'</code>.","Many params allowed: <code>/users/:id/posts/:postId</code>.","Values are always <b>strings</b> - convert with <code>Number()</code>.","<code>app.param('id', fn)</code> runs shared logic whenever <code>:id</code> appears.","Use params to <b>identify a resource</b>; use query strings to filter it."],
  code:['app.js',`app.get('/demo/params/:a/:b', (req, res) => {
  res.json({ params: req.params });
});`], demo:{href:'/demo/params/42/hello',label:'Open /demo/params/42/hello'} },
{ slug:'query-string', group:'Routing', title:'Working with Query Strings', lead:'Everything after ? in the URL, parsed into req.query.',
  points:["<code>/search?q=cats&limit=3</code> → <code>req.query = {q:'cats', limit:'3'}</code>.","Destructure with defaults: <code>const {q='', limit=3} = req.query</code>.","Values are strings (again) - convert numbers yourself.","Repeated keys become arrays: <code>?tag=a&tag=b</code>.","Missing key = <code>undefined</code>, never an error - always give defaults."],
  code:['app.js',`app.get('/demo/search', (req, res) => {
  const { q = '', limit = 3 } = req.query;
  res.send('Searching ' + q + ', max ' + limit);
});`], demo:{href:'/demo/search?q=ejs&limit=3',label:'Open /demo/search?q=ejs'} },
{ slug:'nodemon', group:'Routing', title:'Auto Restart with Nodemon', lead:'Stop restarting the server by hand after each change.',
  points:["Install as a dev tool: <code>npm i -D nodemon</code>.","Run <code>npx nodemon app.js</code>, or add a <code>dev</code> script and use <code>npm run dev</code>.","Type <code>rs</code> + Enter in the terminal to restart manually.","By default it watches js/mjs/json; add <code>-e js,json,ejs</code> to include templates.","Dev only - production uses <code>node app.js</code> (or a process manager)."],
  code:['package.json',`"scripts": {
  "start": "node app.js",
  "dev": "nodemon -e js,json,ejs app.js"
}`] },
{ slug:'ejs-setup', group:'Templating (EJS)', title:'Configuring Express for EJS', lead:'EJS = Embedded JavaScript: HTML with JS inside special tags.',
  points:["Install: <code>npm i ejs</code> (no <code>require</code> needed).","Tell Express: <code>app.set('view engine','ejs')</code>.","<code>res.render('home')</code> now finds <code>views/home.ejs</code>, runs it, sends the HTML.","The <code>.ejs</code> extension is optional in <code>render()</code>.","Why templates? Build pages from data instead of hard-coding HTML strings."],
  code:['app.js',`app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home'));
// -> views/home.ejs`] },
{ slug:'views-dir', group:'Templating (EJS)', title:'Setting the Views Directory', lead:'Where Express looks for templates.',
  points:["Default is <code>./views</code> <b>relative to where you ran node</b>.","Start the app from another folder and rendering breaks.","Fix: <code>app.set('views', path.join(__dirname,'views'))</code>.","Subfolders work: <code>res.render('demo/notes')</code> → <code>views/demo/notes.ejs</code>.","You can rename the folder to anything - just point <code>views</code> at it."],
  code:['app.js',`const path = require('path');

app.set('views', path.join(__dirname, 'views'));`] },
{ slug:'interpolation', group:'Templating (EJS)', title:'EJS Interpolation Syntax', lead:'Five tags cover almost everything.',
  points:["<code>&lt;%= expr %&gt;</code> - output, <b>HTML-escaped</b> (safe against XSS).","<code>&lt;%- expr %&gt;</code> - output <b>raw</b> (use only for trusted HTML, e.g. includes).","<code>&lt;% code %&gt;</code> - run JS, prints nothing (if / for).","<code>&lt;%# note %&gt;</code> - comment, never sent to the browser.","<code>-%&gt;</code> trims the newline after a tag.","Any JS expression works: <code>&lt;%= 2 + 3 %&gt;</code>, <code>&lt;%= name.toUpperCase() %&gt;</code>."],
  code:['rand.ejs',`<h1>Number: <%= n %></h1>
<p>Doubled: <%= n * 2 %></p>
<%# this comment is invisible %>
<%- '<b>raw html</b>' %>
<%= '<b>escaped</b>' %>`], demo:{href:'/demo/rand',label:'Open /demo/rand'} },
{ slug:'passing-data', group:'Templating (EJS)', title:'Passing Data to Templates', lead:'The second argument of render() becomes variables in the template.',
  points:["<code>res.render('rand', { n: 7 })</code> → inside the file, <code>n</code> is a variable.","Pass strings, numbers, arrays, objects - anything.","<code>res.locals.x</code> is available to <b>every</b> view of that request (this site uses it for the sidebar).","<code>app.locals.x</code> is available to every view of the app.","Using an undefined variable throws; use <code>locals.x</code> for optional ones."],
  code:['app.js',`app.get('/demo/rand', (req, res) => {
  const n = Math.floor(Math.random() * 10) + 1;
  res.render('demo/rand', { n });
});

// in any template: <%= locals.title || 'Untitled' %>`], demo:{href:'/demo/rand',label:'Refresh /demo/rand'} },
{ slug:'subreddit-demo', group:'Templating (EJS)', title:'Subreddit Template Demo', lead:'Path param + template = one page for infinite URLs.',
  points:["One route <code>/r/:sub</code> serves <code>/r/cats</code>, <code>/r/dogs</code>, anything.","Read the param, pass it to <code>render</code>.","Template prints it with <code>&lt;%= sub %&gt;</code>.","This is the core idea of server-side rendering."],
  code:['app.js + subreddit-simple.ejs',`app.get('/demo/r/:sub/simple', (req, res) => {
  res.render('demo/subreddit-simple', { sub: req.params.sub });
});

<!-- subreddit-simple.ejs -->
<h1>Browsing the <%= sub %> subreddit</h1>`], demo:{href:'/demo/r/cats/simple',label:'Open /demo/r/cats/simple'} },
{ slug:'conditionals', group:'Templating (EJS)', title:'Conditionals in EJS', lead:'Show or hide HTML depending on data.',
  points:["Every JS line gets its own tag: open the <code>if</code>, write HTML, close with <code>}</code>.","<code>else</code> must sit in a tag too: <code>&lt;% } else { %&gt;</code>.","For small cases use a ternary inside output: <code>&lt;%= n &gt; 5 ? 'big' : 'small' %&gt;</code>.","Forgetting a closing <code>&lt;% } %&gt;</code> is the #1 EJS error."],
  code:['rand.ejs',`<% if (n % 2 === 0) { %>
  <p>Even number</p>
<% } else { %>
  <p>Odd number</p>
<% } %>`], demo:{href:'/demo/rand',label:'Open /demo/rand'} },
{ slug:'loops', group:'Templating (EJS)', title:'Loops in EJS', lead:'Turn arrays into repeated HTML.',
  points:["<code>forEach</code>, <code>for</code> and <code>for...of</code> all work.","HTML between the tags repeats for every item.","Index available: <code>forEach((x, i) =&gt; ...)</code>.","Handle the empty array with <code>if (arr.length)</code> / else.","Arrays of objects are the common case: posts, products, users."],
  code:['list.ejs',`<ul>
<% posts.forEach((p, i) => { %>
  <li><%= i + 1 %>. <%= p.title %></li>
<% }) %>
</ul>`], demo:{href:'/demo/r/dogs',label:'Open /demo/r/dogs'} },
{ slug:'subreddit-complex', group:'Templating (EJS)', title:'A More Complex Subreddit Demo', lead:'JSON data + params + conditionals + loops + 404.',
  points:["Look up <code>data[req.params.sub]</code> in a JSON file (a fake database).","Not found → <code>res.status(404).render('404')</code>.","Spread the found object into render: <code>{ sub, ...d }</code>.","Template combines: badge conditional, post loop, empty state, number formatting.","Try <code>/demo/r/webdev</code> (no posts) and <code>/demo/r/nope</code> (404)."],
  code:['app.js',`app.get('/demo/r/:sub', (req, res) => {
  const d = subs[req.params.sub];
  d ? res.render('demo/subreddit', { sub: req.params.sub, ...d })
    : res.status(404).render('404');
});`], demo:{href:'/demo/r/cats',label:'Open /demo/r/cats'} },
{ slug:'static', group:'Assets & Structure', title:'Serving Static Assets', lead:'CSS, JS, images and fonts that never change per request.',
  points:["<code>app.use(express.static('public'))</code> exposes the folder's files.","<code>public/css/style.css</code> is reached at <code>/css/style.css</code> - no 'public' in the URL.","Use an <b>absolute</b> path (<code>path.join(__dirname,'public')</code>).","Prefix is possible: <code>app.use('/assets', express.static(...))</code>.","In templates link with a leading slash: <code>/css/style.css</code>, so it works on every route."],
  code:['app.js',`app.use(express.static(path.join(__dirname, 'public')));

<!-- in head.ejs -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/main.js" defer></script>`], demo:{href:'/css/style.css',label:'Open /css/style.css'} },
{ slug:'partials', group:'Assets & Structure', title:'EJS and Partials', lead:'Reusable chunks - header, sidebar, footer - written once.',
  points:["<code>&lt;%- include('partials/head', { title: 'Hi' }) %&gt;</code>.","Must use <code>&lt;%-</code> (raw), otherwise the HTML gets escaped.","Paths are relative to the <b>current file</b>: from <code>views/demo/</code> use <code>../partials/head</code>.","Pass data as the second argument; read it as <code>locals.title</code>.","Typical split: <code>head</code> (open page) and <code>foot</code> (close page).","This whole site is built from <code>head</code> + <code>sidebar</code> + <code>foot</code> partials."],
  code:['views/demo/rand.ejs',`<%- include('../partials/head', { title: 'Random' }) %>
  <article> ...page content... </article>
<%- include('../partials/foot') %>`] },
{ slug:'middleware', group:'Going Further', title:'Middleware (Added)', lead:'Functions that run between request and response.',
  points:["Signature <code>(req, res, next)</code>; call <code>next()</code> to continue or respond to stop.","<code>app.use(fn)</code> runs for every request, <b>in the order written</b>.","Built-ins: <code>express.static</code>, <code>express.json</code>, <code>express.urlencoded</code>.","Per-route: <code>app.get('/x', auth, handler)</code>.","<code>res.locals</code> set in middleware reaches templates - this site's sidebar uses it."],
  code:['app.js',`app.use((req, res, next) => {
  console.log(req.method, req.url);
  res.locals.path = req.path;
  next();
});`] },
{ slug:'router', group:'Going Further', title:'Express Router & Forms (Added)', lead:'Split routes into files and accept POST data.',
  points:["<code>express.Router()</code> is a mini-app with its own routes.","Mount it: <code>app.use('/demo/notes', router)</code>; inside, paths are relative to the mount.","<code>express.urlencoded({extended:true})</code> fills <code>req.body</code> from HTML forms.","Pattern <b>POST → redirect → GET</b> stops duplicate form submits on refresh.","HTML forms only do GET/POST; <code>method-override</code> adds PUT/DELETE."],
  code:['routes/notes.js',`const router = require('express').Router();

router.get('/', (req, res) => res.render('demo/notes', { notes }));
router.post('/', (req, res) => {
  notes.push(req.body.text);
  res.redirect('/demo/notes');
});`], demo:{href:'/demo/notes',label:'Open /demo/notes'} },
{ slug:'errors', group:'Going Further', title:'404s & Error Handling (Added)', lead:'Fail gracefully instead of a blank crash.',
  points:["404: a plain <code>app.use</code> after all routes.","Error handler has <b>4 arguments</b> <code>(err, req, res, next)</code> and goes last.","Throwing inside a handler reaches it; in Express 5 rejected async handlers do too.","Express 4 needs <code>try/catch</code> + <code>next(err)</code> in async code.","Never show raw stack traces to users in production."],
  code:['app.js',`app.use((req, res) => res.status(404).render('404'));

app.use((err, req, res, next) => {
  res.status(500).render('error', { err });
});`], demo:{href:'/demo/error',label:'Trigger /demo/error'} }
];
