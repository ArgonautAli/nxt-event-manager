import Router, { useRouter } from "next/router";
import { allEvents } from "../../../../data/data.json";
import { useEffect, useState } from "react";
import Image from "next/image";

const Page = (props) => {
  let router = useRouter();
  const id = router.query.ev;
  const [eventData, setEventData] = useState();
  const [email, setEmail] = useState("");
  console.log("router", router.query.ev);
  console.log("allEvents ", allEvents);

  function eventFiler() {
    const specificEvent = allEvents.filter((ae) => ae.id === id);
    setEventData(specificEvent);
  }

  useEffect(() => {
    eventFiler();
  }, []);

  async function submitHandler() {
    try {
      const resp = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, eventId: id }),
      });

      if (!resp.status) throw new Error(resp.status);
      const data = await resp.json();
      console.log("res", resp);
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <>
      {router.query.ev} page
      <div>
        {eventData?.map((ev) => {
          return (
            <>
              <div>{ev.title}</div>
              <Image src={ev.image} height={100} width={100} />
              <div>{ev.description}</div>
              <input
                type="text"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={submitHandler}>submit</button>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;

// export async function getStaticProps(context) {
//   const id = context?.params.category;
//   console.log("ontext", context);
//   const { all_paths } = await import("../../../../data/allPaths.json");

//   const data = all_paths.filter((ev) => ev.id === id);

//   return { props: { data } };
// }

// export async function getStaticPaths() {
//   const data = await import("../../../../data/allPaths.json");

//   const all_paths = data.all_paths;

//   const eventPaths = all_paths.map((ev) => {
//     return {
//       params: {
//         ev: ev.id.toString(),
//       },
//     };
//   });

//   console.log("eventPaths", eventPaths);

//   return {
//     paths: eventPaths,
//     fallBack: "blocking",
//   };
// }
