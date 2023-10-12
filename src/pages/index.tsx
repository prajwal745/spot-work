import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Task from './components/Task';
import firebase from 'firebase/app'
import Collection from './api/datastore/collection'

const inter = Inter({ subsets: ["latin"] });

type Todo = {
  id: string;
  value: string;
  done: boolean;
}

const store = new Collection();

export default function Home() {
  const storeData = store.getStore();
  const [todoList, setTodoList] = useState<Todo[]>(storeData);
  const [todoText, setTodoText] = useState<string>('');

  const addTodoList = () => {
    setTodoList([...todoList, { id: Date.now().toString(), value: todoText.trim(), done: false}])
    setTodoText('')
    store.setStore(Date.now().toString(), todoText.trim(), false)
  }
  const deleteTodoItem= async (id: string) => {
    try{
      await store.deleteValue(id);
      setTodoList((todoList) => todoList.filter((todoItem) => todoItem.id !== id))
    } catch (error) {
      console.error('Error deleting Item ', error)
    }
  }
  const getPendingTaskCount = (): number => {
    return todoList.filter((todoItem) => !todoItem.done).length;
  }
  const handleClearAll = async () => {
    try{
      todoList.forEach((todoItem) => deleteTodoItem(todoItem.id))
    } catch (error) {
      console.error('Error clearing todos ', error)
    }
  }
  return (
    <main>
      <div className="h-screen flex justify-center items-center flex-col gap-8">
        <h1>Todo App</h1>
        <div className="flex justify-center items-center gap-6">
          <input
            className="w-72 border-2  rounded-md px-3 py-3"
            //set value of input field
            placeholder='Add your new todo'
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter')
              //update state on changes to text
              addTodoList();
            }}
          />
          <button
            className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
            onClick={addTodoList}
          >
            +
          </button>
        </div>
        {/* Task List */}
        <div className="w-1/3 text-center flex items-center flex-col gap-5">
          <ul>
            {todoList?.map((todoItem) => (
              <Task key={todoItem.id} onDelete={deleteTodoItem} todo={todoItem}/>
            ))
            }
          </ul>
        </div>
        <div className="w-1/3 gap-6 clearAllContainer">
          <p>You have {getPendingTaskCount()} pending tasks</p>
          <button type="button" onClick={handleClearAll} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Clear All</button>
        </div>
      </div>
    </main>
  );
}
