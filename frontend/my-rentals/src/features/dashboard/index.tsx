import { Main } from "./components/main";
import { DesktopNavBar } from "../../components/nav-bar/desktop-navbar";
import { MobileNavBar } from "../../components/nav-bar/mobile-navbar";
import { useDashboard } from "./hooks/useDashboard";
import { useState } from "react";
import AddRentalPopUp from "./components/add-rental-popup";
import { DashboardErrorState } from "./components/dashboard-error-state";



export const Dashboard =()=> {
  const { revenue, isLoading, isSaving, error, refresh, resetError, createAndRefresh} = useDashboard()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  if(isLoading) return <div>Loading dashboard...</div>

  if(error) return <DashboardErrorState message={error} onRetry={()=> {resetError(), setIsPopUpOpen(true)}}/>

  const yearlyRevenue = revenue[0]?.[0]?.totalRevenue || 0
  const monthlyRevenue = revenue[1]?.[0]?.totalRevenue || 0
  
  return (
    <div className="flex h-screen bg-sage-50 font-sans text-slate-900">
      
      {/* Left nav bar for desktop view only */}
      <DesktopNavBar/>
      
      {/* Main content */}
      <Main onOpenPopUp={() => setIsPopUpOpen(true)} props={{yearly: yearlyRevenue, monthly: monthlyRevenue}}/>
      
      <AddRentalPopUp 
        isOpen={isPopUpOpen} 
        onClose={() => setIsPopUpOpen(false)} 
        onSubmit={createAndRefresh}
        isSaving={isSaving}
        error={error}
      />

      {/* Bottom nav bar for mobile devices only */}
      <MobileNavBar/>

    </div>
  )
}