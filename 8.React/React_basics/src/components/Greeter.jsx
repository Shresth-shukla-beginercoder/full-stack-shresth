// 631. Introducing Props / 632. Non-String Props
// 646. PropTypes Library Crash Course

import PropTypes from 'prop-types';

// A component is just a function that returns JSX.
// props = the data we pass INTO it, like <Greeter person="Jasmine" />
export default function Greeter(props) {
  return (
    <div>
      <h1>Hi there, {props.person}!</h1>
      <h2>You are {props.age} years old.</h2>
      <p>Your favorite number is {props.favNum}</p>
    </div>
  );
}

// 646: PropTypes = a safety check that warns in the DEV console
// when a parent forgets to pass a prop, or passes the wrong type.
// It does NOT stop the app from running — it just helps you find
// bugs early.
Greeter.propTypes = {
  person: PropTypes.string.isRequired, // required, no default
  age: PropTypes.number, // optional, but must be a number
  favNum: PropTypes.number,
};

// You can also set defaults here instead of `||` in the code:
// Greeter.defaultProps = { age: 0, favNum: 7 }
// NOTE: this project uses React 19, which ignores defaultProps on
// function components, so we use the `||` fallback style shown in
// Badge.jsx instead. (The course video shows defaultProps — both
// ideas are the same, just an older-React way of writing it.)
