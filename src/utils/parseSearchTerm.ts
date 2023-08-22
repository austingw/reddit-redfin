const parseSearchTerm = (searchTerm: string) => {
  let whereVal = {};

  //if search term has more than one word, assume it's a city, state pair
  if (searchTerm.split(" ").length > 1) {
    const city = searchTerm.split(" ")[0];
    const state = searchTerm.split(" ")[1];
    whereVal = {
      AND: [
        {
          city: {
            contains: city,
          },
        },
        {
          state: {
            contains: state,
          },
        },
      ],
    };
    return whereVal;
  } else {
    //if search term is one word, look through city, state, or zip
    whereVal = {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          state: {
            contains: searchTerm,
          },
        },
        {
          zip: {
            contains: searchTerm,
          },
        },
      ],
    };
    return whereVal;
  }
};
