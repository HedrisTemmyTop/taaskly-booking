import Link from "next/link";

// const getSiteData = async function(domain: string){
//     const response = await fetch()
// }

export default async function NotFound() {
  return (
    <div className="bg-red-600">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
