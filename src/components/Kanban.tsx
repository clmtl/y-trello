import Column from "./Column";
import TaskCard from "./TaskCard";

const Kanban: React.FC = () => {
  return (
    <div>
      <div className="ml-10 mt-10 flex space-x-10">
        <Column title="Todo">
          <TaskCard
            title="Créer un trello"
            description="Tout coder comme un malade"
            priority="HIGHEST"
            state="TODO"
          />
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
