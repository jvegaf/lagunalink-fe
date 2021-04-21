import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import { Row, Item } from '@mui-treasury/components/flex';
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from '@mui-treasury/components/info';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  info: {
    flexGrow: 1
  }
}))

export const JobListItem = props => {
  const styles = useStyles()
  const {company, thumbnail, position, createdAt} = props
  const avatarStyles = useDynamicAvatarStyles({
    height: 56,
    width: 64,
    radius: 8,
  });
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
      </NoSsr>
      <Row gap={3} className={styles.root}>
        <Item>
          <Avatar
            variant={'rounded'}
            classes={avatarStyles}
            src={thumbnail}
          />
        </Item>
        <Info className={styles.info} useStyles={usePopularInfoStyles}>
          <InfoSubtitle>{company}</InfoSubtitle>
          <InfoTitle>{position}</InfoTitle>
          <InfoCaption>{createdAt}</InfoCaption>
        </Info>
      </Row>
    </>
  )
};