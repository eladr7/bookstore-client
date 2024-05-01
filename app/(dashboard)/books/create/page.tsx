import { getGenresFromAPI } from "@/app/lib/helpers";
import CreateForm from "./CreateForm";

interface CreatePageProps {}
const CreatePage: React.FC<CreatePageProps> = async ({}) => {
  const genres = await getGenresFromAPI();

  return (
    <main>
      <h2 className="text-primany text-center">Add a new Book</h2>

      <CreateForm genres={genres} />
    </main>
  );
};

export default CreatePage;
