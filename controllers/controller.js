const axios = require(`axios`);
const getdates = require("../helpers/getdate");

class Controller {
  static async findMeTheTime(req, res, next) {
    try {
      const calkey = process.env.CALENDARIFIC_KEY;
      const { country, forcednum, nmdayoff, year } = req.query;
      let spdayoff = [];
      let spdayname = [];
      const result = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=${calkey}&country=${country}&year=${year}`
      );
      result.data.response.holidays.forEach((x) => {
        spdayoff.push(x.date.iso);
        spdayname.push(x.name);
      });

      spdayoff.forEach((x, i) => {
        spdayoff[i] = new Date(spdayoff[i]).toString();
      });

      const startd = new Date(`${year}-01-01`);
      const endd = new Date(`${year}-12-31`);

      const alldate = getdates(startd, endd);

      spdayoff.forEach((x, k) => {
        alldate.forEach((y, i) => {
          if (x === y) {
            alldate[i] += ` | ${spdayname[k]}.`;
          }
        });
      });

      nmdayoff.forEach((x) => {
        alldate.forEach((y, i) => {
          if (y.includes(x) === true) {
            alldate[i] += ` * Weekly holiday.`;
          }
        });
      });

      let searchminnum = nmdayoff.length + +forcednum;
      let output = [];

      for (let i = 0; i < alldate.length; i++) {
        let inoutput = {
          dates: [],
        };
        let hah = 1;
        let tempor = +forcednum;
        if (alldate[i][alldate[i].length - 1] === `.`) {
          if (tempor === +forcednum) {
            inoutput.dates.push(alldate[i]);
          }
          while (tempor > 0) {
            if (alldate[i + hah]) {
              inoutput.dates.push(alldate[i + hah]);
              if (alldate[i + hah][alldate[i + hah].length - 1] !== `.`) {
                tempor -= 1;
              }
            } else {
              tempor = 0;
            }
            hah += 1;
          }
        }
        if (inoutput.dates.length > searchminnum) {
          output.push(inoutput);
          i += hah - 1;
        }
      }
      res.status(200).json({ output });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
