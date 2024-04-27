'use client'
import { createContext, useState } from 'react';

const TaskContext = createContext();

export function CurrentTask({children}) {
  const [currentTask, setCurrentTask] = useState();
  return (
    <TaskContext.Provider value={{ currentTask, setCurrentTask }}>
   {children}
    </TaskContext.Provider>
  );
}
export default TaskContext
