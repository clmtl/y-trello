import { useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Column: React.FC<Props> = ({ title, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardContent, setCardContent] = useState("");

  const sendCard = () => {
    console.log(cardContent);
    setIsEditing(false);
    setCardContent("");
  };

  return (
    <div className="w-56 rounded-md bg-gray-900 p-2 shadow-xl ">
      <h2 className=" border-b-2 border-b-gray-400 text-xl font-semibold text-gray-400">
        {title}
      </h2>
      <div className="relative flex flex-col gap-2">
        {children}
        {isEditing ? (
          <div className="">
            <input
              type="text"
              value={cardContent}
              onChange={(e) => setCardContent(e.target.value)}
              className="w-full rounded-md bg-gray-800 p-1 text-gray-200"
              placeholder="Enter a title for the task..."
            />
            <div className="ml-4 mt-2 flex space-x-4">
              <button
                className="text-gray-400"
                onClick={() => setIsEditing(false)}
              >
                <MdCancel />
              </button>
              <button className="text-gray-400" onClick={sendCard}>
                <BsFillSendCheckFill />
              </button>
            </div>
          </div>
        ) : (
          <button className="text-gray-400" onClick={() => setIsEditing(true)}>
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;
