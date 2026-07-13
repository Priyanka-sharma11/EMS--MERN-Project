import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ tasks, onUpdateStatus }) => {

  if (tasks.length === 0) {
    return (
      <div className="mt-16 text-gray-400 text-sm">
        You have no tasks yet. Check back once your admin assigns you one!
      </div>
    )
  }

  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {tasks.map((task) => {
        if (task.status === "active") {
          return <AcceptTask key={task._id} task={task} onUpdateStatus={onUpdateStatus} />;
        }
        if (task.status === "new") {
          return <NewTask key={task._id} task={task} onUpdateStatus={onUpdateStatus} />;
        }
        if (task.status === "completed") {
          return <CompleteTask key={task._id} task={task} />;
        }
        if (task.status === "failed") {
          return <FailedTask key={task._id} task={task} />;
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;
