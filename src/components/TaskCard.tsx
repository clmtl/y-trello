import { useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Priority } from "@prisma/client";

interface Props {
  id: string;
  title: string;
  description: string;
  priority: string;
  state: string;
}

const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  priority,
  state,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const changeState = () => {
    console.log("changeState");
  };
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempPriority, setTempPriority] = useState(priority);
  const [tempState, setTempState] = useState(state);

  const returnPiorityIcon = () => {
    if (priority === Priority.HIGHEST)
      return <MdKeyboardDoubleArrowUp className="text-xl text-red-800" />;
    if (priority === Priority.HIGH)
      return <MdKeyboardArrowUp className="text-xl text-orange-500" />;
    if (priority === Priority.MEDIUM)
      return <AiOutlineMinus className="text-xl text-white" />;
    if (priority === Priority.LOW)
      return <MdKeyboardArrowDown className="text-xl text-blue-600" />;
    if (priority === Priority.LOWEST)
      return <MdKeyboardDoubleArrowDown className="text-xl text-green-800" />;
  };

  return (
    <>
      <div
        className="mb-2 mt-2 rounded-lg bg-gray-700"
        onClick={() => setPopupOpen(true)}
      >
        <p className="text-gray-300">{title}</p>
        <div className="flex content-between">
          <p>{description.length > 0 && <BsTextLeft />}</p>
          <p>{returnPiorityIcon()}</p>
        </div>
      </div>
      {popupOpen ? (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 p-14 text-gray-300">
          <div className="h-1/2 w-1/2 rounded-lg bg-gray-700">
            <div className="flex items-center justify-between">
              <p className="text-white">{title}</p>
              <button onClick={() => setPopupOpen(false)}>X</button>
            </div>
            <div className="m-2 flex flex-col border-b-2 border-t-2 pb-2 text-xl">
              {" "}
              <p className="flex">
                <BsTextLeft className="text-2xl" /> Description
              </p>
              <textarea value={description} className="bg-slate-500 text-sm" />
            </div>
            <p className="m-2 text-xl">Priority </p>
            <div className="m-2 flex border-b-2">
              <p className="m-2 flex pl-4">
                {priority} {returnPiorityIcon()}
              </p>
              <p className="m-2 flex pl-4">Update Priority : </p>
              <select name="Update Priority" id="cars" className="bg-gray-600">
                <option value="HIGHEST">Highest</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
                <option value="LOWEST">Lowest</option>
              </select>
            </div>

            <p>State : {state}</p>
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
