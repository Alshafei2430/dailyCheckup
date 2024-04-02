import OfficiersTable from "@/components/tables/officiersTable";
import Image from "next/image";
import { fetchOfficiers } from "@/db/queries/officiers";

export default async function Home() {
  const officiers = await fetchOfficiers();

  return (
    <main className="flex h-screen flex-col items-center mx-64">
      <div className="flex justify-between items-center w-full py-8 px-4 border rounded-md bg-yellow-300 shadow-lg text-3xl">
        <div className="flex  flex-col items-center justify-center ">
          <p>الجيش الثالث الميداني</p>
          <p>فرع نظم المعلومات</p>
        </div>
        <div>
          <h1 className="text-">التمام اليومي</h1>
        </div>
        <Image
          className="object-cover"
          alt="logo"
          src="/logo.png"
          width={200}
          height={200}
        />
      </div>
      <OfficiersTable data={officiers} />
    </main>
  );
}
