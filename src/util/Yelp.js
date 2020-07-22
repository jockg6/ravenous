/*------------------------------------------------------------------------------------------------------------------------------
Client ID
vDhtihoPRZfGgZ0H5g2FMQ

API Key
3A-316ey_V1o2GrISDj4Q9C0G5Hdf4pnnPOK2th9FrfcFoYrYCz0xlOm7Qi5Z5Nz2eDgCcKXNPKFm38McdF0b3UEHi38NMxvXTwg08Hf4bp0so30cj_QkvqpOPcXX3Yx

------------------------------------------------------------------------------------------------------------------------------*/

const apiKey = '3A-316ey_V1o2GrISDj4Q9C0G5Hdf4pnnPOK2th9FrfcFoYrYCz0xlOm7Qi5Z5Nz2eDgCcKXNPKFm38McdF0b3UEHi38NMxvXTwg08Hf4bp0so30cj_QkvqpOPcXX3Yx';

const Yelp = {
  search(term, location, sortBy) {
    const path = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    const corsPath = `https://cors-anywhere.herokuapp.com/${path}`; //use "CORS Anywhere" API, to give our Yelp API request CORS permissions 
    const browHdr = { headers: { Authorization: `Bearer ${apiKey}` } }; //browser header to gain authorization to access Yelp API
    
    return fetch(corsPath, browHdr)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(JSON.stringify(jsonResponse));

        if (jsonResponse.hasOwnProperty('businesses')) {
          return jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            };
          });
        } else {
          console.log('ERROR: "businesses" property not found in "jsonResponse" object');
          console.log(JSON.stringify(jsonResponse));
        }
      });
  }
};


export default Yelp;
