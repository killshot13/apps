import React, { forwardRef, ReactElement, Ref, useRef, useState } from 'react';
import { Card, CardButton, getPostClassNames } from './Card';
import ActionButtons from './ActionButtons';
import { SharedPostCardHeader } from './SharedPostCardHeader';
import { SharedPostText } from './SharedPostText';
import { SharedPostCardFooter } from './SharedPostCardFooter';
import { Containter, PostCardProps } from './common';
import OptionsButton from '../buttons/OptionsButton';

export const SharePostCard = forwardRef(function SharePostCard(
  {
    post,
    onPostClick,
    onUpvoteClick,
    onCommentClick,
    onBookmarkClick,
    onMenuClick,
    onShare,
    onShareClick,
    openNewTab,
    enableMenu,
    menuOpened,
    className,
    children,
    style,
    insaneMode,
    onReadArticleClick,
    ...props
  }: PostCardProps,
  ref: Ref<HTMLElement>,
): ReactElement {
  const onPostCardClick = () => onPostClick(post);
  const [isSharedPostShort, setSharedPostShort] = useState(true);
  const containerRef = useRef<HTMLDivElement>();
  const onSharedPostTextHeightChange = (height: number) => {
    if (!containerRef.current) {
      return;
    }
    setSharedPostShort(containerRef.current.offsetHeight - height < 40);
  };
  return (
    <Card
      {...props}
      className={getPostClassNames(post, className, 'min-h-[22.5rem]')}
      style={style}
      ref={ref}
    >
      <CardButton title={post.title} onClick={onPostCardClick} />
      <OptionsButton
        className="group-hover:flex laptop:hidden top-2 right-2"
        onClick={(event) => onMenuClick?.(event, post)}
        tooltipPlacement="top"
        position="absolute"
      />
      <SharedPostCardHeader
        author={post.author}
        source={post.source}
        createdAt={post.createdAt}
      />
      <SharedPostText
        title={post.title}
        onHeightChange={onSharedPostTextHeightChange}
      />
      <Containter ref={containerRef}>
        <SharedPostCardFooter
          sharedPost={post.sharedPost}
          isShort={isSharedPostShort}
        />
        <ActionButtons
          openNewTab={openNewTab}
          post={post}
          onUpvoteClick={onUpvoteClick}
          onCommentClick={onCommentClick}
          onBookmarkClick={onBookmarkClick}
          onShare={onShare}
          onShareClick={onShareClick}
          onMenuClick={(event) => onMenuClick?.(event, post)}
          onReadArticleClick={onReadArticleClick}
          className="justify-between mx-4"
        />
      </Containter>
      {children}
    </Card>
  );
});
