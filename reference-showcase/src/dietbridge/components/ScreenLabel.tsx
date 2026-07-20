interface ScreenLabelProps {
  title: string
  desc: string
}

/** Vitrinde çerçeveli ekranın üzerinde gösterilen kısa Türkçe açıklama. */
export default function ScreenLabel({ title, desc }: ScreenLabelProps) {
  return (
    <div className="w-[390px] max-w-full">
      <h3 className="text-[15px] font-semibold text-textPrimary">{title}</h3>
      <p className="mt-0.5 text-[13px] leading-[18px] text-textSecondary">{desc}</p>
    </div>
  )
}
