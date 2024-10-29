import SettingsForm from "@/app/_components/SettingsForm";
import { auth } from "@/app/_lib/auth";
import { getUserById } from "@/app/_lib/data-service";
import { SessionInterface } from "@/app/_types/user";

export default async function Page() {
  const session = (await auth()) as SessionInterface;
  const user = await getUserById(session.user.userId);
  return (
    <div>
      <SettingsForm user={user} />
    </div>
  );
}
