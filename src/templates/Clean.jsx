import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

const Clean = ({ title, Component }) => {
  return (
    <>
      <Container sx={{ margin: "1rem" }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          fontFamily={"roboto"}
        >
          {title}
        </Typography>
        <Component />
      </Container>
    </>
  );
};

export default Clean;
