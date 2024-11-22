import AcceptPDPA from '@/src/components/acceptPDPA';
import OnboardingPageHeader from '@/src/components/header/onboardingPageHeader';

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center">
        <OnboardingPageHeader />
        <h1 className="text-3xl font-bold mb-5 pt-5">
          นโยบายการจัดเก็บข้อมูลส่วนบุคคล
        </h1>
        <div className="max-w-md border-2 px-2 shadow-md overflow-y-scroll max-h-[40vh]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error
          eligendi amet fuga blanditiis sunt soluta ab id. Quod nisi similique
          omnis molestias excepturi, nesciunt unde sequi natus dolorem
          inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptas, sapiente? Tenetur asperiores velit quae fugit iste,
          veritatis aperiam ullam nisi voluptatum natus excepturi ea non illo
          ratione cupiditate, assumenda adipisci.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum error eligendi amet fuga blanditiis
          sunt soluta ab id. Quod nisi similique omnis molestias excepturi,
          nesciunt unde sequi natus dolorem inventore! Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Voluptas, sapiente? Tenetur
          asperiores velit quae fugit iste, veritatis aperiam ullam nisi
          voluptatum natus excepturi ea non illo ratione cupiditate, assumenda
          adipisci.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          error eligendi amet fuga blanditiis sunt soluta ab id. Quod nisi
          similique omnis molestias excepturi, nesciunt unde sequi natus dolorem
          inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptas, sapiente? Tenetur asperiores velit quae fugit iste,
          veritatis aperiam ullam nisi voluptatum natus excepturi ea non illo
          ratione cupiditate, assumenda adipisci.
        </div>
        <AcceptPDPA />
      </main>
    </>
  );
}
