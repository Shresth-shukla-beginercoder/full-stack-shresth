// 684. Form Validation From Scratch

import { useState } from 'react';

// Before a library (685) exists, you write the rules yourself.
// The pattern:
//   1. keep an `errors` state — one entry per field that's wrong
//   2. run the rules on submit; if any fail, store them and DON'T submit
//   3. show each field's error message under that field
// 661 refresher: everything is new-objects-never-mutate.
export default function ValidationFromScratch() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // clear the error for a field the moment the user edits it
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  }

  // THE rules. Returns an errors object; empty object = all good.
  function validate() {
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Needs a valid email';
    if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.confirm !== form.password) errs.confirm = 'Passwords don\'t match';
    return errs;
  }

  function submit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div>
        <h2>✅ All valid — welcome, {form.email}!</h2>
        <button onClick={() => setDone(false)}>start over</button>
      </div>
    );
  }

  return (
    <div>
      <h2>🧪 Validation from scratch</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="v-email">Email</label>
          <input id="v-email" name="email" value={form.email} onChange={update} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="v-pass">Password</label>
          <input
            id="v-pass"
            name="password"
            type="password"
            value={form.password}
            onChange={update}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="v-confirm">Confirm password</label>
          <input
            id="v-confirm"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={update}
          />
          {errors.confirm && <p style={{ color: 'red' }}>{errors.confirm}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
