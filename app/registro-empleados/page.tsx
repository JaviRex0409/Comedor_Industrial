import Image from "next/image"
import { Upload } from "lucide-react"
import BrowserHeader from "@/components/browser-header"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function RegistroEmpleados() {
  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">
      <BrowserHeader />

      {/* Main content */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-4">
          {/* Header with logo */}
          <div className="flex items-center mb-8">
            <AppLogo />
            <h1 className="text-2xl font-bold text-[#1d1b20]">Alta de nuevos Empleados</h1>
          </div>

          {/* Form */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Full Name */}
            <div>
              <label htmlFor="full-name" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Nombre completo:
              </label>
              <input
                type="text"
                id="full-name"
                placeholder="Nombre Completo"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Departamento:
              </label>
              <input
                type="text"
                id="department"
                placeholder="Departamento"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Subir Fotografia:</label>
              <div className="flex items-center">
                <button className="w-12 h-12 rounded-full bg-[#eaddff] flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-[#1d1b20]" />
                </button>

                <div className="mt-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/abstract-profile.png"
                      alt="Employee Preview"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center text-[#1d1b20]">Vista Previa</div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg">
                Registrar Empleado
              </button>
            </div>

            {/* Confirmation Message */}
            <div className="text-center text-[#1d1b20] mt-4">Mensaje de Confirmacion</div>
          </div>
        </div>
      </div>
    </div>
  )
}
