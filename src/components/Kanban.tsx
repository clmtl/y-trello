import { api } from "~/utils/api";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { describe } from "node:test";

const Kanban: React.FC = () => {
  const tasks = api.task.getAll.useQuery();
  tasks.isError && console.log("error");
  tasks.isLoading && console.log("loading");
  return (
    <div>
      <div className="ml-10 mt-10 flex space-x-10">
        <Column title="Todo">
          {tasks.data?.map((task) =>
            task.state === "TODO" ? (
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description || ""}
                priority={task.priority}
                state={task.state}
                key={task.id + "-key"}
              />
            ) : (
              <></>
            ),
          )}
        </Column>
        <Column title="In Progress">
          <></>
        </Column>
        <Column title="Done">
          <></>
        </Column>
      </div>
    </div>
  );
};

export default Kanban;
