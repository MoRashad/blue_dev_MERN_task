import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../state/state";
import { Task } from "../state/state";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: AuthState) => state.accessToken);
  const refreshToken = useSelector((state: AuthState) => state.refreshToken);
  const [tasks, setTasks] = useState<Task[]>();
  const [error, setError] = useState<string | unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3333/api/tasks", {
          headers: {
            authorization: `Bearer ${accessToken}`,
            refresh_token: refreshToken!,
          },
        });
        if (response.status === 403) dispatch(setLogout());
        const jsonRes = await response.json();
        setTasks(jsonRes.tasks);
        console.log(jsonRes);

        console.log(response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }
    fetchTasks();
  }, [accessToken, refreshToken, dispatch]);
  if (loading) return <CircularProgress />;
  if (error) return <Typography>Something went wrong</Typography>;
  return (
    <div>
      <Header />
      <Container>
        <Box
          marginTop={"3rem"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button variant="outlined" size="large">
            add new task
          </Button>
          {tasks &&
            tasks.map((task) => {
              return <TaskList key={task._id} task={task} />;
            })}
        </Box>
      </Container>
    </div>
  );
};

export default TasksPage;
