import React from 'react'
import PropTypes from "prop-types";
import AlbumList from './component/AlbumList/index'

AlbumFeature.propTypes = {
  todoList: PropTypes.array,
};

AlbumFeature.defaultProps = {
};

function AlbumFeature(props) {

    const albumList = [
        {
            id: 1,
            name: 'nhac1',
            thumbnailUrl: 'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d'
        },
        {
            id: 2,
            name: 'nhac2',
            thumbnailUrl: 'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d'
        },
        {
            id: 3,
            name: 'nhac3',
            thumbnailUrl: 'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d'
        },
    ];
    return (
      <div>
        <h2>You may like</h2>
        <AlbumList albumList={albumList}/>
      </div>
    );
  }

export default AlbumFeature;
