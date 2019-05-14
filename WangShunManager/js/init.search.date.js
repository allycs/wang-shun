var dateTime = new Date();
var startTime = dateTime.Format("yyyy/MM/dd 00:00:00");
dateTime.setDate(dateTime.getDate() + 1);
var endTime = dateTime.Format("yyyy/MM/dd 00:00:00");