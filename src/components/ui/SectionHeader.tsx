interface Props {
  children: React.ReactNode;
}

const SectionHeader = ({ children }: Props) => {
  return (
    <header className="px-4 py-7 sticky top-0 bg-white border-b-2 border-gray-100 text-xl font-semibold position dark:bg-[#161618] dark:text-white dark:border-b-[#39393b]">
      <h1 className="flex items-center gap-4">{children}</h1>
    </header>
  );
};

export default SectionHeader;
