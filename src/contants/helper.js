export function formatTime(timestamp) {
  let Newtimestamp = new Date(timestamp?.replace(/-/g, "/"));
  let currentTime = new Date();
  let timeDifference = (currentTime.getTime() - Newtimestamp.getTime()) / 1000; // Time difference in seconds

  if (timeDifference < 60) {
    return "Vừa xong";
  } else if (timeDifference < 3600) {
    let minutes = Math.floor(timeDifference / 60);
    return minutes + " phút trước";
  } else if (timeDifference < 86400) {
    let hours = Math.floor(timeDifference / 3600);
    return hours + " giờ trước";
  }
  return timestamp;
}
