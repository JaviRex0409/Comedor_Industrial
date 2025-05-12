import Image from "next/image"
import BrowserHeader from "@/components/browser-header"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function RegistroConsumo() {
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
            <h1 className="text-2xl font-bold text-[#1d1b20]">Registrar Consumo</h1>
          </div>

          {/* Form */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Employee Number */}
            <div>
              <label htmlFor="employee-number" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Número de Empleado:
              </label>
              <input
                type="text"
                id="employee-number"
                placeholder="Numero de empleado"
                className="w-full p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Employee Preview */}
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

            {/* Consumption Type */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Tipo de Consumo:</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-[#cac4d0] rounded-lg text-[#1d1b20] font-medium">Desayuno</button>
                <button className="p-4 bg-[#eaddff] rounded-lg text-[#1d1b20] font-medium">Comida</button>
              </div>
            </div>

            {/* Cost */}
            <div>
              <label htmlFor="cost" className="block text-xl font-medium text-[#1d1b20] mb-2">
                Costo:
              </label>
              <input
                type="text"
                id="cost"
                placeholder="Costo"
                className="w-full p-4 bg-[#cac4d0] rounded-lg text-[#1d1b20] placeholder-[#49454f]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg">
                Registrar Consumo
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
