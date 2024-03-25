import OfficiersTable from "@/components/tables/officiersTable";
import Image from "next/image";

import axios from "axios";

import { User } from "@/components/tables/columns";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const response = await axios.get("http://localhost:5000/users");
  return response?.data;
}
export default async function Home() {
  const data = await getData();

  return (
    <main className="flex h-screen flex-col items-center mx-24 pt-4">
      <div className="flex justify-between items-center w-full py-2 px-4 border rounded-md">
        <div className="flex  flex-col items-center justify-center ">
          <p>الجيش الثالث الميداني</p>
          <p>فرع نظم المعلومات</p>
        </div>
        <Image
          className="object-cover"
          alt="logo"
          src="/ISD2022.png"
          width={100}
          height={100}
        />
      </div>
      <OfficiersTable data={data} />
    </main>
  );
}
