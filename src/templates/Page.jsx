import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Header from "../partials/Header/Header";

import useAuth from "../state/auth";

const Page = ({ title, Component }) => {
  const { user } = useAuth();

  return (
    <>
      <Container maxWidth={false} style={{ padding: 0 }}>
        <Header user={user} />
        <Typography variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>

        {Component && <Component />}
      </Container>
    </>
  );
};

export default Page;
