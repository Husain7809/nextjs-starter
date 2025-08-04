"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment } from "@/features/counter/counterSlice";

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center space-x-4">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <span className="text-2xl font-bold min-w-[3rem] text-center">{count}</span>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
