
import cheerio from 'cheerio';

export const fetchAPI = async (url) => {
    const prefixUrl = "https://api.allorigins.win/raw?url=";
    try {
      const response = await fetch(prefixUrl + url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const html = await response.text();
  
      const $ = cheerio.load(html);
      const payloadText = $('#payload').text();
      const payloadJSON = JSON.parse(payloadText);
  
      return payloadJSON;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  };
