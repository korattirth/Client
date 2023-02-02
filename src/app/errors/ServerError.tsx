import { Divider, Paper, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface temp {
  errors: {
    title: string;
    status: number;
    detail: string;
  };
}

const ServerError = () => {
  const navigate = useNavigate();
  const location = useLocation().state as temp;

  return (
    <Container component={Paper}>
      {location.errors ? (
        <>
          <Typography variant="h3" gutterBottom color="error">
            {location.errors.title}
          </Typography>
          <Divider />
          <Typography>
            {location.errors.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>Go back to the store</Button>
    </Container>
  );
};

export default ServerError;
