const getFromLocalStorage = (...keys) => {
  return keys.reduce((acc, key) => {
    acc[key] = localStorage.getItem(key);
    return acc;
  }, {});
};

const removeFromLocalStorage = (...keys)=>{
    return keys.map((key)=>{
        localStorage.removeItem(key);
    })
}

const setToLocalStorage = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

const checkKeyExists = (criteria) => {
  const storedData = localStorage.getItem("remain");
  if (!storedData) return false;
  try {
    const dataArray = JSON.parse(storedData);
    const index = dataArray.findIndex((item) =>
      Object.entries(criteria).every(([key, value]) => item[key] === value)
    );

    return index !== -1 ? index : false;
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return false;
  }
};


const removeNonMatchingObjects = (criteria) => {
  const storedData = localStorage.getItem("remain");
  if (!storedData) return false;

  try {
    let dataArray = JSON.parse(storedData);
    dataArray = dataArray.filter(
      (item) => Object.entries(criteria).every(([key, value]) => item[key] === value)
    );
    localStorage.setItem("remain", JSON.stringify(dataArray));
    return true;
  } catch (error) {
    console.error("Error parsing or updating localStorage data:", error);
    return false;
  }
};



export {getFromLocalStorage,removeFromLocalStorage,setToLocalStorage,checkKeyExists,removeNonMatchingObjects};
