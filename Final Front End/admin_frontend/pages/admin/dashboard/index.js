import Link from "next/link"
import LoggedLayout from "@/pages/component/loggedlayout";
import axios from "axios";
import { useRouter } from 'next/router'
import AdminDrawer from "@/pages/component/admindrawer";


export default function GetUsers({ data }) {
  const router = useRouter();
  return (
    <>

      <LoggedLayout title="Dashboard" />
      <AdminDrawer />
      <div class="p-24 sm:ml-64 text-center">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        All Admin
              </h1>  
              <br></br>    
      <div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
         Email
        </th>
        <th scope="col" class="px-6 py-3">
          Address
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => {
        return (
          <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <Link href={"/admin/dashboard/users/" + item.id}> {item.name}</Link>
            </th>
            
            <td class="px-6 py-4">
              {item.email}
            </td>
            <td class="px-6 py-4">
              {item.address}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


        </div>

    </>
  );
  }
  
 export async function getServerSideProps() {
 
      const response = await axios.get('http://localhost:3000/admin/all');
      const data = await response.data;
    
  return { props: { data } }

  
  }