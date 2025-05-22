"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function GenerarReportes() {
  const [employeeNumber, setEmployeeNumber] = useState("")
  const [reportType, setReportType] = useState<"diario" | "mensual" | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [confirmation, setConfirmation] = useState("")

  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  const handleGenerateReport = async () => {
    if (!employeeNumber || !reportType) {
      setConfirmation("Por favor, completa los campos.")
      return
    }

    try {
      let url = `${API_BASE}/consumo`
      if (reportType === "mensual") {
        const now = new Date()
        const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
        url += `/${yearMonth}`
      }

      const res = await fetch(url)
      const data = await res.json()

      // Filtros por empleado
      const filtered = data.filter((item: any) => item.id_empleado.toString() === employeeNumber)

      setPreviewData(filtered)
      setConfirmation("Reporte generado correctamente.")
    } catch (error) {
      console.error("Error generando reporte:", error)
      setConfirmation("Error al generar el reporte.")
    }
  }

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center mb-8">
            <AppLogo />
            <h1 className="text-2xl font-bold text-[#1d1b20]">Generar Reportes</h1>
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

            {/* Tipo de Reporte */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Tipo de Reporte:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setReportType("diario")}
                  className={`p-4 rounded-lg font-medium ${
                    reportType === "diario" ? "bg-[#d0bcff]" : "bg-[#cac4d0]"
                  }`}
                >
                  Diario
                </button>
                <button
                  onClick={() => setReportType("mensual")}
                  className={`p-4 rounded-lg font-medium ${
                    reportType === "mensual" ? "bg-[#d0bcff]" : "bg-[#eaddff]"
                  }`}
                >
                  Mensual
                </button>
              </div>
            </div>

            {/* Vista Previa */}
            <div>
              <label className="block text-xl font-medium text-[#1d1b20] mb-2">Vista Previa</label>
              <div className="w-full h-80 bg-[#cac4d0] rounded-lg overflow-auto p-2">
                {previewData.length > 0 ? (
                  <ul className="text-[#1d1b20] space-y-2">
                    {previewData.map((item, index) => (
                      <li key={index}>
                        {item.fecha} - {item.tipo_comida} - ${item.precio}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#1d1b20] italic">Sin datos</p>
                )}
              </div>
            </div>

            {/* Generar botón */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleGenerateReport}
                className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
              >
                Generar Reporte
              </button>
            </div>

            {/* Confirmación */}
            <div className="text-center text-[#1d1b20] mt-4">{confirmation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
