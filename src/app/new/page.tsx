import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function handleSubmit(data: FormData) {
  "use server";
  //Make sure there's actually text in the field.
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Enter value first.");
  }
  //This one line does the whole post.
  await prisma.todo.create({ data: { title, complete: false } });
  //Once the item has been submitted, send the user back to the homepage.
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={handleSubmit} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
