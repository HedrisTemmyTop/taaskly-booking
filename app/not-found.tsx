import { headers } from "next/headers";
import Link from "next/link";

// const getSiteData = async function(domain: string){
//     const response = await fetch()
// }

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");
  //   const data = await getSiteData(domain);
  console.log("domain that's not found", domain);
  return (
    <div className="bg-red-600">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
