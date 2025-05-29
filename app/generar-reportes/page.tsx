"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import AppLogo from "@/components/app-logo"

export default function GenerarReportes() {
  const [reportType, setReportType] = useState<"diario" | "mensual" | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [confirmation, setConfirmation] = useState("")
  const [showReport, setShowReport] = useState(false)

  const API_BASE = "https://pz8q3ogutd.execute-api.us-east-2.amazonaws.com/prod"

  const handleGenerateReport = async () => {
    if (!reportType) {
      setConfirmation("Por favor, selecciona un tipo de reporte.")
      return
    }

    try {
      let url = `${API_BASE}/consumo`
      if (reportType === "mensual") {
        const now = new Date()
        const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
        url += `/${yearMonth}`
      } else {
        const today = new Date().toISOString().slice(0, 10)
        url += `?fecha=${today}`
      }

      const res = await fetch(url)
      const data = await res.json()

      setReportData(data)
      setShowReport(true)
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
                    reportType === "mensual" ? "bg-[#d0bcff]" : "bg-[#cac4d0]"
                  }`}
                >
                  Mensual
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleGenerateReport}
                className="bg-[#eaddff] text-[#1d1b20] font-medium py-3 px-8 rounded-full text-lg"
              >
                Generar Reporte
              </button>
            </div>

            <div className="text-center text-[#1d1b20] mt-4">{confirmation}</div>

            {showReport && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-[#1d1b20] mb-2">Reporte Generado</h2>
                <div className="w-full max-h-[400px] bg-[#cac4d0] rounded-lg overflow-auto p-4">
                  {reportData.length > 0 ? (
                    <ul className="text-[#1d1b20] space-y-2">
                      {reportData.map((item, index) => (
                        <li key={index}>
                          ID: {item.id_empleado} - {item.fecha} - {item.tipo_comida} - ${item.precio}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-[#1d1b20]">No hay datos para mostrar.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
