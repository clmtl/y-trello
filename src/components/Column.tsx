import { type State } from "@prisma/client";
import { useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { api } from "~/utils/api";

interface Props {
  title: string;
  state: State;
  children: React.ReactNode;
}

const Column: React.FC<Props> = ({ title, state, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardContent, setCardContent] = useState("");
  const ctx = api.useContext();

  const { mutate: createCard } = api.task.create.useMutation({
    onSuccess: async () => {
      setIsEditing(false);
      setCardContent("");
      await ctx.task.getAll.invalidate();
    },
  });

  return (
    <div className="ml-[5%] mt-[10%] max-h-[80%] w-64 overflow-scroll rounded-md bg-gray-900 p-2 shadow-xl">
      <h2 className=" border-b-2 border-b-gray-400 pb-2 text-center text-xl font-semibold text-gray-400">
        {title}
      </h2>
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            className="w-full rounded-md bg-gray-800 p-1 text-gray-200"
            placeholder="Enter a title for the task..."
          />
          <div className="mt-2 flex items-center justify-center space-x-10">
            <button
              className="text-gray-400"
              onClick={() => setIsEditing(false)}
            >
              <MdCancel />
            </button>
            <button
              className="text-gray-400"
              onClick={() =>
                createCard({
                  title: cardContent,
                  state: state,
                })
              }
            >
              <BsFillSendCheckFill />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="border-invisible mt-2 w-[95%] rounded-l border-2 border-transparent text-center text-gray-400 transition hover:border-gray-700"
            onClick={() => setIsEditing(true)}
          >
            + Add a card
          </button>
        </div>
      )}
      <div className="relative mt-2 flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default Column;
