import { Box, Checkbox, Chip, IconButton, Typography } from "@mui/material";
import { Task } from "../state/state";
import React from "react";
import { DeleteOutline } from "@mui/icons-material";

const TaskList = ({ task }: { task: Task }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"80%"}
      marginBottom={"1rem"}
      bgcolor={"wheat"}
      borderRadius={"12px"}
      padding={"1rem"}
    >
      <Box
        padding={"8px"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={"24px"} fontWeight={"medium"}>
          {task.taskName}
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton aria-label="check">
            <Checkbox />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <DeleteOutline fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Typography>{task.description}</Typography>
      <Typography>
        {task.dueDate
          .toString()
          .substring(0, task.dueDate.toString().indexOf("T"))}
      </Typography>
      <Box width={"50%"} padding={"1rem"}>
        <Chip label={task.tag} variant="outlined" />
      </Box>
    </Box>
  );
};

export default TaskList;
