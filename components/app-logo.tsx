export default function AppLogo() {
  return (
    <div className="w-16 h-16 mr-4">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-[#1d1b20] rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="12" height="16" rx="2" stroke="#eaddff" strokeWidth="2" />
            <rect x="8" y="7" width="8" height="6" rx="1" stroke="#eaddff" strokeWidth="2" />
            <rect x="8" y="15" width="8" height="3" rx="1" stroke="#eaddff" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}
