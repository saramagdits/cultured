const RecipesModel = {};
RecipesModel.single = (d) => {
  // Accepts a SQL recipe result with multiple rows, and maps it to an object
  return {
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
      }})
  }
};
module.exports = RecipesModel;
