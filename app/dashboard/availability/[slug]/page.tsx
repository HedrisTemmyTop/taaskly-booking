import CreateAvailabilityForm from "@/app/_components/CreateAvailabilityForm";
import { getAvailability } from "@/app/_lib/availability";
import { notFound } from "next/navigation";

interface IParams {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: IParams) {
  const availability = await getAvailability(params.slug);
  if (!availability) {
    notFound();
  }
  const serializedAvailability = JSON.parse(JSON.stringify(availability));
  return (
    <div className="-mx-4">
      <CreateAvailabilityForm data={serializedAvailability} />
    </div>
  );
}
