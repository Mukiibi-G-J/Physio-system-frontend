import axios from "../../../_lib/axios/axios";

import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
  // Fetch data from your API here.

  const response = await axios.get("/patients/", {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  });

  const data = response.data;
  return [...data];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className=" w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
