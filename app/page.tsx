"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

interface Consumo {
  id_empleado: number
  tipo_comida: string
  precio: number
  fecha: string
}

interface Empleado {
  id_empleado: number
  nombre: string
  departamento: string
  fotografia: string
}

export default function Dashboard() {
  const [registros, setRegistros] = useState<Consumo[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [empleadosMap, setEmpleadosMap] = useState<Record<number, Empleado>>({})
  const [totalConsumos, setTotalConsumos] = useState(0)
  const [totalEmpleados, setTotalEmpleados] = useState(0)
  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resConsumo = await fetch(`${API_BASE}/consumo`)
        const dataConsumo = await resConsumo.json()
        const ordenados = dataConsumo.sort((a: Consumo, b: Consumo) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        setRegistros(ordenados.slice(0, 5))
        setTotalConsumos(dataConsumo.length)

        const resEmpleado = await fetch(`${API_BASE}/empleado`)
        const dataEmpleado = await resEmpleado.json()
        setEmpleados(dataEmpleado.slice(0, 5))
        setTotalEmpleados(dataEmpleado.length)

        const map: Record<number, Empleado> = {}
        dataEmpleado.forEach((emp: Empleado) => {
          map[emp.id_empleado] = emp
        })
        setEmpleadosMap(map)
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#fef7ff] flex">
      <Sidebar />
      <div className="flex-1 p-6 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <AppLogo />
            <h1 className="text-3xl font-bold text-[#1d1b20]">Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#eaddff] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1d1b20] mb-4">Resumen General</h2>
            <p className="text-[#1d1b20] text-lg">Total de empleados registrados: <span className="font-semibold">{totalEmpleados}</span></p>
            <p className="text-[#1d1b20] text-lg">Total de consumos registrados: <span className="font-semibold">{totalConsumos}</span></p>
          </div>

          <div className="bg-[#eaddff] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1d1b20] mb-4">Últimos Empleados</h2>
            <ul className="space-y-3">
              {empleados.map((emp) => (
                <li key={emp.id_empleado} className="flex items-center gap-4">
                  <Image
                    src={emp.fotografia || "/abstract-profile.png"}
                    alt="Empleado"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="text-[#1d1b20]">
                    <p className="font-medium">{emp.nombre}</p>
                    <p className="text-sm">{emp.departamento}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full bg-[#eaddff] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1d1b20] mb-4">Últimos Consumos</h2>
            <div className="flex bg-[#d0bcff] rounded-md px-4 py-2 font-semibold text-[#1d1b20]">
              <div className="w-12"></div>
              <div className="flex-1">Empleado</div>
              <div className="w-32">Tipo de Comida</div>
              <div className="w-24">Costo</div>
              <div className="w-40">Fecha</div>
            </div>
            <div className="space-y-2">
              {registros.map((reg, index) => {
                const empleado = empleadosMap[reg.id_empleado]
                return (
                  <div key={index} className="flex items-center gap-4 bg-white rounded-md px-4 py-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={empleado?.fotografia || "/abstract-profile.png"}
                        alt="Empleado"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1d1b20] font-medium">{empleado?.nombre || `Empleado ${reg.id_empleado}`}</p>
                    </div>
                    <span className="w-32 text-[#1d1b20]">{reg.tipo_comida}</span>
                    <span className="w-24 text-[#1d1b20]">${reg.precio.toFixed(2)}</span>
                    <span className="w-40 text-[#1d1b20]">{reg.fecha}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
