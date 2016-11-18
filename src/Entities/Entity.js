const { utc } = require('moment');
const { map } = require('lodash');

class Entity {
  constructor(attributes) {
    this.fill(attributes);
  }

  fill(attributes = {}) {
    map(attributes, (value, key) => {
      if (this.fillable.includes(key)) {
        this[key] = value;
      }

      if (value && this.dates.includes(key)) {
        this[key] = utc(value);
      }
    });

    return this;
  }

  force(attributes = {}) {
    map(attributes, (value, key) => {
      this[key] = value;

      if (value && this.dates.includes(key)) {
        this[key] = utc(value);
      }
    });

    return this;
  }

  get dates() {
    return [];
  }

  get fillable() {
    return [];
  }
}

module.exports = Entity;
