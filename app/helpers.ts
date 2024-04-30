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
      revalidate: 3600,
    },
  });

  return res.json();
};
