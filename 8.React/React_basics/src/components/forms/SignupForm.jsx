// 676. Controlled Components
// 677. The htmlFor Property
// 678. Working With Multiple Inputs
// 679. A Better Signup Form
// 680. Computed Property Names in HandleChange()

import { useState } from 'react';

// 676: a CONTROLLED component — the input has no life of its own.
// React owns its value: value={form.email} + onChange to update state.
// Every keystroke → state change → re-render with the new value.

// 677: <label htmlFor="x"> + <input id="x"> tie a label to its input,
// so clicking the label text focuses the input. Accessibility!

// 678: multiple inputs, ALL held in ONE state object (661 refresher).
// 680: one single handleChange for every input, using a computed
// property name [e.target.name] — the input's name attribute decides
// WHICH key of the object gets updated. No more updateName/updateEmail/...
export default function SignupForm() {
  // 679: one state object with a field PER input
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // 680: the generic handler. Each <input name="email"> makes
  // e.target.name === 'email', so this updates form.email — for ANY input.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    //                ^^^^^^^^^^^^^^^^ computed property name:
    //                a variable AS the key of the new object
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading (658-neighbor: forms!)
    console.log('signed up:', form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h2>📝 Signup complete!</h2>
        <p>
          Hello {form.username} ({form.email})
        </p>
        <button onClick={() => setSubmitted(false)}>Sign up another</button>
      </div>
    );
  }

  return (
    <div>
      <h2>📝 Signup (controlled form)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* 677: label's htmlFor === input's id */}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* checkboxes: value is a boolean, from e.target.checked */}
        <label htmlFor="agree">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={(e) =>
              setForm({ ...form, agree: e.target.checked })
            }
          />{' '}
          I agree to the terms
        </label>

        <button type="submit">Sign up</button>
      </form>
      <p>
        Live state: {form.username || '—'} / {form.email || '—'} /{' '}
        {form.password ? '•'.repeat(form.password.length) : '—'} / agrees:{' '}
        {form.agree}
      </p>
    </div>
  );
}
