import { trpc } from "./trpc";

export default function Home(): JSX.Element {
  const data = trpc.deleteUserProject.query({
    userId: "5c1529a9-046a-4f85-a11a-d269dedf4e20",
    projectId: "7d80bb7b-79f4-4c54-b9c9-fc39e2070c55",
  });
  return (
    <div className="flex flex-wrap ml-9 my-5">
      <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
        <p className="text-lg text-slate-500 py-1">ESC Project Tracker</p>
      </div>
    </div>
  );
}
