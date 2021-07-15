import formatDistance from 'date-fns/formatDistance'

export const formatDate = (date) => {
  return date ? formatDistance(new Date(), new Date(date * 1000), {addSuffix: true}) : ""
};