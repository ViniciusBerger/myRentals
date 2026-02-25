
export const fetchYearlyRevenue = async()=> {
    const response = await fetch('http://127.0.0.1:3000/revenue/yearly')
    if (!response.ok) throw new Error("network response was not okay")
    
    const data = await response.json()
    return data
}

export const fetchMonthlyRevenue = async()=> {
    const response = await fetch('http://127.0.0.1:3000/revenue/yearly')
    if (!response.ok) throw new Error("network response was not okay")
    
    const data = await response.json()
    return data
}

export const loadRevenue = async() => {
    const dataYearlyRevenue = await fetchYearlyRevenue()
    const dataMonthlyRevenue = await fetchMonthlyRevenue()

    return [dataYearlyRevenue, dataMonthlyRevenue]
}