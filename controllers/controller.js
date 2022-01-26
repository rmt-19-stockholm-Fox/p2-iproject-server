const axios = require(`axios`);
const getdates = require("../helpers/getdate");

class Controller {
  static async findMeTheTime(req, res, next) {
    try {
      const calkey = process.env.CALENDARIFIC_KEY;
      const { country, forcednum, nmdayoff, year, streak } = req.query;
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
        spdayoff[i] = spdayoff[i].slice(0, 15);
      });

      const startd = new Date(`${year}-01-01`);
      const endd = new Date(`${year}-12-31`);

      let alldate = getdates(startd, endd);

      alldate.forEach((x, i) => {
        alldate[i] = alldate[i].slice(0, 15);
      });

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
            alldate[i] += ` | Weekly holiday.`;
          }
        });
      });

      if (!streak) {
        streak = nmdayoff.length + +forcednum;
      }

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
        if (inoutput.dates.length > streak) {
          output.push(inoutput);
          i += hah - 1;
        }
      }
      res.status(200).json({ output });
    } catch (error) {
      next(error);
    }
  }

  static async findMeThePlace(req, res, next) {
    try {
      let { goingto, maxdistance } = req.query;
      const optkey = process.env.OPENTRIP_KEY;
      goingto = goingto.split(" ");
      goingto = goingto.join("%20");
      const goingtodet = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/geoname?name=${goingto}&apikey=${optkey}`,
        {
          Headers: { accept: "application/json" },
        }
      );
      const userlon = goingtodet.data.lon;
      const userlat = goingtodet.data.lat;

      if (!maxdistance) {
        maxdistance = `10000`;
      } else {
        maxdistance = String(maxdistance) + `0000`;
      }

      let intplace = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=${maxdistance}&lon=${userlon}&lat=${userlat}&src_attr=wikidata&limit=5000&apikey=${optkey}`,
        {
          Headers: { accept: "application/json" },
        }
      );

      intplace.data.features = intplace.data.features.filter((x) => {
        if (x.properties.wikidata) {
          return x;
        }
      });

      let indexed = Math.floor(Math.random() * intplace.data.features.length);
      const displayed = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/xid/${intplace.data.features[indexed].properties.xid}?apikey=${optkey}`,
        {
          Headers: { accept: "application/json" },
        }
      );

      let indexed2 = indexed;

      while (indexed2 === indexed) {
        indexed2 = Math.floor(Math.random() * intplace.data.features.length);
      }
      const displayed2 = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/xid/${intplace.data.features[indexed2].properties.xid}?apikey=${optkey}`,
        {
          Headers: { accept: "application/json" },
        }
      );

      let indexed3 = indexed2;

      while (indexed3 === indexed || indexed3 === indexed2) {
        indexed3 = Math.floor(Math.random() * intplace.data.features.length);
      }
      const displayed3 = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/xid/${intplace.data.features[indexed3].properties.xid}?apikey=${optkey}`,
        {
          Headers: { accept: "application/json" },
        }
      );

      res.status(200).json({
        data1: displayed.data,
        data2: displayed2.data,
        data3: displayed3.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async findMeTheHotel(req, res, next) {}
}

module.exports = Controller;
