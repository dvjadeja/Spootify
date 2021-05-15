import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { getSpotifyAuthToken, getNewReleases, getFeaturedPlaylist, getCategories } from '../../../actions/spotifyActions'

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentWillMount() {

    await getSpotifyAuthToken();

    const result = await Promise.all([getNewReleases(), getFeaturedPlaylist(), getCategories()]);

    const newReleases = result[0] || []; 
    const featuredPlaylist = result[1] || []; 
    const categories = result[2] || []; 

    this.setState({
      newReleases: newReleases.albums.items,
      playlists: featuredPlaylist.playlists.items,
      categories: categories.categories.items,
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    console.log('here>>>', newReleases);
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
