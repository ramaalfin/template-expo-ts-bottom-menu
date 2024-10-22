const indonesianMonths = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const formatMonth = (dateString: string) => {
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${indonesianMonths[monthIndex]} ${year}`;
};
