"use client"
import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import BrowserHeader from "@/components/browser-header"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function RegistroEmpleados() {
  const [nombre, setNombre] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [foto, setFoto] = useState<string | null>(null)
  const [confirmacion, setConfirmacion] = useState("")

  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFoto(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!nombre || !departamento || !foto) {
      setConfirmacion("Por favor, completa todos los campos.")
      return
    }

    try {
      const res = await fetch(`${API_BASE}/empleado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          departamento,
          fotografia: foto,
        }),
      })

      if (!res.ok) throw new Error("Error al registrar")

      setConfirmacion("Empleado registrado exitosamente.")
      setNombre("")
      setDepartamento("")
      setFoto(null)
    } catch (error) {
      console.error(error)
      setConfirmacion("Error al registrar al empleado.")
    }
  }

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">
      <BrowserHeader />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center mb-8">
            <AppLogo />
            <h1 className="text-2xl font-bold text-[#1d1b20]">Alta de nuevos Empleados</h1>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Nombre */}
            <div>
              <label htmlFor="full-name" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Nombre completo:
              </label>
              <input
                type="text"
                id="full-name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre Completo"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Departamento */}
            <div>
              <label htmlFor="department" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Departamento:
              </label>
              <input
                type="text"
                id="department"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                placeholder="Departamento"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Fotografía */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Subir Fotografía:</label>
              <div className="flex items-center">
                <label htmlFor="photo-upload" className="w-12 h-12 rounded-full bg-[#eaddff] flex items-center justify-center mr-4 cursor-pointer">
                  <Upload className="w-6 h-6 text-[#1d1b20]" />
                  <input type="file" id="photo-upload" accept="image/*" onChange={handleImageUpload} hidden />
                </label>

                <div className="mt-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                    {foto ? (
                      <Image
                        src={foto}
                        alt="Vista previa"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/abstract-profile.png"
                        alt="Vista previa"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="text-center text-[#1d1b20]">Vista Previa</div>
                </div>
              </div>
            </div>

            {/* Botón */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
              >
                Registrar Empleado
              </button>
            </div>

            {/* Confirmación */}
            <div className="text-center text-[#1d1b20] mt-4">{confirmacion}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
