// Import Express, which provides the web-server framework.
const express = require('express');
// Import Node's path module for safely building filesystem paths.
const path = require('path');
// Create the Express application object.
const app = express();
// Load the topic data from a JavaScript module.
const topics = require('./data/topics');
// Load subreddit data from a JSON file.
const subs = require('./data/reddit.json');

// Tell Express to use EJS when rendering view templates.
app.set('view engine', 'ejs');
// Set the directory where Express looks for EJS templates.
app.set('views', path.join(__dirname, 'views'));
// Serve files such as CSS, JavaScript, and images from the public directory.
app.use(express.static(path.join(__dirname, 'public')));
// Parse URL-encoded form data and place it in req.body; extended allows nested values.
app.use(express.urlencoded({ extended: true }));
// Run this middleware for every request.
app.use((req, res, next) => {
  // Make the topics array available to every rendered view through res.locals.
  res.locals.topics = topics;
  // Make the current URL path available to every rendered view.
  res.locals.path = req.path;
  // Continue to the next middleware or matching route.
  next();
});

// Handle GET requests to the home page and render views/home.ejs.
app.get('/', (req, res) => res.render('home'));
// Handle a topic URL whose slug is captured in req.params.slug.
app.get('/topic/:slug', (req, res, next) => {
  // Find the index of the topic whose slug matches the URL parameter.
  const i = topics.findIndex(t => t.slug === req.params.slug);
  // If no topic matches, skip to the later 404 middleware.
  if (i < 0) return next();
  // Render the topic view and pass it the current, previous, and next topics.
  res.render('topic', { t: topics[i], prev: topics[i - 1], next: topics[i + 1] });
});

// ---- Live demonstration routes showing common Express features. ----
// Send a simple HTML response for a GET request to /demo/hello.
app.get('/demo/hello', (req, res) => res.send('<h1>Hello from Express!</h1>'));
// Return request information as a JSON response.
app.get('/demo/json', (req, res) => res.json({
  // The HTTP method used by the client, such as GET.
  method: req.method,
  // The URL path without the query string.
  path: req.path,
  // The client's IP address.
  ip: req.ip,
  // Read the User-Agent request header.
  userAgent: req.get('User-Agent')
}));
// Capture two URL parameters and return them as JSON.
app.get('/demo/params/:a/:b', (req, res) => res.json({ params: req.params }));
// Demonstrate reading query-string values and filtering data.
app.get('/demo/search', (req, res) => {
  // Read q and limit from the query string; use defaults when they are missing.
  const { q = '', limit = 3 } = req.query;
  // Keep topics containing q, then limit the number of returned results.
  const results = topics
    .filter(t => t.title.toLowerCase().includes(q.toLowerCase()))
    .slice(0, Number(limit));
  // Render the search view and pass it the search values and results.
  res.render('demo/search', { q, limit, results });
});
// Render a random integer from 1 through 10.
app.get('/demo/rand', (req, res) => res.render('demo/rand', {
  n: Math.floor(Math.random() * 10) + 1
}));
// Render a simple subreddit page using the :sub URL parameter.
app.get('/demo/r/:sub/simple', (req, res) => res.render('demo/subreddit-simple', {
  sub: req.params.sub
}));
// Render detailed subreddit data when the requested subreddit exists.
app.get('/demo/r/:sub', (req, res) => {
  // Look up the subreddit using the captured URL parameter as the object key.
  const d = subs[req.params.sub];
  // Render the page if data exists; otherwise send a 404 page.
  d
    ? res.render('demo/subreddit', { sub: req.params.sub, ...d })
    : res.status(404).render('404');
});
// Mount the notes router; its routes receive /demo/notes as their prefix.
app.use('/demo/notes', require('./routes/notes'));
// Deliberately throw an error to demonstrate the error handler below.
app.get('/demo/error', () => {
  throw new Error('Boom! An intentional demo error.');
});

// Handle every unmatched request with HTTP status 404; keep this after all routes.
app.use((req, res) => res.status(404).render('404'));
// Error-handling middleware has four parameters, so Express recognizes it as an error handler.
app.use((err, req, res, next) => res.status(500).render('error', { err }));

// Start listening on the host-provided PORT (e.g. Vercel/Render); falls back to 3000 locally.
app.listen(process.env.PORT || 3000, () => console.log('Express Lab -> http://localhost:' + (process.env.PORT || 3000)));
