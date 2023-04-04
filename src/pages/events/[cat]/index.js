import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = (props) => {
  const [eventData, setEventData] = useState([]);
  const [disEvents, setDisEvents] = useState([]);

  useEffect(() => {
    getData();
    filterData();
  }, []);

  async function getData() {
    const eventsInCity = await import("../../../data/data.json");
    const allEvents = eventsInCity.allEvents;
    setEventData(allEvents);
  }

  function filterData() {
    const selectedEvents = eventData?.filter((ev) => {
      return ev.city === props.data[0].id;
    });
    console.log("ssq", selectedEvents);
    setDisEvents(selectedEvents);
  }

  console.log("selectedEvents", disEvents);
  console.log("props.data.ids", eventData);
  return (
    <>
      <h1>{props.data[0].id} city</h1>
      <Image src={props.data[0].image} height={200} width={200} />
      <>
        <div>
          {disEvents.length &&
            disEvents?.map((dis) => {
              return (
                <>
                  <div>
                    <h1>-{dis?.title}</h1>{" "}
                  </div>
                  <Link
                    href={`/events/${props.data[0].id}/${dis.id}`}
                    id="events"
                  >
                    {" "}
                    <div>{dis?.id}</div>
                  </Link>
                </>
              );
            })}
        </div>
      </>
    </>
  );
};

export default Page;

export async function getStaticPaths() {
  const data = await import("../../../data/allPaths.json");
  const events_categories = data.all_paths;
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.city.toString(),
      },
    };
  });
  console.log("allPaths ", allPaths);

  return {
    paths: allPaths,
    fallback: false,
  };
}

// export async function getServerSideProps() {
//   //   const res = await fetch("/api/users/random_user");
//   //   console.log("dat", res);
//   return {
//     props: { title: "hello world" },
//   };
// }

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { events_categories } = await import("../../../data/data.json");

  const data = events_categories.filter((ev) => ev.id === id);

  return { props: { data, pageName: id } };
}
