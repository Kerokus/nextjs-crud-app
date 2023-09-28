import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";

//Pulls the entire To Do list from the database
function getTodos() {
  return prisma.todo.findMany();
}

//Toggle the "complete" key on the database
async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new">
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}

//These prisma calls work without a fetch because we're doing the
//call server-side. It then automatically passes the information
//to the client. This wouldn't work if we had anything requring
//"use client" to be in this file.
