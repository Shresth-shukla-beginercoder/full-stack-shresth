// 685. Validations using React Hook Form

// 684 was you writing every rule + every setState by hand.
// react-hook-form does the same job with much less code:
//   1. useForm() gives you a `register` function and a `handleSubmit`
//   2. attach register('field') to an input — RHF tracks it for you
//   3. rules (required/min/maxLength...) live ON register
//   4. on submit, you get an errors object the same shape as 684
// You barely touch useState at all — that's the point.
import { useForm } from 'react-hook-form';

export default function RHFValidation() {
  const {
    register, // attach to inputs
    handleSubmit, // wraps your submit function with validation
    formState: { errors }, // live errors object
    reset, // clears the form
  } = useForm();

  // only called AFTER all rules pass
  function onSubmit(data) {
    console.log('valid data:', data);
    alert(`Welcome, ${data.username}!`);
    reset();
  }

  return (
    <div>
      <h2>⚡ react-hook-form validation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="r-username">Username</label>
          <input
            id="r-username"
            {...register('username', { required: true, minLength: 3 })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="r-email">Email</label>
          <input id="r-email" type="email" {...register('email', { required: true })} />
          {errors.email && <p style={{ color: 'red' }}>Valid email required</p>}
        </div>

        <div>
          <label htmlFor="r-password">Password</label>
          <input
            id="r-password"
            type="password"
            {...register('password', {
              required: true,
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
