import React from "react";
import { deleteico, vieweico } from "./icons";

const Tabledata = ({ data, deleteContact, fetchContact, setShowmsg }) => {
  const renderHeader = () => {
    let headerElement = [
      "Name",
      "E-mail",
      "Website",
      "Message",
      "Date",
      "Operations",
    ];

    return headerElement.map((key, index) => {
      return (
        <th key={index} scope="col" className="py-3 px-6 text-white">
          {key.toUpperCase()}
        </th>
      );
    });
  };
  const renderBody = () => {
    return (
      data &&
      data.map(({ _id, name, email, website, message, createdAt }) => {
        return (
          <tr key={_id} className="bg-white border-b ">
            <th
              scope="row"
              className="py-2 px-3 font-base whitespace-nowrap flex justify-start gap-2 items-center"
            >
              <button
                type="button"
                className="p-1 focus:outline-none focus:shadow-outline flex  text-white bg-purple-500 border-0  hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center h-min"
                onClick={() => {
                  setShowmsg({
                    show: true,
                    id: _id,
                    name: name,
                    email: email,
                    message: message,
                    createdAt: createdAt,
                    website: website,
                  });
                }}
              >
                {React.createElement(vieweico)}
              </button>
              {name}
            </th>
            <td className="py-2 px-3">{email}</td>
            <td className="py-2 px-3">{website}</td>
            <td className="py-2 px-3 truncate max-w-[150px] md:max-w-[300px]">
              {message}
            </td>
            <td className="py-2 px-3">
              {new Date(createdAt).toLocaleDateString()}
            </td>
            <td className="operation flex justify-center py-3 px-auto">
              <button
                className="p-1 focus:outline-none focus:shadow-outline flex  text-white bg-purple-500 border-0  hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center h-min"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete this message permanently?"
                    )
                  ) {
                    deleteContact(_id);
                    fetchContact();
                  }
                }}
              >
                <span>{React.createElement(deleteico)}</span>
              </button>
            </td>
          </tr>
        );
      })
    );
  };
  return (
    <>
      <table id="contact" className="w-full text-sm text-left text-gray-700 ">
        <thead className="text-xs text-gray-700 uppercase bg-purple-500 dark:text-gray-400">
          <tr>{renderHeader()}</tr>
        </thead>

        <tbody>{renderBody(data)}</tbody>
      </table>
    </>
  );
};

export default Tabledata;
