const { utc } = require('moment');
const { map } = require('lodash');

class Entity {
  constructor(attributes) {
    this.fill(attributes);
  }

  fill(attributes) {
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
}

module.exports = Entity;
