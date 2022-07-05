class BaseService {
  async get(criteria = {}, fields = [], options = {}) {
    return await this.className.find(criteria, fields, options);
  }

  async getOne(criteria, fields = [], options = {}) {
    return await this.className.findOne(criteria, fields, options);
  }

  async count(criteria) {
    return await this.className.countDocuments(criteria);
  }

  async delete(criteria) {
    return await this.className.deleteOne(criteria);
  }

  async deleteMany(criteria) {
    return await this.className.deleteMany(criteria);
  }

  async updateOne(criteria, data) {
    return await this.className.findOneAndUpdate(
      criteria,
      data,
      {
        upsert: true,
        setDefaultsOnInsert: true,
      },
      function (err, doc) {
        if (err) {
          return err;
        } else {
          return doc;
        }
      }
    );
  }
  async update(criteria, data, upsert = true) {
    return await this.className.updateMany(
      criteria,
      data,
      { upsert },
      function (err, doc) {
        if (err) {
          return err;
        } else {
          return doc;
        }
      }
    );
  }
}

export default BaseService;
