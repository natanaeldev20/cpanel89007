import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/ui/Section";
import { FaNewspaper } from "react-icons/fa6";
import NumberCard from "@/components/ui/NumberCard";
import { getCountNews, getNews } from "./services/newsService";
import CreateNews from "./components/CreateNews";
import { ToastContainer } from "react-toastify";
import NewsCard from "./components/NewsCard";

const SchoolNews = async () => {
  const numberNews = await getCountNews();
  const news = await getNews();

  return (
    <>
      <SectionHeader>
        Gestión de Noticias
        <FaNewspaper size={22} />
      </SectionHeader>
      <Section>
        <div className="pb-8">
          <NumberCard
            title="Noticias"
            borderColor="border-violet-500"
            backgroundIcon="bg-violet-100"
            count={numberNews}
          >
            <FaNewspaper size={22} color="violet" />
          </NumberCard>
        </div>
        <div className="flex justify-between mb-8 flex-col gap-4 sm:gap-0 sm:items-center sm:flex-row">
          <div>
            <h2 className="text-lg font-semibold">Lista de Noticias</h2>
            <p>Administra los datos de las noticias.</p>
          </div>
          <CreateNews />
        </div>
        <div className="w-full gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {news.map(({ id, title, content, imageUrl }) => (
            <NewsCard
              key={id}
              id={id}
              title={title}
              content={content}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </Section>
      <ToastContainer />
    </>
  );
};

export default SchoolNews;
