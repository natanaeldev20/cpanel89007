interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className="p-8 dark:bg-[#161618] dark:text-white">
      {children}
    </section>
  );
};

export default Section;
