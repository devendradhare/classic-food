import React from "react";
import { useAppContext } from "../contextAPI/AppContextProvider.jsx";
// const TableStatus = ({ tableStatus, handleSaveAndClear }) => {
const TableStatus = ({ tableStatus }) => {
  const { tableNumber, userDetails } = useAppContext();
  console.log("Table Number:", tableNumber);

  return (
    <div className="flex flex-wrap gap-2 min-w-[320px] mt-5">
      {[1, 2, 3, 4].map((tn, index) => (
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex-grow flex flex-col"
          key={index}
        >
          <div className="flex gap-4 flex-grow items-center justify-center flex-wrap">
            <div className="flex flex-col gap-4 p-2 items-center justify-between h-full">
              <div className="relative flex flex-col items-center justify-center min-w-24 h-24 bg-gray-200 rounded-full border border-black text-lg font-bold text-gray-700">
                <div>Table 0{tn}</div>
                <div className="border border-black absolute max-h-0 max-w-0 rotate-45">
                  <div className="relative top-14 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-0 left-14 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                  <div className="absolute -top-14 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-0 -left-14 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                </div>
                {tableNumber == tn && (
                  <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded">
                    you are here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableStatus;
