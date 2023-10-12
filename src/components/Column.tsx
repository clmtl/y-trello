import { useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Column: React.FC<Props> = ({ title, children }) => {
  const [isEditing, setIsEditing] = useState(false);

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
              className="w-full rounded-md bg-gray-800 p-1"
              placeholder="Enter a title for this card..."
            />
            <div className="mt-2 flex justify-between">
              <button
                className="text-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="text-gray-400">Add Ticket</button>
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
