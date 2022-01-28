const axios = require(`axios`);
const getdates = require("../helpers/getdate");

class Controller {
  static async findMeTheTime(req, res, next) {
    try {
      const calkey = process.env.CALENDARIFIC_KEY;
      let { country, forcednum, nmdayoff, year } = req.body;
      let spdayoff = [];
      let spdayname = [];

      switch (country.toLowerCase()) {
        case `afghanistan`:
          country = `af`;
          break;
        case `albania`:
          country = `al`;
          break;
        case `algeria`:
          country = `dz`;
          break;
        case `argentina`:
          country = `ar`;
          break;
        case `australia`:
          country = `au`;
          break;
        case `austria`:
          country = `at`;
          break;
        case `bangladesh`:
          country = `bd`;
          break;
        case `belgium`:
          country = `be`;
          break;
        case `bhutan`:
          country = `bt`;
          break;
        case `bolivia`:
          country = `bo`;
          break;
        case `botswana`:
          country = `bw`;
          break;
        case `brazil`:
          country = `br`;
          break;
        case `brunei`:
          country = `bn`;
          break;
        case `bulgaria`:
          country = `bg`;
          break;
        case `cambodia`:
          country = `kh`;
          break;
        case `canada`:
          country = `ca`;
          break;
        case `chile`:
          country = `cl`;
          break;
        case `china`:
          country = `cn`;
          break;
        case `colombia`:
          country = `co`;
          break;
        case `congo`:
          country = `cg`;
          break;
        case `croatia`:
          country = `hr`;
          break;
        case `cuba`:
          country = `cu`;
          break;
        case `czech republic`:
          country = `cz`;
          break;
        case `denmark`:
          country = `dk`;
          break;
        case `dominica`:
          country = `dm`;
          break;
        case `ecuador`:
          country = `ec`;
          break;
        case `egypt`:
          country = `eg`;
          break;
        case `estonia`:
          country = `ee`;
          break;
        case `ethiopia`:
          country = `et`;
          break;
        case `finland`:
          country = `fi`;
          break;
        case `france`:
          country = `fr`;
          break;
        case `gabon`:
          country = `ga`;
          break;
        case `georgia`:
          country = `ge`;
          break;
        case `germany`:
          country = `de`;
          break;
        case `gibraltar`:
          country = `gi`;
          break;
        case `greece`:
          country = `gr`;
          break;
        case `greenland`:
          country = `gl`;
          break;
        case `guatemala`:
          country = `gt`;
          break;
        case `haiti`:
          country = `ht`;
          break;
        case `hong Kong`:
          country = `hk`;
          break;
        case `hungary`:
          country = `hu`;
          break;
        case `iceland`:
          country = `is`;
          break;
        case `india`:
          country = `in`;
          break;
        case `indonesia`:
          country = `id`;
          break;
        case `iran`:
          country = `ir`;
          break;
        case `iraq`:
          country = `iq`;
          break;
        case `ireland`:
          country = `ie`;
          break;
        case `israel`:
          country = `il`;
          break;
        case `italy`:
          country = `it`;
          break;
        case `jamaica`:
          country = `jm`;
          break;
        case `japan`:
          country = `jp`;
          break;
        case `kazakhstan`:
          country = `kz`;
          break;
        case `kenya`:
          country = `ke`;
          break;
        case `kuwait`:
          country = `kw`;
          break;
        case `kyrgyzstan`:
          country = `kg`;
          break;
        case `laos`:
          country = `la`;
          break;
        case `latvia`:
          country = `lv`;
          break;
        case `lebanon`:
          country = `lb`;
          break;
        case `libya`:
          country = `ly`;
          break;
        case `lithuania`:
          country = `lt`;
          break;
        case `madagascar`:
          country = `mg`;
          break;
        case `malaysia`:
          country = `my`;
          break;
        case `maldives`:
          country = `mv`;
          break;
        case `mexico`:
          country = `mx`;
          break;
        case `mongolia`:
          country = `mn`;
          break;
        case `montenegro`:
          country = `me`;
          break;
        case `morocco`:
          country = `ma`;
          break;
        case `myanmar`:
          country = `mm`;
          break;
        case `namibia`:
          country = `na`;
          break;
        case `nepal`:
          country = `np`;
          break;
        case `netherlands`:
          country = `nl`;
          break;
        case `new zealand`:
          country = `nz`;
          break;
        case `nigeria`:
          country = `ng`;
          break;
        case `north Korea`:
          country = `kp`;
          break;
        case `north macedonia`:
          country = `mk`;
          break;
        case `norway`:
          country = `no`;
          break;
        case `pakistan`:
          country = `pk`;
          break;
        case `panama`:
          country = `pa`;
          break;
        case `paraguay`:
          country = `py`;
          break;
        case `peru`:
          country = `pe`;
          break;
        case `philippines`:
          country = `pl`;
          break;
        case `poland`:
          country = `ad`;
          break;
        case `portugal`:
          country = `pt`;
          break;
        case `puerto Rico`:
          country = `qa`;
          break;
        case `qatar`:
          country = `re`;
          break;
        case `romania`:
          country = `ro`;
          break;
        case `russia`:
          country = `ru`;
          break;
        case `samoa`:
          country = `ws`;
          break;
        case `saudi Arabia`:
          country = `sa`;
          break;
        case `serbia`:
          country = `rs`;
          break;
        case `singapore`:
          country = `sg`;
          break;
        case `slovakia`:
          country = `sk`;
          break;
        case `somalia`:
          country = `so`;
          break;
        case `south africa`:
          country = `za`;
          break;
        case `south korea`:
          country = `kr`;
          break;
        case `spain`:
          country = `es`;
          break;
        case `sri Lanka`:
          country = `lk`;
          break;
        case `sweden`:
          country = `se`;
          break;
        case `switzerland`:
          country = `ch`;
          break;
        case `syria`:
          country = `sy`;
          break;
        case `taiwan`:
          country = `tw`;
          break;
        case `tanzania`:
          country = `tz`;
          break;
        case `thailand`:
          country = `th`;
          break;
        case `turkey`:
          country = `tr`;
          break;
        case `uganda`:
          country = `ug`;
          break;
        case `ukraine`:
          country = `ua`;
          break;
        case `united kingdom`:
          country = `gb`;
          break;
        case `united sates`:
          country = `us`;
          break;
        case `uruguay`:
          country = `uy`;
          break;
        case `uzbekistan`:
          country = `uz`;
          break;
        case `venezuela`:
          country = `ve`;
          break;
        case `vietnam`:
          country = `vn`;
          break;
        case `yemen`:
          country = `ye`;
          break;
        case `zambia`:
          country = `zm`;
          break;
        case `zimbabwe`:
          country = `zw`;
          break;
        default:
          throw { name: "Data not found!" };
          break;
      }

      const result = await axios.get(
        `https://calendarific.com/api/v2/holidays?&api_key=${calkey}&country=${country}&year=${year}`
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

      const streak = nmdayoff.length + +forcednum;
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
      let { goingto, maxdistance } = req.body;
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
      next(error);
    }
  }

  static async findMeTheHotel(req, res, next) {
    try {
      const hokey = process.env.HOTELS_KEY;
      let { strname, star, mgrating, maxprice } = req.body;
      strname = strname.split(" ");
      strname = strname.join("%20");
      const result = await axios.get(
        `https://hotels4.p.rapidapi.com/locations/v2/search?query=${strname}`,
        {
          headers: {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": hokey,
          },
        }
      );
      let ineedthis = "";
      console.log(result.data);

      if (result.data.suggestions[0].entities.length > 0) {
        ineedthis = result.data.suggestions[0].entities[0].destinationId;
      } else if (result.data.suggestions[1].entities.length > 0) {
        ineedthis = result.data.suggestions[1].entities[1].destinationId;
      } else if (result.data.suggestions[2].entities.length > 0) {
        ineedthis = result.data.suggestions[2].entities[2].destinationId;
      } else if (result.data.suggestions[3].entities.length > 0) {
        ineedthis = result.data.suggestions[3].entities[3].destinationId;
      }

      const resultforeal = await axios.get(
        `https://hotels4.p.rapidapi.com/properties/list?destinationId=${ineedthis}&pageNumber=1&pageSize=8&checkIn=2021-01-08&checkOut=2021-01-09&adults1=1&starRatings=${star}&priceMax=${maxprice}&sortOrder=PRICE&currency=USD&guestRatingMin=${mgrating}`,
        {
          headers: {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": hokey,
          },
        }
      );

      res.status(200).json(resultforeal.data.data.body.searchResults.results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
