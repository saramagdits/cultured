const UserAuthModel = {};
UserAuthModel.single = (d) => {
  return {
    id: d.id,
    username: d.username,
    avatarPath: d.avatar_path,
    dateCreated: d.date_created
  }
};
module.exports = UserAuthModel;
