import { Investments } from "./components/Investments";
import { AggregatedTable } from './components/AggregatedTable';

export default function Home() {
  return (
     <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Investments />
      <AggregatedTable />
    </main>
  );
}
