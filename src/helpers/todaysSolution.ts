import { songs, startDate } from "../constants";

// const epochMs = new Date(2022, 3, 10).valueOf();
// const now = Date.now();
// const index = Math.floor((now - epochMs) / msInDay);

const msInDay = 86400000;
const todaysDate = new Date();
const days = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay);

export const todaysIndex = days % songs.length;
export const todaysSolution = songs[todaysIndex];
