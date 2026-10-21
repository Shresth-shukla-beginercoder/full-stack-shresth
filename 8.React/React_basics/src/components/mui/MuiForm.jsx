// 695. Material Forms
// 696. The SX Prop and Custom Styles

// Material form controls: TextField, Button, FormControlLabel,
// Checkbox... each looks and behaves like a polished form field,
// with labels, focus rings, and error states for free.
// 696: `sx` is the MUI styling prop — an object of CSS-like styles
// (their "box" helpers: mt/my = margin top/y, px/py, gap, etc.).
import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export default function MuiForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <Box>
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => setSent(false)}
            sx={{ px: 2 }}
          >
            ← go back
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="primary">Thanks for signing up!</Typography>
          <Typography>🎉 Check your inbox</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Full name" required variant="outlined" />
        <TextField label="Email" type="email" required variant="outlined" />
        <TextField label="Password" type="password" required />

        {/* 695: a select/dropdown via Select + MenuItem */}
        <FormControl fullWidth>
          <InputLabel id="plan-label">Plan</InputLabel>
          <Select labelId="plan-label" label="Plan">
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="pro">Pro</MenuItem>
            <MenuItem value="team">Team</MenuItem>
          </Select>
        </FormControl>

        {/* 695: a checkbox */}
        <FormControlLabel
          control={<Checkbox />}
          label="I want the newsletter"
        />

        {/* 696: the sx prop customizing a button */}
        <Button type="submit" variant="contained" sx={{ px: 4, py: 1.5, borderRadius: 3 }}>
          Create account
        </Button>
      </Box>
    </Box>
  );
}
