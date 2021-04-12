module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    excludes: [],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://nuguri-backend.herokuapp.com/graphql"
          : "http://localhost:4000/graphql",
    },
  },
};
