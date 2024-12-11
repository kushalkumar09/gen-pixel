import { Collection } from "@/components/shared/collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

// Define the type for searchParams
interface SearchParamProps {
  searchParams: {
    page?: string; // Optional page parameter
    query?: string; // Optional query parameter
  };
}

const Home = async ({ searchParams }: SearchParamProps) => {
  // Await searchParams to access its properties
  const params = await searchParams;

  const page = Number(params.page) || 1; // Convert to number, default to 1
  const searchQuery = params.query || ''; // Default to empty string if not provided

  // Fetch images based on the page and search query
  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
}

export default Home;