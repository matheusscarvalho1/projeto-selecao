import Container from "@mui/material/Container";

const Clean = ({ Component }) => {
  return (
    <>
      <Container sx={{ margin: "16px" }}>
        <Component />
      </Container>
    </>
  );
};

export default Clean;
