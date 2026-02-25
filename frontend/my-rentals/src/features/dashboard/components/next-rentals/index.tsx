
export const NextRentals = ()=> (
    <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Next Three Rentals</h3>
            <button className="text-xs font-bold text-sage-600">See All</button>
        </div>

        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 group cursor-pointer hover:border-sage-200 transition-all">
                    <div className="w-14 h-14 bg-sage-100 rounded-xl flex-shrink-0 group-hover:scale-95 transition-transform" />
                  
                    <div className="flex-1">
                        <p className="font-bold text-sm">Guest {i}: John Doe</p>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">July 1{i} - July 2{i} • 2  Guests</p>
                    </div>
                  
                    <div className="px-3 py-1 rounded-full bg-sage-50 text-sage-600 text-[10px] font-black uppercase">
                        Confirmed
                    </div>
                </div>
              ))}
        </div>
    </section>
)