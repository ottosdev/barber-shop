import { SearchIcon } from "lucide-react";
import { Header } from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barber-item";
import Link from "next/link";
import { quickSearchOptions } from "./_constants/search";
export default async function Home() {
  const barberShops = await db.barbershop.findMany();
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: { name: "desc" },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Otto!</h2>
        <p>Segunda feira, 20 de janiero.</p>

        <div className="gap-2 flex items-center mt-6">
          <Input placeholder="Buscar" />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative w-full h-[150px] mt-6 ">
          <Image
            src="/banner-01.png"
            alt="banner"
            priority
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Agendamentos */}
        <h2 className="uppercase font-bold text-gray-400 text-xs mt-6 mb-3">
          Agendamentos
        </h2>
        <Card className="">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia Otto</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Janeiro</p>
              <p className="text-2xl">20</p>
              <p className="text-sm">20:45</p>
            </div>
          </CardContent>
        </Card>

        {/* Recomendados */}
        <h2 className="uppercase font-bold text-gray-400 text-xs mt-6 mb-3">
          Recomandados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <Card className="px-5 py-6">
        <CardContent className="text-sm text-gray-400 ">
          Copyright 2025 <span className="font-bold">OTTO's Barber</span>
        </CardContent>
      </Card>
    </div>
  );
}
