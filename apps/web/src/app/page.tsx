import { trpc } from "./trpc";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-wrap ml-9 my-5">
      <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
        <p className="text-lg text-slate-500 py-1">ESC Project Tracker</p>
      </div>
    </div>
  );
}
