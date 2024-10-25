import WithdrawBtn from "@/app/_components/WithdrawBtn";
import { auth } from "@/app/_lib/auth";
import { getUserById } from "@/app/_lib/data-service";
import { SessionInterface } from "@/app/_types/user";

export default async function Page() {
  const session: SessionInterface = (await auth()) as SessionInterface;
  const user = await getUserById(session?.user?.userId as string);
  const data = {
    userId: session.user.userId,
    email: session.user.email,
  };
  return (
    <div className="grid grid-cols-1">
      <div className="border-2 border-primary-400 rounded-lg p-4 w-[100%] ">
        <div className="flex flex-col">
          <span className="font-bold">Available Balance</span>
          <span className="text-5xl mt-[-12px] font-extrabold">
            ₦{user.userBalance.toLocaleString("en-US")}.00
          </span>
        </div>
        <WithdrawBtn data={data} userBalance={user.userBalance} />
      </div>
    </div>
  );
}
