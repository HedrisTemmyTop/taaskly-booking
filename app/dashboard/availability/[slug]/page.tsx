import CreateAvailabilityForm from "@/app/_components/CreateAvailabilityForm";
import { getAvailabilities, getAvailability } from "@/app/_lib/availability";
import { notFound } from "next/navigation";

interface IParams {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async function () {
  const availabilites = await getAvailabilities();
  const slug = availabilites.map((availability) => ({
    slug: availability.slug,
  }));

  return slug;
};

export default async function Page(props: IParams) {
  const params = await props.params;
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
