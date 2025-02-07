import BarbershopItem from "../_components/barber-item";
import { Header } from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string;
    service?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const resolvedSearchParams = await searchParams;

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        resolvedSearchParams?.title
          ? {
              name: {
                contains: resolvedSearchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        resolvedSearchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: resolvedSearchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  console.log(barbershops);

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;
          {resolvedSearchParams?.title || resolvedSearchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
