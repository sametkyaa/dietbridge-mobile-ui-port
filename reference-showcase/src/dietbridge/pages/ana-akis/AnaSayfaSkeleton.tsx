import PhoneFrame from '../../components/PhoneFrame'

/** Ana Sayfa — iskelet (yükleniyor): boş ekran veya spinner yerine içerik iskeleti. */
export default function AnaSayfaSkeleton() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-6 px-5 pb-6 pt-2">
        {/* başlık iskeleti */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="skeleton h-[26px] w-[180px] rounded-[8px]" />
            <div className="skeleton h-[14px] w-[120px] rounded-[7px]" />
          </div>
          <div className="skeleton h-[36px] w-[36px] rounded-full" />
        </div>
        {/* hero iskeleti */}
        <div className="skeleton h-[132px] w-full rounded-[22px]" />
        {/* ilerleme iskeleti */}
        <div className="rounded-[18px] border border-line bg-surface p-4">
          <div className="skeleton h-[16px] w-[130px] rounded-[7px]" />
          <div className="skeleton mt-3 h-[14px] w-full rounded-[7px]" />
          <div className="skeleton mt-2 h-[8px] w-full rounded-full" />
          <div className="skeleton mt-3 h-[14px] w-[70%] rounded-[7px]" />
          <div className="skeleton mt-2 h-[8px] w-full rounded-full" />
        </div>
        {/* liste iskeleti */}
        <div className="space-y-2">
          <div className="skeleton h-[18px] w-[140px] rounded-[7px]" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-[18px] border border-line bg-surface p-4">
              <div className="skeleton h-[44px] w-[44px] rounded-[12px]" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-[12px] w-[80px] rounded-[6px]" />
                <div className="skeleton h-[14px] w-full rounded-[6px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
