export const TimeFunction = {
  convertSeconds: (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(
      Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60)
    ).padStart(2, "0");
    const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${hours}:${minutes}:${sec}`;
  },
};
