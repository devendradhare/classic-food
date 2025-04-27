import React from "react";
const TableStatus = ({ tableStatus, handleSaveAndClear }) => {
    return (
      <div className="flex flex-wrap gap-2 min-w-[320px]">
        {[1, 2, 3, 4].map((tableNumber, index) => (
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex-grow flex flex-col"
            key={index}
          >
            <div className="flex gap-4 flex-grow items-center flex-wrap">
              <div className="flex flex-col gap-4 p-2 items-center justify-between h-full">
                <div className="relative flex flex-col items-center justify-center min-w-24 h-24 bg-gray-200 rounded-full border border-black text-lg font-bold text-gray-700">
                  <div>Table 0{tableNumber}</div>
                  <div className="border border-black absolute max-h-0 max-w-0 rotate-45">
                    <div className="relative top-14 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                    <div className="absolute top-0 left-14 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                    <div className="absolute -top-14 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                    <div className="absolute top-0 -left-14 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <button
                  onClick={() => handleSaveAndClear(tableNumber)}
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-800 focus:ring-0 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center dark:active:bg-violet-700"
                >
                  Save & Clear
                </button>
              </div>
              <div className="grow h-full">
                {tableStatus?.[`table0${tableNumber}`] ? (
                  <div className="flex flex-col justify-center h-full p-4 bg-green-100 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">
                      Customer name:{" "}
                      {tableStatus?.[`table0${index}`]?.userDetails?.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {tableStatus?.[`table0${tableNumber}`]?.cartItems?.map(
                        (item) => (
                          <p key={item.name}>
                            {item.name} (x{item.quantity})
                          </p>
                        )
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 bg-red-100 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Table 0{tableNumber}</h2>
                    <p className="text-sm text-gray-600">Empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TableStatus;