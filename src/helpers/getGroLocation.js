import configs from "../../configs";

export const getGeoLocation = async (address) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${configs.GOOGLE_API_KEY}`
      )
        .then(async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            if (data.results.length === 0 || !data.results[0].geometry) {
              reject(new Error("Address not found"));
            }

            const { lat, lng } = data.results[0].geometry.location;
            const formatted_address = data.results[0].formatted_address;
            resolve({
              coords: {
                lat,
                lng,
              },
              formatted_address,
            });
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
