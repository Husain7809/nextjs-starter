"use client";

import { increment, decrement } from "@/features/counter/counterSlice";
import { RootState } from "@/redux/rootReducer";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Counter() {
  const dispatch = useAppDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button
        onClick={() => dispatch(increment())}
        className="bg-green-600 p-4 mx-5 text-white"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="bg-red-600 p-4 mx-5 text-white"
      >
        Decrement
      </button>
    </div>
  );
}
