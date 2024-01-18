import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

const Clean = ({ title, Component }) => {
  return (
    <>
      <Container sx={{ margin: "16px" }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>
        <Component />
      </Container>
    </>
  );
};

export default Clean;
