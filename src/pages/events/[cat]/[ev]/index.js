const Page = ({ data }) => {
  console.log("id", data);
  return <>id page</>;
};

export default Page;

export async function getStaticProps(context) {
  const id = context?.params.category;
  console.log("ontext", context);
  const { all_paths } = await import("../../../../data/allPaths.json");

  const data = all_paths.filter((ev) => ev.id === id);

  return { props: { data } };
}

export async function getStaticPaths() {
  const data = await import("../../../../data/allPaths.json");

  const all_paths = data.all_paths;

  const eventPaths = all_paths.map((ev) => {
    return {
      params: {
        ev: ev.id.toString(),
      },
    };
  });

  console.log("eventPaths", eventPaths);

  return {
    paths: eventPaths,
    fallBack: "blocking",
  };
}
