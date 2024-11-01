"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");

  useEffect(() => {
    const dummyUsers = [
      { id: 1, name: "Tufiq" },
      { id: 2, name: "Fahri" },
      { id: 3, name: "Adealism" },
      { id: 4, name: "Arman" },
      { id: 5, name: "Furqan" },
      { id: 6, name: "Ince" },
      { id: 7, name: "Yumi" },
      { id: 8, name: "Ewiq" },
      { id: 9, name: "Febi" },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleAddToDo = (user) => {
    setTodoList([...todoList, { ...user, realPrice: "" }]);
  };

  const handleRemoveToDo = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleRealPriceChange = (index, value) => {
    const newTodoList = [...todoList];
    newTodoList[index].realPrice = value;
    setTodoList(newTodoList);
  };

  const formatNumber = (value) => {
    if (!value) return "";
    return parseFloat(value).toLocaleString("en-US");
  };

  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const calculateDiscountPrice = (
    realPrice,
    totalAfterDiscount,
    sumRealPrices
  ) => {
    if (sumRealPrices === 0 || !realPrice || !totalAfterDiscount) return 0;
    return Math.round((realPrice / sumRealPrices) * totalAfterDiscount);
  };

  const sumRealPrices = todoList.reduce(
    (sum, item) => sum + (parseFloat(parseNumber(item.realPrice)) || 0),
    0
  );

  return (
    <main className="p-4 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4 bg-white border rounded-xl p-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleAddToDo(user)}
            className="block w-full text-left p-2 border-b hover:bg-gray-100"
          >
            {user.name}
          </button>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">List</h2>
      {todoList.map((user, index) => (
        <div key={index} className="mb-4 p-4  rounded-xl bg-white border-0 ">
          <div className="mb-2 flex justify-between">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <button
              onClick={() => handleRemoveToDo(index)}
              className="p-2 bg-white-500 text-red-500  rounded-xl"
            >
              x
            </button>
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Real Price"
              value={formatNumber(user.realPrice)}
              onChange={(e) =>
                handleRealPriceChange(index, parseNumber(e.target.value))
              }
              className="mr-2 p-2 border rounded-xl w-full"
            />
            <input
              type="text"
              placeholder="Discount Price"
              value={formatNumber(
                calculateDiscountPrice(
                  parseNumber(user.realPrice),
                  parseNumber(totalAfterDiscount),
                  sumRealPrices
                )
              )}
              disabled
              className="mt-2 p-2 border rounded-xl w-full bg-gray-200"
            />
          </div>
        </div>
      ))}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Total After Discount"
          value={formatNumber(totalAfterDiscount)}
          onChange={(e) => setTotalAfterDiscount(parseNumber(e.target.value))}
          className="p-2 border rounded-xl w-full"
        />
      </div>
      <div className="mt-4 p-4 border-t">
        <h2 className="text-xl font-bold">
          Total Before Discount: {formatNumber(sumRealPrices)}
        </h2>
      </div>
    </main>
  );
}
