
import TeamList from "@/components/portal/team/TeamList";
import Layout from "../components/portal/layouts/Layout";
import Table from "@/components/portal/team/Table";


export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold pl-100  ">Welcome to MK Homes Dashboard </h1>
      <div className="mt-10 pl-100 w-[1500px]" >
    <Table/>
      </div>

    </Layout>
  );
}
