import { useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface Props {
  title: string;
  description: string;
  priority: string;
  state: string;
}

const TaskCard: React.FC<Props> = ({ title, description, priority, state }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const changeState = () => {
    console.log("changeState");
  };

  const returnPiorityIcon = () => {};

  return (
    <>
      <div
        className="mb-2 mt-2 rounded-lg bg-gray-700"
        onClick={() => setPopupOpen(true)}
      >
        <p className="text-gray-300">{title}</p>
        <p>{description.length > 0 && <BsTextLeft />}</p>
        <p>{priority}</p>
      </div>
      {popupOpen ? (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="h-1/2 w-1/2 rounded-lg bg-gray-700">
            <div className="flex items-center justify-between">
              <p className="text-white">{title}</p>
              <button onClick={() => setPopupOpen(false)}>X</button>
            </div>
            <p>{description}</p>
            <p>{priority}</p>
            <p>{state}</p>
            <button onClick={changeState}>Change state</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskCard;
