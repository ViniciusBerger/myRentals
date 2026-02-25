import { X } from 'lucide-react';
import { useState, } from 'react'
import { AddRentalForm } from './add-rental-form';

export default function AddRentalPopUp({ onSubmit,isOpen, onClose, isSaving, error }: { onSubmit: any,isSaving: boolean, error: any, isOpen: boolean, onClose: () => void }) {

  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    startDate: '',
    endDate: '',
    revenue: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'revenue' ? parseFloat(value) : value
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault(); // STOP the page refresh
    console.log("HANDLE SUBMIT HITTED")
    
    await onSubmit(formData); // Send the actual data!
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[32px] md:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">New Rental</h2>
          <button onClick={onClose} className="p-2 hover:bg-sage-50 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <AddRentalForm handleSubmit={handleSubmit} handleChange={handleChange} error={error} isSaving={isSaving}   />
      </div>
    </div>
  );
}