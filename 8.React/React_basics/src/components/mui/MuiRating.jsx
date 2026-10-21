// 692. Introducing Material UI
// 693. (installing @mui/material + @emotion/react — done via npm)
// 694. The Rating Component
// 696. The SX Prop and Custom Styles

// MUI = Material-UI, a React component library. Instead of building
// buttons/inputs/rating from scratch, import pre-made, pre-styled
// ones. 696: the `sx` prop is MUI's way of adding quick inline style
// overrides without writing CSS files.

import { useState } from 'react';
import {
  Box, // generic styled div
  Button,
  Rating,
  Typography,
} from '@mui/material';

export default function MuiRating() {
  const [value, setValue] = useState(3);

  return (
    <Box>
      <Typography variant="h6">⭐ MUI Rating component</Typography>
      {/* 694: a ready-made star rating */}
      <Rating
        value={value}
        precision={0.5} // allow half stars
        onChange={(e, newValue) => setValue(newValue)}
      />
      <Typography>{value} out of 5</Typography>

      {/* 696: the sx prop = inline style objects, with MUI helpers */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ borderRadius: 2, px: 3 }}>
          Save rating
        </Button>
        <Button variant="outlined" onClick={() => setValue(0)} sx={{ ml: 1, color: '#ff6b6b', borderColor: '#ff6b6b' }}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}
