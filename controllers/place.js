const { default: axios } = require('axios');

const TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const PHOTO_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const CACHE = require('../helpers/cache')();

module.exports = {
  async searchPlaces(req, res, next) {
    try {
      let locationKey = 'default';

      if (req.query.location) {
        locationKey = req.query.location.split(',')
          .map(v => Math.round(v * 100) / 100)
          .join(',');
      }

      const cacheKey = `${locationKey}.${req.query.name}`;
      const cachedResult = CACHE.get(cacheKey);

      if (cachedResult) {
        return res.json(cachedResult);
      }

      const params = {
        key: process.env.GPLACES_API_KEY,
        query: req.query.name,
        location: '-6.170280329097068,106.8240104937367'
      };

      if (req.query.location) {
        params.location = req.query.location;
      }

      const { data } = await axios.get(TEXT_SEARCH_URL, { params });

      CACHE.set(cacheKey, data.results);

      res.json(data.results);
    } catch(err) {
      next(err);
    }
  },

  async getPhoto(req, res, next) {
    try {
      const response = await axios.get(PHOTO_URL, {
        params: {
          maxwidth: 250,
          maxheight: 250,
          key: process.env.GPLACES_API_KEY,
          photo_reference: req.query.ref
        },
        responseType: 'arraybuffer'
      });

      res.set('Content-Type', 'image/jpeg');
      res.end(Buffer.from(response.data, 'binary'));
    } catch(err) {
      next(err);
    }
  },

  async getPlaceDetail(req, res, next) {
    try {
      const { data } = await axios.get(PLACE_DETAIL_URL, {
        params: {
          place_id: req.params.id,
          fields: 'photos,name,formatted_address,icon',
          key: process.env.GPLACES_API_KEY
        }
      });

      res.json(data.result);
    } catch(err) {
      next(err);
    }
  }
}
