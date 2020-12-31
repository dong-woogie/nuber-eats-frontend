module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    excludes: [],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
