const allEqual = (arr) => {
  return arr.every((v) => v === arr[0]);
};

export const aggregateStatus = (statusArr) => {
  if (allEqual(statusArr)) {
    return(statusArr[0]);
  } else if (statusArr.includes("Failed")) {
    return("Failed");
  } else if (statusArr.includes("Scheduled")) {
    return("Scheduled");
  } else if (statusArr.includes("Running")) {
    return("Running");
  } 
};
