import {
  Alert
} from "react-native";

export function validateEmailAndPassword(email, password) {
  if(email.length === 0) {
    Alert.alert("Error", "Please fill in your email.");
    return false;
  } else if(!isValidEmail(email)) {
    Alert.alert("Error", "The email is invalid.")
    return false;
  } else if(password.length < 8) {
    Alert.alert("Error", "Password must be at least 8 characters long.");
    return false;
  }
  return true;
}

export function isValidEmail(email) {
  // Copied from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function trim(text) {
  let result = text;
  let showTripleDot = false;
  if(text.indexOf("\n") > -1) {
    result = text.split("\n")[0]
    showTripleDot = true;
  }
  if(result.length > 50) {
    result = result.slice(0, 50);
    showTripleDot = true;
  }
  if(showTripleDot) {
    result += "...";
  }
  return result;
}
export function formatDate(dateObj) {
  if(!dateObj.getDay) {
    return "Invalid date";
  }
  let day = dateObj.getDay();
  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  let hours = dateObj.getHours();
  let amOrPm = hours >= 12 ? "PM" : "AM"

  hours = hours > 12 ? hours - 12 : hours;

  let minutes = dateObj.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;


  return `${date} ${monthsText[month]} ${year} (${daysText[day]}) ${hours}:${minutes} ${amOrPm}`;
}