import Menu from './menu';
import DocumentGenPOC from './document-gen-poc';

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Menu />
      <DocumentGenPOC />
    </main>
  );
}
