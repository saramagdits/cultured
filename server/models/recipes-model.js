const RecipesModel = {};

// Accepts a SQL recipe result with multiple rows, and maps it to an object
RecipesModel.single = (d) => {
  return {
    id: d[0].id,
    title: d[0].title,
    description: d[0].description,
    imagePath: d[0].image_path,
    author: d[0].author,
    authorAvatar: d[0].author_avatar,
    prepTime: d[0].prep_time,
    readyTime: d[0].ready_time,
    difficulty: d[0].difficulty,
    timesFavorited: d[0].times_favorited,
    dateCreated: d[0].date_created.toDateString(),
    ingredients: d.map((row) => {
      return {
        value: row.value,
        quantity: row.quantity,
        unit: row.unit
      }
    })
  }
};

RecipesModel.multiple = (d) => {
  let groupBy = {};
  d.forEach(row => {
    if (!groupBy[row.id]) {
      groupBy[row.id] = [];
    }
    groupBy[row.id].push(row);
  });

  let results = [];
  Object.keys(groupBy).forEach(id => {
    let groupByRecords = groupBy[id];
    results.push(
      {
        id: groupByRecords[0].id,
        title: groupByRecords[0].title,
        description: groupByRecords[0].description,
        imagePath: groupByRecords[0].image_path,
        author: groupByRecords[0].author,
        authorAvatar: groupByRecords[0].author_avatar,
        prepTime: groupByRecords[0].prep_time,
        readyTime: groupByRecords[0].ready_time,
        difficulty: groupByRecords[0].difficulty,
        timesFavorited: groupByRecords[0].times_favorited,
        dateCreated: groupByRecords[0].date_created.toDateString(),
        ingredients: groupByRecords.map((row) => {
          return {
            value: row.value,
            quantity: row.quantity,
            unit: row.unit
          }
        })
      }
    );
  });
  return results;
};
module.exports = RecipesModel;
