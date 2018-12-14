import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

/**
 * Navigation is a react component.
 * It can contain three different buttons: Back, Next, Submit. Each of them has a related property onBack, onNext, onSubmit
 *
 */
const Navigation = withNamespaces('reference')(function ({ t, disabled, tab, tabs, tabDone, onBack, onNext, onSubmit }) {
  const back = (
    <button
      type="button"
      className="btn btn-action btn-link"
      aria-label="Previous section"
      onClick={onBack}>
      <span className="icon-left"></span>
      {t('Back')}
    </button>
  );

  const next = (
    <button
      type="button"
      className="btn btn-action btn-primary"
      aria-label="Next section"
      onClick={onNext}
      disabled={tabDone < tab}>
      {t('Next')}
    </button>
  );

  const submit = (
    <button
      className="btn btn-action btn-primary"
      aria-label="Submit reference"
      onClick={onSubmit}
      disabled={tabDone < tabs - 1 || disabled}>
      {t('Submit')}
    </button>
  );

  return (
    <div className="text-center">
      {(tab > 0) ? back : null}
      {(tab < tabs - 1) ? next : null}
      {/* <!-- For the last tab -->*/}
      {(tab === tabs - 1) ? submit : null}
    </div>
  );
});

Navigation.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  tab: PropTypes.number.isRequired, // current tab index - indexed from 0
  tabs: PropTypes.number.isRequired, // amount of tabs to display
  tabDone: PropTypes.number.isRequired // which tab is already filled
};

export default Navigation;
