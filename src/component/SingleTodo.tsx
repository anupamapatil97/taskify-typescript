import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone, MdRemoveDone, MdEditOff } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
  index:number;
  handleDone:(todo: any) => void
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index , handleDone}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef= useRef<HTMLInputElement>(null)


  useEffect(()=>{
      inputRef.current?.focus()
  },[edit])

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  return (
    <Draggable draggableId={todo?.id?.toString()} index={index}>
      {
        (provided, snapshot)=>(
          <form className={`todos-single ${snapshot.isDragging?'drag':''}`} onSubmit={(e) => handleEdit(e, todo.id) } {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {(edit && !todo.isDone) ? (
            <input
             ref={inputRef}
              className="single-todo-text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="single-todo-text">{todo.todo}</s>
          ) : (
            <span className="single-todo-text">{todo.todo}</span>
          )}
    
          <div>
            <span className="icons">
              {
                todo.isDone ? <MdEditOff title="You can't edit this task"/> : <AiFillEdit
                title="You can edit this task"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              />
              }
             
            </span>
            <span className="icons">
              <AiFillDelete title="You can delete this task" onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icons">
              {
                todo.isDone ?(<MdRemoveDone title="You can mark as incomplete" onClick={() => handleDone(todo)} />):(<MdDone  title="You can mark as complete" onClick={() => handleDone(todo)} />)
              }
              
            </span>
          </div>
        </form>
        )
      }
 
    </Draggable>
  );
};

export default SingleTodo;
