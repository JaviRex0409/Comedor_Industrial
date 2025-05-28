"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

interface Consumo {
  id_empleado: number
  tipo_comida: string
  precio: number
  fecha: string
}


export default function Home() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Consumo[]>([])

  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/consumo`)
        const data = await res.json()

        // Ordenar por fecha descendente si está disponible
        const ordenados = data.sort((a: Consumo, b: Consumo) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

        // Limitar a los 5 más recientes
        console.log("Registros:", ordenados)
        setRegistros(ordenados.slice(0, 5))
      } catch (error) {
        console.error("Error al obtener los registros:", error)
      }
    }

    fetchData()

    const intervalId = setInterval(() => {
               router.refresh();
           }, 10000);
           return () => clearInterval(intervalId);
    
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4">
          <div className="flex items-center mb-8">
            <AppLogo />
            <h1 className="text-2xl font-bold text-[#1d1b20]">Página Principal</h1>
          </div>

          <div className="flex justify-center mb-8">
            <Link
              href="/registro-consumo"
              className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
            >
              Registrar Consumo
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1d1b20] mb-4">Registros Recientes:</h2>

            <div className="space-y-3">
              <div className="flex bg-[#eaddff] rounded-lg p-3">
                <div className="w-12">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image src="/abstract-profile.png" alt="Profile" width={32} height={32} className="object-cover" />
                  </div>
                </div>
                <div className="w-16 font-medium text-[#1d1b20]">ID</div>
                <div className="flex-1 font-medium text-[#1d1b20]">Fecha</div>
                <div className="w-32 font-medium text-[#1d1b20]">Tipo de Comida</div>
                <div className="w-24 font-medium text-[#1d1b20]">Costo</div>
              </div>

              {registros.map((item, index) => (
                <div key={index} className="flex bg-[#eaddff] rounded-lg p-3">
                  <div className="w-12">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/abstract-profile.png"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-16 text-[#1d1b20]">{item.id_empleado}</div>
                  <div className="flex-1 text-[#1d1b20]">{item.fecha}</div>
                  <div className="w-32 text-[#1d1b20]">{item.tipo_comida}</div>
                  <div className="w-24 text-[#1d1b20]">${item.precio.toFixed(2)}</div>
                </div>
              ))}

              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-[#79747e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#79747e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#79747e]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
