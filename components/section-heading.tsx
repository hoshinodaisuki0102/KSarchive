type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.32em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-gradient-ink md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}
