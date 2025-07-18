// module.exports = (Model) => {
//   return {
//     paginate: async ({ page = 1, limit = 10, include = [], attributes = {} }) => {
//       const offset = (page - 1) * limit;
//       const options = {
//         limit,
//         offset,
//         include,
//         attributes,
//       };
//       return await Model.findAndCountAll(options);
//     },

//     findById: async (id, include = []) => {
//       return await Model.findByPk(id, { include });
//     },

//     create: async (data) => {
//       return await Model.create(data);
//     },

//     update: async (id, updateData) => {
//       const instance = await Model.findByPk(id);
//       if (!instance) {
//         throw new Error("Không tìm thấy bản ghi");
//       }
//       await instance.update(updateData);
//       return instance;
//     },

//     delete: async (id) => {
//       const instance = await Model.findByPk(id);
//       if (!instance) {
//         throw new Error("Không tìm thấy bản ghi");
//       }
//       await instance.destroy();
//       return { message: "Xóa thành công" };
//     },
//   };
// };