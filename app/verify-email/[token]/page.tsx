import Verification from "@/app/_components/Verification";
import { verifyUserEmail } from "@/app/_lib/actions";

export default async function Page({ params }: { params: { token: string } }) {
  const response = await fetch(
    `http://localhost:3000/api/auth/verify-email/${params.token}`
  );

  const data = await response.json();
  // const session = await getServerSession(authOptions);

  // const data = JSON.parse(JSON.stringify(d));

  // const handleSubmit = verifyUserEmail.bind(null, )
  if (data.success) {
    return (
      <div className=" h-[100vh] w-[100vw] flex flex-col gap-4 justify-center items-center ">
        <Verification data={data} />
      </div>
    );
  } else
    return (
      <form
        className=" h-[100vh] w-[100vw] flex flex-col gap-4 justify-center items-center "
        action={verifyUserEmail}
      >
        {data.data && (
          <input type="hidden" name="id" value={data.data.userId} />
        )}
        <Verification data={data} />
      </form>
    );
}
