import axios from 'axios';

const coordinateService = {
  getAdressCoordinate: async (adresse:string) => {
    let error;
    let latitude;
    let longitude;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: adresse,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'node.js'
        }
      });

      const data = response.data;
      if (data.length > 0) {
        longitude = parseFloat(data[0].lon);  
        latitude = parseFloat(data[0].lat);
      } else {
        // Fallback coordinates (Tour Eiffel)
        longitude = 2.294492;
        latitude = 48.858384;
      }
    } catch (err) {
      error = "Erreur lors de la récupération des coordonnées";
    }

    return {
      error,
      longitude,
      latitude  
    };
  }
};

export default coordinateService;
