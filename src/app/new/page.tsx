import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '../../db';

const createTodo = async (data: FormData) => {
  'use server';
  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid title');
  }
  await prisma.todo.create({ data: { title, complete: false } });
  redirect('/');
};

const Page = () => {
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl'>New</h2>
      </header>
      <form action={createTodo} className='flex gap-2 flex-col'>
        <input
          type='text'
          name='title'
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <div>
          <Link
            href='..'
            className='border border-slate-300 text-slate-3o0 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
