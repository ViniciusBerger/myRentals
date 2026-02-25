
export const addRental = async (rentalData: any)=> {
    const response = await fetch('http://127.0.0.1:3000/rental', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // The body must be a string, so we use JSON.stringify
    body: JSON.stringify(rentalData),
  })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create rental');
    }
}