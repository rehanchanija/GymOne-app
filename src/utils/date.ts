import dayjs from 'dayjs';

export const formatShort = (iso: string | number | Date) =>
  dayjs(iso).format('MMM D');
export const formatTime = (iso: string | number | Date) =>
  dayjs(iso).format('HH:mm');
export const formatFull = (iso: string | number | Date) =>
  dayjs(iso).format('YYYY-MM-DD HH:mm');
