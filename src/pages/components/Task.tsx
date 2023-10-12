type Todo = {
    id: string;
    value: string;
    done: boolean;
  }
interface TaskProps{
    todo: Todo;
    onDelete: (id: string) => void
}
const Task: React.FC<TaskProps> = ({todo, onDelete}) => {
    return(
        <>
            <li key={todo?.id}>
                <p>{todo?.value}</p>
                <button
                  className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
                  onClick={() => onDelete(todo?.id)}
                >
                </button>
              </li>
        </>
    )
}

export default Task;