import React, { useState } from 'react'
import { useStore } from './useStore2';

interface Expense {
  id: number;
  description: string;
  amount: number;
}


const ExpenseTracker = () => {
 const {expenses , addExpense , removeExpense} = useStore();
  const [detail , setDetail] = useState('');

  

  const [amout , setAmout] = useState<null|number>(null);
  
  const handleAddExpense = () => {
    if(detail.trim() == '' || amout ==0 || amout==null){
      return;
    }
    addExpense({
      id: Date.now(),
      description: detail,
      amount: amout,
    })
     setAmout(null);
     setDetail("");
  };

  const handleCancelExpense =()=>{
    setAmout(null);
    setDetail('');
  }

  const handleDelete =(id:number)=>{
    removeExpense(id);
  }
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center bg-gradient-to-br from-purple-500 to-blue-400 ">
      <div className="min-h-[20rem] w-[25rem] shadow-lg bg-slate-100 p-7 rounded-xl flex items-center flex-col">
        <h1 className="text-xl font-semibold underline">Expense Tracker</h1>

        <input
          type="text"
          name=""
          id=""
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="enter details"
          className="w-[100%] px-4 py-2 rounded-lg mt-2 mb-2 shadow-lg focus:outline-purple-600"
        />

        <input
          type="text"
          name=""
          id=""
          placeholder="enter amout $"
          value={Number(amout)}
          onChange={(e) => setAmout(Number(e.target.value))}
          className="w-[100%] px-4 py-2 rounded-lg mt-2 mb-2 shadow-lg focus:outline-purple-500"
        />
        <div className="flex justify-between space-y-2 flex-col w-full">
          <div className="flex justify-between">
            <button className="bg-blue-400 rounded-lg px-2 py-1"
            onClick={handleAddExpense}
            >Save</button>
            <button className="bg-gray-400 rounded-lg px-2 py-1" onClick={handleCancelExpense}>cancel</button>
          </div>
          <div className="flex justify-between w-full border border-b-black">
            <h2 className="text-md font-semibold">Expense title</h2>

            <h2 className="text-md">Expense title</h2>
          </div>
          <div className="w-full">
            {expenses.map((expense) => (
              <div className="w-full flex justify-between space-y-2">
                <h1>{expense.description}</h1>
                <h1>${expense.amount}</h1>
                <button className='bg-red-400 rounded-md px-2' onClick={()=>handleDelete(expense.id)}>Delete</button>
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full border border-t-black ">
            <h1 className="text-3xl underline">Total</h1>
            <h1 className="text-3xl ">{`$${expenses.reduce((total , expense) =>total +expense.amount, 0)}`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker