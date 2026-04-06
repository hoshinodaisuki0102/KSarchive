type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}