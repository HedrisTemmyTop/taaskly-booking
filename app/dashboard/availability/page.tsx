import Availability from "@/app/_components/Availability";
import AvailabilityBtns from "@/app/_components/AvailabilityBtns";
import { getAvailabilities } from "@/app/_lib/availability";

export default async function Page() {
  const availabilities = await getAvailabilities();

  if (availabilities.length === 0)
    return <div>You don`t have availability yet, pls create one</div>;

  return (
    <div className="grid gap-4 grid-cols-1">
      {availabilities.map((availability) => (
        <div
          className="border border-primary-400 rounded-lg p-4 w-[100%] flex justify-between"
          key={String(availability._id)}
        >
          <div className="w-[90%]">
            <h2 className="font-medium text-xl mb-4 capitalize">
              {availability.name}
            </h2>

            <Availability day="sunday" availability={availability} />
            <Availability day="monday" availability={availability} />
            <Availability day="tuesday" availability={availability} />
            <Availability day="wednesday" availability={availability} />
            <Availability day="thursday" availability={availability} />
            <Availability day="friday" availability={availability} />
            <Availability day="saturday" availability={availability} />
          </div>
          <AvailabilityBtns slug={availability.slug} name={availability.name} />
        </div>
      ))}
    </div>
  );
}
