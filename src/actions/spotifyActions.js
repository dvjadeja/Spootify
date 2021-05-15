import axios from 'axios';
import config from '../config';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getSpotifyAuthToken = async () => {
    try {

        const base64Secret = btoa(`${config.api.clientId}:${config.api.clientSecret}`); 

        console.log('secret', base64Secret, config.api.authUrl );

        const params = new URLSearchParams();

        params.append('grant_type','client_credentials');

        const response = await axios.post(config.api.authUrl, params, { 
                headers: { 
                    'Authorization': `Basic ${base64Secret}`,
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            });

        console.log('login token ::', response.data.access_token);

        setAuthToken(response.data.access_token);

    } catch (error) {
        console.log(error);
    }
}

export const getNewReleases = async () => {
    try {
        const response = await axios.get('/browse/new-releases', {
            baseURL: config.api.baseUrl
        });
        console.log('new releases', response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getFeaturedPlaylist = async () => {
    try {
        const response = await axios.get('/browse/featured-playlists', {
            baseURL: config.api.baseUrl
        });
        console.log('featured playlist', response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get('/browse/categories', {
            baseURL: config.api.baseUrl
        });
        console.log('categoriest', response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}