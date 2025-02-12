"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  X, 
  DollarSign, 
  Percent,
  Calculator
} from "lucide-react";

interface User {
  id: number;
  name: string;
}

interface Todo extends User {
  realPrice: string; // Adding realPrice to the Todo type
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<string>("");
  const [newUserName, setNewUserName] = useState<string>("");

  useEffect(() => {
    const dummyUsers: User[] = [
      { id: 1, name: "Tufiq " },
      { id: 2, name: "Fahri" },
      { id: 3, name: "Adealism" },
      { id: 4, name: "Arman" },
      { id: 5, name: "Fildza" },
      { id: 6, name: "Ince " },
      { id: 9, name: "Honey 🍯" },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleAddNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      const newUser: User = {
        id: users.length + 1,
        name: newUserName.trim()
      };
      setUsers([...users, newUser]);
      setNewUserName("");
    }
  };

  const handleAddToDo = (user: User) => {
    setTodoList([...todoList, { ...user, realPrice: "" }]);
  };

  const handleRemoveToDo = (index: number) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleRealPriceChange = (index: number, value: string) => {
    const newTodoList = [...todoList];
    newTodoList[index].realPrice = value;
    setTodoList(newTodoList);
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    return parseFloat(value).toLocaleString("en-US");
  };

  const parseNumber = (value: string) => {
    return value.replace(/,/g, "");
  };

  const calculateDiscountPrice = (
    realPrice: string,
    totalAfterDiscount: string,
    sumRealPrices: number
  ) => {
    const realPriceNumber = parseFloat(realPrice);
    const totalAfterDiscountNumber = parseFloat(totalAfterDiscount);
    
    if (sumRealPrices === 0 || isNaN(realPriceNumber) || isNaN(totalAfterDiscountNumber)) return 0;
    return Math.round((realPriceNumber / sumRealPrices) * totalAfterDiscountNumber);
  };

  const sumRealPrices = todoList.reduce(
    (sum, item) => sum + (parseFloat(parseNumber(item.realPrice)) || 0),
    0
  );

  return (
    <main className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200">
          <div className="p-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-600" />
            <h1 className="text-sm font-medium text-slate-900">Users</h1>
          </div>
          <form onSubmit={handleAddNewUser} className="px-3 pb-3 flex gap-2">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Add new user"
              className="p-1.5 border border-slate-200 flex-1 rounded text-sm focus:outline-none focus:border-slate-400"
            />
            <button
              type="submit"
              className="p-1.5 bg-slate-800 text-white rounded hover:bg-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleAddToDo(user)}
              className="block w-full text-left px-3 py-2 hover:bg-slate-50 text-sm text-slate-600 transition-colors"
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="p-3 flex items-center gap-2 border-b border-slate-200">
            <Calculator className="w-5 h-5 text-slate-600" />
            <h2 className="text-sm font-medium text-slate-900">Discount Calculator</h2>
          </div>
          <div className="p-3 space-y-2">
            {todoList.map((user, index) => (
              <div key={index} className="p-3 bg-white border border-slate-200 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-slate-900">{user.name}</h3>
                  <button
                    onClick={() => handleRemoveToDo(index)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Real Price"
                      value={formatNumber(user.realPrice)}
                      onChange={(e) =>
                        handleRealPriceChange(index, parseNumber(e.target.value))
                      }
                      className="pl-8 p-1.5 border border-slate-200 rounded w-full text-sm focus:outline-none focus:border-slate-400"
                    />
                  </div>
                  <div className="relative">
                    <Percent className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Discount Price"
                      value={formatNumber(
                        calculateDiscountPrice(
                          user.realPrice,
                          totalAfterDiscount,
                          sumRealPrices
                        ).toString()
                      )}
                      disabled
                      className="pl-8 p-1.5 border border-slate-200 rounded w-full text-sm bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 mb-5">
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Total After Discount"
                value={formatNumber(totalAfterDiscount)}
                onChange={(e) => setTotalAfterDiscount(parseNumber(e.target.value))}
                className="pl-8 p-1.5 border border-slate-200 rounded w-full text-sm focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="p-3 bg-slate-800 rounded text-white">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <h2 className="text-sm font-medium">
                  Total: {formatNumber(sumRealPrices.toString())}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
