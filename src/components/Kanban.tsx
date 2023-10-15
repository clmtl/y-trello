import { api } from "~/utils/api";
import Column from "./Column";
import TaskCard from "./TaskCard";

const Kanban: React.FC = () => {
  const tasks = api.task.getAll.useQuery();
  tasks.isError && console.log("error");
  tasks.isLoading && console.log("loading");

  setInterval(() => {
    tasks;
  }, 3000);
  return (
    <div>
      <div className="ml-2 flex h-screen space-x-10">
        <Column title="Todo" state="TODO">
          {tasks.data?.map((task) =>
            task.state === "TODO" ? (
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description ? task.description : ""}
                priority={task.priority}
                state={task.state}
                key={task.id + "-key"}
              />
            ) : (
              <></>
            ),
          )}
        </Column>
        <Column title="In Progress" state="IN_PROGRESS">
          {tasks.data?.map((task) =>
            task.state === "IN_PROGRESS" ? (
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description ? task.description : ""}
                priority={task.priority}
                state={task.state}
                key={task.id + "-key"}
              />
            ) : (
              <></>
            ),
          )}
        </Column>
        <Column title="Done" state="DONE">
          {tasks.data?.map((task) =>
            task.state === "DONE" ? (
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description ? task.description : ""}
                priority={task.priority}
                state={task.state}
                key={task.id + "-key"}
              />
            ) : (
              <></>
            ),
          )}
        </Column>
      </div>
    </div>
  );
};

export default Kanban;
