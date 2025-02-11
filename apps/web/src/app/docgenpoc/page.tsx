import Menu from './menu';
import Document from './document';

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Menu />
      <Document />
    </main>
  );
}
