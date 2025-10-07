import { Form, useLoaderData, type ActionFunctionArgs } from "react-router";
import type { loader } from "~/routes/home";

export function Welcome() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <main className="flex items-center justify-center pt-16 pb-4 min-h-screen bg-gray-900">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-white text-3xl font-bold">Welcome to Mini-chat</h1>
        </header>

        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-700 p-6 space-y-4">
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <Form method="post" className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full p-2 border border-gray-600 rounded-md text-white placeholder-white bg-transparent"
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-2 border border-gray-600 rounded-md text-white placeholder-white bg-transparent"
              />
              <button
                type="submit"
                className="w-full p-2 rounded-md text-white bg-[#1DB954] hover:bg-[#1ed760] transition-colors"
              >
                Login
              </button>
            </Form>
          </nav>
        </div>
      </div>
    </main>
  );
}
function userLoaderData() {
  throw new Error("Function not implemented.");
}

