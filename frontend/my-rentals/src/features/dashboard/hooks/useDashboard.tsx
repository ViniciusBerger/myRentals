import { useState, useEffect } from 'react';
import { loadDashboardRevenues } from '../services/dashboard-service';
import { addRental } from '../services/rental-service';

export const useDashboard = () => {
  const [revenue, setRevenue] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);


  const resetError = () => setError(null);

  // The logic lives here, hidden away from the UI
  const loadData = async () => {
    try {
      setIsLoading(true);
      const resultLoadRevenue = await loadDashboardRevenues();
      console.log("API Result:", resultLoadRevenue);
      setRevenue(resultLoadRevenue);
    
    } catch (err) {
      setError("Failed to load dashboard data " + err );
    
    } finally {
      setIsLoading(false);
    }
  };

  const createNewRental = async (data: any) => {
    try {
      setIsSaving(true);
      const rental = await addRental(data);
      console.log("rental saved:" + rental)
      await loadData(); // Automatically refresh revenue after saving!
    
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw so the component knows it failed
    
    } finally {
      setIsSaving(false);
    }
  };

  const createAndRefresh = async (data:any)=> {
    await createNewRental(data);
    await loadData()
  }

  useEffect(() => {
    loadData();
  }, []);

  // return an object so the component can just "grab" what it needs
 return { 
    revenue, 
    isLoading, 
    isSaving, // Component can use this to disable the "Submit" button
    error, 
    refresh: loadData,
    resetError,
    createAndRefresh // Return the new function
  };
};