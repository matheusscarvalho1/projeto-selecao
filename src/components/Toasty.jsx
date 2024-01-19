import StarIcon from "@mui/icons-material/Star";

import { Alert, Box, Button, IconButton } from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Toasty = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Alert
        variant="soft"
        color="inherit"
        startDecorator={<StarIcon />}
        endDecorator={
          <Button size="sm" variant="solid" color="inherit">
            Close
          </Button>
        }
      >
        Your message was sent successfully.
      </Alert>
      <Alert
        variant="outlined"
        color="neutral"
        startDecorator={<AccountCircleRoundedIcon />}
        endDecorator={
          <IconButton variant="plain" size="sm" color="neutral">
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        Your account was updated.
      </Alert>
    </Box>
  );
};

export default Toasty;
