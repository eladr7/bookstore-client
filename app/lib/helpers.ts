export const formatCamelCaseString = (text: string): string => {
  // Break the string into words based on camelCase
  const words = text.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of each word
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getGenresFromAPI = async () => {
  const res = await fetch("http://localhost:5000/genres", {
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  return res.json();
};

export const toNormalDate = (dateString: string) => {
  // dateString example: "2024-04-02T00:00:00.000Z";
  const dateObject = new Date(dateString);

  // Format the date as desired
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  // Output: Apr 2, 2024
  return formattedDate;
};
