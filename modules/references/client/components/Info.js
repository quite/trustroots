import React from 'react';
import PropTypes from 'prop-types';
// TODO we can't use the config/config for some reason
import * as config from '@/config/env/default';
import '@/config/lib/i18n';
import { withNamespaces, Trans } from 'react-i18next';

const daysToReply = config.limits.timeToReplyReference.days;

/**
 * @TODO make these elements nicer
 */

function UserLink({ user }) {
  return (<strong><a href={`/profile/${user.username}`}>{user.displayName || user.username}</a></strong>);
}

UserLink.propTypes = {
  user: PropTypes.object.isRequired
};

export const Self = withNamespaces('reference')(function ({ t }) {
  return (<div className="alert alert-warning">{t('Sorry, you can\'t give a reference to yourself.')}</div>);
});

export const Loading = withNamespaces('reference')(function ({ t }) {
  return (<div className="alert alert-warning">{t('Loading')}</div>);
});

export const Duplicate = withNamespaces('reference')(function ({ userTo }) {
  return (<div className="alert alert-warning"><Trans>You&apos;ve already given a reference to <UserLink user={userTo} />.</Trans></div>);
});

Duplicate.propTypes = {
  userTo: PropTypes.object.isRequired
};

export const Submitted = withNamespaces('reference')(function ({ t, isReported, isPublic, userFrom, userTo }) {
  const name = userTo.displayName || userTo.username;

  const isPublicMessage = (isPublic) ?
    (
      <>
      <div><Trans><a href={`/profile/${userTo.username}/references`}>Your reference</a> for <UserLink user={userTo} /> is public now.</Trans></div>
      <div><a href={`/profile/${userFrom.username}/references`}>{t('See the reference from {{name}} to you.', name)}</a></div>
      </>
    ) :
    (
      <div>
        <Trans daysToReply={daysToReply}>Your reference will become public when <UserLink user={userTo} /> gives you a reference back, or in {{ daysToReply }} days.</Trans>
      </div>
    );

  return (
    <div className="alert alert-success">
      <div>{t('Done!')}</div>
      <div>{isPublicMessage}</div>
      {(isReported) ? <div><Trans>Also, <UserLink user={userTo} /> was reported.</Trans></div> : null}
    </div>
  );
});

Submitted.propTypes = {
  userFrom: PropTypes.object.isRequired,
  userTo: PropTypes.object.isRequired,
  isReported: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool.isRequired
};
