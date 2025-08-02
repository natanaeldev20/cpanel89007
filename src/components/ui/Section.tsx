interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className="p-8">{children}</section>;
};

export default Section;
