export function formatTime(timestamp) {
  var Newtimestamp = new Date(timestamp?.replace(/-/g, "/"));
  var currentTime = new Date();
  var timeDifference = (currentTime.getTime() - Newtimestamp.getTime()) / 1000; // Time difference in seconds

  if (timeDifference < 60) {
    return "Vừa xong";
  } else if (timeDifference < 3600) {
    var minutes = Math.floor(timeDifference / 60);
    return minutes + " phút trước";
  } else if (timeDifference < 86400) {
    var hours = Math.floor(timeDifference / 3600);
    return hours + " giờ trước";
  } else {
    var days = Math.floor(timeDifference / 86400);
    return days + " ngày trước";
  }
  return timestamp;
}
