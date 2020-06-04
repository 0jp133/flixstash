import React from 'react';
import { IMovieOverview } from 'flixstash-common/types';

import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { LayoutOption } from './LayoutOption';

interface IComponentProps {
  /**
   * An array of movies overview to display.
   */
  movies: IMovieOverview[];

  /**
   * Option that defines what layout type to use.
   */
  option: LayoutOption;
}

export const Layout: React.FC<IComponentProps> = (props) => {
  const { movies, option } = props;

  if (option === LayoutOption.Grid) {
    return <GridLayout movies={movies} />;
  } else if (option === LayoutOption.List) {
    return <ListLayout movies={movies} />;
  } else {
    return null;
  }
};
