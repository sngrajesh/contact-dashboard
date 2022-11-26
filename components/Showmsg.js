import React from "react";
import { cancelico } from "./icons";

const Showmsg = ({
  id,
  name,
  email,
  message,
  website,
  createdAt,
  setShowmsg,
}) => {
  return (
    <div className="fixed z-50 max-w-5xl bottom-0 right-0 bg-white rounded-t-lg shadow-lg w-full h-[65vh] max-h-[65vh] overflow-x-hidden overflow-y-auto drop-shadow-xl md:w-2/4 md:right-12">
      <div className="flex flex-row items-center justify-between w-full h-fit-content bg-gray-100 p-4 sticky top-0 shadow-md">
        <button
          type="button"
          className="p-1 focus:outline-none focus:shadow-outline flex text-white bg-purple-500 border-0  hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center h-min"
          onClick={() => {
            setShowmsg({ show: false });
          }}
        >
          {React.createElement(cancelico)}
        </button>
        <span>id : {id}</span>
      </div>
      <div className="flex flex-col items-start justify-start w-full h-fit-content p-3">
        <h2 className="text-2xl font-semibold text-gray-600 w-full">{name}</h2>
        <a
          className="text-lg font-medium text-gray-600 w-full"
          href={`mailto:${email}`}
        >
          {email}
        </a>

        <small className="text-sm font-normal text-gray-500 w-full">
          {new Date(createdAt).toLocaleString()}
          <hr />
        </small>
        <p className="text-base font-normal text-gray-600 w-full mt-4 pb-20">
          {message}
          <hr />
        <small className="text-sm font-normal text-gray-500 w-full mt-2">
          {website}
        </small>
        </p>
      </div>
    </div>
  );
};

export default Showmsg;
