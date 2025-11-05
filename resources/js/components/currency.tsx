import React from 'react'

const CurrencyFormat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1">
        <img src="/images/espees.png" alt="currency" className="w-4 h-4" /> 
        {children}
    </div>
  )
}

export default CurrencyFormat