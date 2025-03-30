exports = async function (arg) {
  // var arg = {
  //   month: 15,
  //   year: 2024,
  //   day: { date: 4, hours: "2:30:09" },
  // };
  const year = localStorage.getItem(`${arg.year}`);
  var result;
  try {
    const query = {
      month: arg.month,
      year: arg.year,
      days: {
        $elemMatch: {
          date: arg.day.date,
        },
      },
    };
    const dt = data.map((year, index) => {
      year.map((month) => {
        month;
      });
    });
    console.log(dt);
    result = await collection.findOne({
      month: arg.month,
      year: arg.year,
    });

    if (dt) {
      const updateResult = await collection.findOneAndUpdate(query, {
        $set: { "days.$.hours": arg.day.hours },
      });
      return { updateResult };
    } else if (result) {
      const update = { $push: { days: arg.day } };
      const res = await collection.findOneAndUpdate(
        { month: arg.month, year: arg.year },
        update,
        {
          returnOriginal: false,
        }
      );
      return { res };
    } else {
      const newEntry = {
        month: arg.month,
        year: arg.year,
        days: [arg.day],
      };
      const res = await collection.insertOne(newEntry);
      return { res };
    }
  } catch (err) {
    console.log("Error occurred while executing findOne:", err.message);
    return { error: err.message };
  }
};