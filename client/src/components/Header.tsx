import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../state/state";

const Header = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: AuthState) => state.accessToken);
  const refreshToken = useSelector((state: AuthState) => state.refreshToken);
  const header: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
    refresh_token: refreshToken!,
  };
  const handleSignout = async () => {
    const response = await fetch("http://localhost:3333/api/session", {
      method: "DELETE",
      headers: header,
    });
    if (response.status === 200) {
      dispatch(setLogout());
    }
  };
  return (
    <Box width={"100%"} bgcolor={"black"} height={"60px"}>
      <Typography
        display={"flex"}
        color={"white"}
        textAlign={"center"}
        fontSize={"22px"}
        padding={"10px"}
        fontWeight={"bold"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        Tasks
        <Button onClick={handleSignout} variant="contained">
          Signout
        </Button>
      </Typography>
    </Box>
  );
};

export default Header;
