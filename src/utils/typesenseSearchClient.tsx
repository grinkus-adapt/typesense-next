import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "8hLCPSQTYcBuK29zY5q6Xhin7ONxHy99", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "qtg5aekc2iosjh93p.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    query_by: "name,categories,description",
  },
});

export const searchClient = typesenseInstantsearchAdapter.searchClient;
