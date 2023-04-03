import Image from "next/image";
import Link from "next/link";

const Page = ({ data }) => {
  console.log("props", data);

  return (
    <>
      <h1>events page</h1>
      <div>
        {data.map((ev) => {
          return (
            <>
              <Link
                // id={`/events/${ev.id}`}
                href={`/events/${ev.id}`}
                id="events"
              >
                {console.log("`/events/${ev.id}`", ev.id)}
                <h1>{ev.id}</h1>
                <Image src={ev.image} height={200} width={200} />
              </Link>

              <p>{ev.title}</p>
              <p>{ev.description}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");

  console.log("data", events_categories);
  return {
    props: { data: events_categories },
  };
}
