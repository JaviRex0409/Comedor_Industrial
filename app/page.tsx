import Image from "next/image"
import Link from "next/link"
import BrowserHeader from "@/components/browser-header"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function Home() {
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
            <h1 className="text-2xl font-bold text-[#1d1b20]">Página Principal</h1>
          </div>

          {/* Register consumption button */}
          <div className="flex justify-center mb-8">
            <Link
              href="/registro-consumo"
              className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
            >
              Registrar Consumo
            </Link>
          </div>

          {/* Recent records section */}
          <div>
            <h2 className="text-xl font-bold text-[#1d1b20] mb-4">Registros Recientes:</h2>

            {/* Table */}
            <div className="space-y-3">
              {/* Table header */}
              <div className="flex bg-[#eaddff] rounded-lg p-3">
                <div className="w-12">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image src="/abstract-profile.png" alt="Profile" width={32} height={32} className="object-cover" />
                  </div>
                </div>
                <div className="w-16 font-medium text-[#1d1b20]">ID</div>
                <div className="flex-1 font-medium text-[#1d1b20]">Nombre del Empleado</div>
                <div className="w-32 font-medium text-[#1d1b20]">TipoComida</div>
                <div className="w-24 font-medium text-[#1d1b20]">$Costo</div>
              </div>

              {/* Table rows */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex bg-[#eaddff] rounded-lg p-3">
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
                  <div className="w-16 text-[#1d1b20]">ID</div>
                  <div className="flex-1 text-[#1d1b20]">Nombre del Empleado</div>
                  <div className="w-32 text-[#1d1b20]">TipoComida</div>
                  <div className="w-24 text-[#1d1b20]">$Costo</div>
                </div>
              ))}

              {/* Pagination dots */}
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
