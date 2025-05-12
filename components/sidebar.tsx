import Link from "next/link"
import { CirclePlus } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-24 bg-[#fef7ff] border-r border-[#cac4d0] flex flex-col items-center py-4 space-y-6">
      <Link href="/" className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center">
          <CirclePlus className="w-6 h-6 text-[#4a4459]" />
        </div>
        <span className="text-xs text-[#49454f] mt-1 text-center">Dashboard</span>
      </Link>

      <Link href="/registro-consumo" className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center">
          <CirclePlus className="w-6 h-6 text-[#4a4459]" />
        </div>
        <span className="text-xs text-[#49454f] mt-1 text-center">Registro de Consumo</span>
      </Link>

      <Link href="/registro-empleados" className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center">
          <CirclePlus className="w-6 h-6 text-[#4a4459]" />
        </div>
        <span className="text-xs text-[#49454f] mt-1 text-center">Registro de Empleados</span>
      </Link>

      <Link href="/generar-reportes" className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center">
          <CirclePlus className="w-6 h-6 text-[#4a4459]" />
        </div>
        <span className="text-xs text-[#49454f] mt-1 text-center">Generar Reportes</span>
      </Link>
    </div>
  )
}
