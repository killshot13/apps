import React, { ReactElement, ReactNode } from 'react';
import OptionsButton from '../buttons/OptionsButton';
import { CardHeader } from './Card';
import SourceButton from './SourceButton';
import { Source } from '../../graphql/sources';
import { ReadArticleButton } from './ReadArticleButton';
import { getGroupedHoverContainer } from './common';

interface CardHeaderProps {
  children?: ReactNode;
  source: Source;
  onMenuClick?: (e: React.MouseEvent) => void;
  onReadArticleClick?: (e: React.MouseEvent) => unknown;
  postLink: string;
  openNewTab?: boolean;
}

const Container = getGroupedHoverContainer('span');

export const PostCardHeader = ({
  onMenuClick,
  onReadArticleClick,
  children,
  source,
  postLink,
  openNewTab,
}: CardHeaderProps): ReactElement => {
  return (
    <CardHeader>
      <SourceButton source={source} />
      {children}
      <Container className="flex flex-row ml-auto">
        <ReadArticleButton
          className="mr-2 btn-primary"
          href={postLink}
          onClick={onReadArticleClick}
          openNewTab={openNewTab}
        />
        <OptionsButton onClick={onMenuClick} tooltipPlacement="top" />
      </Container>
    </CardHeader>
  );
};
