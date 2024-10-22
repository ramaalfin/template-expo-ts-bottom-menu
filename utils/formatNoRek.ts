export const formatNorek = (norek: any) => {
  const cleanNorek = norek.toString().replace(/\D/g, "");
  const truncatedNorek = cleanNorek.slice(0, 13);

  if (truncatedNorek.length < 13) {
    return truncatedNorek.replace(/\B(?=(\d{14}))/g, " ");
  }

  return truncatedNorek.replace(/\B(?=(\d{14}))/g, " ");
};
