const { Agency } = require("../Model/Index");

// const Agency = require("../Model/Agency")

module.exports = {
  getAgency: async () => {
    try {
      const agencies = await Agency.findAll();
      return agencies;
    } catch (err) {
      throw new Error("Get agency fail"+ err.message);
    }
  },
  createAgency: async (agencyData) => {
    try {
      const { agency_name, address, phone, import_price, export_price } =
        agencyData;

      // Tạo mới agency
      const newAgency = await Agency.create({
        agency_name,
        address,
        phone,
        import_price,
        export_price,
      });
      return newAgency;
    } catch (err) {
      throw new Error("Create agency fail", err);
    }
  },
  getAgencyById: async (agency_id) => {
    try {
      const agencies = await Agency.findOne({ where: { agency_id } });
      return agencies;
    } catch (err) {
      throw new Error("Get agency by id fail", err);
    }
  },
  updateAgency: async (agency_id, updateAgency) => {
    //trả về mảng,trong đó phần tử đầu tiên là số lượng hàng bị ảnh hưởng

    try {
      const [affectedRows] = await Agency.update(updateAgency, {
        where: { agency_id },
      });
      if (affectedRows === 0) {
        throw new Error("agency no find no change");
      }
      const updatedAgency = await Agency.findOne({ where: { agency_id } });
      return updatedAgency;
    } catch (err) {
      throw new Error("Update agency fail"+err.message);
    }
  },
  deleteAgency: async (agency_id) => {
    //để xóa các bản ghi từ bảng cơ sở dữ liệu
    try {
      const deleteRows = await Agency.destroy({ where: { agency_id } });
      if (deleteRows === 0) {
        throw new Error(' delete no find ');
      }
      return { message: "Agency deleted successfull" };
    } catch (err) {
      throw new Error("Delete agency fail"+ err.message);
    }
  },
};