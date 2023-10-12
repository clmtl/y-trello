import Column from "./Column";

const Kanban: React.FC = () => {
  return (
    <div>
      <div className="ml-10 mt-10 flex space-x-10">
        <Column title="Todo">
          <></>
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
