interface IncomeProps {
  props: {
    monthly: string
    yearly: string
  }
}
export const IncomeSection = ({props}: IncomeProps)=> (
    <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-sage-100 shadow-sm shadow-sage-100/50">
          <p className="text-[10px] uppercase tracking-widest text-sage-600 font-black mb-1">Yearly Income</p>
          <h2 className="text-2xl font-bold tracking-tight">R$: {props.yearly}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm shadow-sky-100/50">
          <p className="text-[10px] uppercase tracking-widest text-sky-600 font-black mb-1">Monthly Income</p>
          <h2 className="text-2xl font-bold tracking-tight">R$: {props.monthly}</h2>
        </div>
    </div>
)