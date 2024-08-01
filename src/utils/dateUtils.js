const daysOfWeek = ["Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab.", "Dom."];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Augosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatDate(dateString){
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    return `${dayOfWeek} ${day} ${month}`;
  }