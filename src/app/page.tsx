import Link from 'next/link';
import { prisma } from '../db';
import { todo } from 'node:test';
import TodoItem from '../components/TodoItem';

const getTodos = () => {
  console.log('getting todos');
  return prisma.todo.findMany();
}

const addTodo = async () => {
  await prisma.todo.create({ data: { title: 'test', complete: false}});
}

const Home = async () => {
  await addTodo();
  const todos = await getTodos();

  return (
    <>
      <header className='flex justify-between'>
        <h1 className='text-2xl'>Todos</h1>
        <Link
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          href='/new'
        >
          New
        </Link>
      </header>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

export default Home;
