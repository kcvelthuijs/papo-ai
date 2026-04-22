type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function VerbCardLayout({
  title,
  description,
  children,
  footer,
}: Props) {
  return (
    <div className='border rounded p-4 flex flex-col gap-4'>
      {/* HEADER */}
      <div>
        <h2 className='text-xl font-semibold'>{title}</h2>
        {description && <p className='text-sm text-gray-500'>{description}</p>}
      </div>

      {/* CONTENT */}
      <div>{children}</div>

      {/* FOOTER */}
      {footer && <div className='mt-4'>{footer}</div>}
    </div>
  );
}
