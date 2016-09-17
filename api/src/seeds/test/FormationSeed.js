/**
 * Created by dionis on 6/26/2016.
 */

var faker;
faker = require('faker');

faker.locale = "fr"
module.exports = [{

  dates: [{
    date: faker.date.past([], new Date("12/12/2015")),
    morning: {
      hourStart: "07:00",
      hourEnd: "12:00"
    },
    afternoon: {
      hourStart: "04:00",
      hourEnd: "06:00"
    }
  }, {
    date: faker.date.future(),
    morning: {
      hourStart: "08:00",
      hourEnd: "12:00"
    },
    afternoon: {
      hourStart: "03:00",
      hourEnd: "06:00"
    }
  }],

  maxPeople: faker.random.number({max:20, min:5}),

  isConfirmed: faker.random.boolean(),

  isFull:  false,
//faker.random.boolean(),

  price:faker.commerce.price(50, 250),

  agreementName:faker.random.words(),

  initdate:faker.date.past([], new Date())




},
  {
    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

     price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date()),




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull:  false,
//faker.random.boolean(),

    price:faker.commerce.price(50, 250),
    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {
    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],
    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date()),




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull:  false,
//faker.random.boolean(),

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {
    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],
    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date()),




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull:  false,
//faker.random.boolean(),

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {
    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date())




  },
  {

    dates: [{
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "07:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }, {
      date: faker.date.past([], new Date("12/12/2015")),
      morning: {
        hourStart: "08:00",
        hourEnd: "12:00"
      },
      afternoon: {
        hourStart: "02:00",
        hourEnd: "06:00"
      }
    }],

    maxPeople: faker.random.number({max:20, min:5}),

    isConfirmed: faker.random.boolean(),

    isFull: false,

    price:faker.commerce.price(50, 250),

    agreementName:faker.random.words(),

    initdate:faker.date.past([], new Date()),




  }];
