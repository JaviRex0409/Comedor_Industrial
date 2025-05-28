"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function RegistroConsumo() {
  const [employeeNumber, setEmployeeNumber] = useState("")
  const [tipoComida, setTipoComida] = useState<"Desayuno" | "Comida" | null>(null)
  const [precio, setPrecio] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const now = new Date()
  const time = parseInt(now.toLocaleTimeString('en-US',{hour12: false}))

  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/comida`)
        const data = await res.json()

        if (time <= 12) {
          setPrecio(data[0]["precio"])
          setTipoComida(data[0]["tipo_comida"])
        }
        else {
          setPrecio(data[1]["precio"])
          setTipoComida(data[1]["tipo_comida"])
        }
        console.log("tipoComida", tipoComida)


      } catch (error) {
        console.error("Error al obtener precios", error)
      }
    }
  
  useEffect(() => {
    fetchData()
  }, [] )
  const handleSubmit = async () => {
    if (!employeeNumber) {
      setConfirmation("Por favor, completa todos los campos.")
      return
    }

    try {
      const res = await fetch(`${API_BASE}/consumo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_empleado: parseInt(employeeNumber),
          tipo_comida: tipoComida,
          precio: parseFloat(precio),
          fecha: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
        }),
      })

      if (!res.ok) throw new Error("Fallo el registro")
      setConfirmation("Consumo registrado exitosamente.")
      setEmployeeNumber("")
      setPrecio(precio)
      setTipoComida(tipoComida)
    } catch (error) {
      console.error(error)
      setConfirmation("Error al registrar el consumo.")
    }
  }

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center mb-8">
            <AppLogo />
            <h1 className="text-2xl font-bold text-[#1d1b20]">Registrar Consumo</h1>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Número de Empleado */}
            <div>
              <label htmlFor="employee-number" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Número de Empleado:
              </label>
              <input
                type="text"
                id="employee-number"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                placeholder="Número de empleado"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Vista previa ficticia */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src="/abstract-profile.png"
                  alt="Employee Preview"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <span className="text-xl text-[#1d1b20]">Vista Previa del Empleado</span>
            </div>

            {/* Tipo de Consumo */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Tipo de Consumo:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-4 rounded-lg font-medium ${
                    tipoComida === "Desayuno" ? "bg-[#d0bcff]" : "bg-[#eaddff]"
                  }`}
                >
                  Desayuno
                </button>
                <button
                  className={`p-4 rounded-lg font-medium ${
                    tipoComida === "Comida" ? "bg-[#d0bcff]" : "bg-[#eaddff]"
                  }`}
                >
                  Comida
                </button>
              </div>
            </div>

            {/* Costo */}
            <div>
              <label htmlFor="cost" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Costo: {precio}
              </label>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
              >
                Registrar Consumo
              </button>
            </div>

            {/* Mensaje de confirmación */}
            <div className="text-center text-[#1d1b20] mt-4">{confirmation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
