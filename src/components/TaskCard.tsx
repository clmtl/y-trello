import { useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Priority, type State } from "@prisma/client";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { api } from "~/utils/api";

interface Props {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  state: State;
}

const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  priority,
  state,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempPriority, setTempPriority] = useState<Priority>(priority);

  const ctx = api.useContext();

  const { mutate: updateCard } = api.task.update.useMutation({
    onSuccess: async () => {
      setPopupOpen(false);
      await ctx.task.getAll.invalidate();
    },
  });

  const { mutate: deleteCard } = api.task.delete.useMutation({
    onSuccess: async () => {
      setPopupOpen(false);
      await ctx.task.getAll.invalidate();
    },
  });

  const mooveCardLeft = () => {
    if (state === "TODO") return;

    if (state === "IN_PROGRESS") {
      updateCard({
        id: id,
        title: title,
        description: description,
        priority: priority,
        state: "TODO",
      });
    }

    if (state === "DONE") {
      updateCard({
        id: id,
        title: title,
        description: description,
        priority: priority,
        state: "IN_PROGRESS",
      });
    }
  };

  const mooveCardRight = () => {
    if (state === "DONE") return;
    if (state === "TODO") {
      updateCard({
        id: id,
        title: title,
        description: description,
        priority: priority,
        state: "IN_PROGRESS",
      });
    }
    if (state === "IN_PROGRESS") {
      updateCard({
        id: id,
        title: title,
        description: description,
        priority: priority,
        state: "DONE",
      });
    }
  };

  const returnPiorityIcon = () => {
    if (priority === Priority.HIGHEST)
      return (
        <MdKeyboardDoubleArrowUp className="rounded-full border-2 bg-slate-300 text-xl text-red-800" />
      );
    if (priority === Priority.HIGH)
      return (
        <MdKeyboardArrowUp className="rounded-full border-2 bg-slate-300 text-xl text-orange-500" />
      );
    if (priority === Priority.MEDIUM)
      return (
        <AiOutlineMinus className="rounded-full border-2 bg-slate-300 text-xl text-black" />
      );
    if (priority === Priority.LOW)
      return (
        <MdKeyboardArrowDown className="rounded-full border-2 bg-slate-300 text-xl text-blue-600" />
      );
    if (priority === Priority.LOWEST)
      return (
        <MdKeyboardDoubleArrowDown className="rounded-full border-2 bg-slate-300 text-xl text-green-800" />
      );
  };

  return (
    <>
      <div className="relative mb-2 mt-2 h-28 rounded-lg bg-gray-700">
        <p
          className="mb-2 ml-2 text-xl text-gray-300"
          onClick={() => setPopupOpen(true)}
        >
          {title}
        </p>
        <p className="ml-2 text-xs text-gray-900">{description}</p>
        <div className="absolute right-2 top-2">
          <p className="">{returnPiorityIcon()}</p>
        </div>
        <div className="absolute bottom-2 right-2 flex">
          <BsFillArrowLeftCircleFill
            className="cursor-pointer rounded-full text-2xl text-slate-400 shadow-sm"
            onClick={mooveCardLeft}
          />
          <BsFillArrowRightCircleFill
            className="ml-2 cursor-pointer rounded-full text-2xl text-slate-400 shadow-sm"
            onClick={mooveCardRight}
          />
        </div>
      </div>
      {popupOpen ? (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 p-14 text-gray-300">
          <div className="relative h-1/2 w-1/2 rounded-lg bg-gray-700">
            <div className="flex items-center justify-between">
              <p className="mb-2 text-2xl text-white">
                {title} : {state}
              </p>
              <button className="mr-4" onClick={() => setPopupOpen(false)}>
                X
              </button>
            </div>
            <div className="m-2 flex flex-col border-b-2 border-t-2 pb-2 text-xl">
              {" "}
              <p className="flex">
                <BsTextLeft className="text-2xl" /> Description
              </p>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                readOnly={false}
                className="bg-slate-500 text-sm"
              />
            </div>
            <p className="m-2 text-xl">Priority </p>
            <div className="m-2 flex border-b-2">
              <p className="m-2 flex pl-4">
                {priority} {returnPiorityIcon()}
              </p>
              <p className="m-2 flex pl-4">Update Priority : </p>
              <select
                name="Update Priority"
                id="cars"
                className="bg-gray-600"
                onChange={(e) => setTempPriority(e.target.value as Priority)}
                defaultValue={priority}
              >
                <option disabled>{priority}</option>
                <option value="HIGHEST">Highest</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
                <option value="LOWEST">Lowest</option>
              </select>
            </div>
            <button
              onClick={() => deleteCard({ id })}
              className=" font-semibol absolute bottom-2 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 py-3 no-underline transition hover:bg-white/20"
            >
              <BsFillTrashFill className="text-xl text-red-900" />
            </button>
            <button
              onClick={() =>
                updateCard({
                  id: id,
                  title: tempTitle,
                  description: tempDescription,
                  priority: tempPriority,
                  state: state,
                })
              }
              className="text-gray-30 absolute bottom-2 right-2 rounded-full border-2 border-gray-300 bg-gray-600 p-5 text-sm"
            >
              {" "}
              Send Modifications{" "}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskCard;
