import React from 'react';
import PropTypes from 'prop-types';
import Report from './Report';
import '@/config/lib/i18n';
import { withNamespaces } from 'react-i18next';

function Recommend({ t, reference, report, reportMessage, onChangeRecommend, onChangeReport, onChangeReportMessage }) {

  const { hostedMe, hostedThem } = reference.interactions;
  const maxInteraction = (hostedMe) ? 'hostedMe' : (hostedThem) ? 'hostedThem' : 'met';
  const recommendQuestions = {
    hostedMe: t('Would you recommend others to stay with them?'),
    hostedThem: t('Would you recommend others to host them?'),
    met: t('Would you recommend others to meet them?')
  };
  const question = recommendQuestions[maxInteraction];

  return (
    <div className="panel panel-default">
      <div className="panel-heading" ng-switch="referenceNew.recommendationQuestion" id="recommendationQuestion">
        <h4>{question}</h4>
      </div>
      <div className="panel-body">
        <div className="btn-group"
          role="radiogroup"
          aria-labelledby="recommendationQuestion">
          <label className="btn btn-lg btn-reference-recommend btn-reference-recommend-yes"
            role="radio"
            aria-checked={ reference.recommend === 'yes' }>
            <input
              type="radio"
              name="recommend"
              checked={reference.recommend === 'yes'}
              onChange={() => onChangeRecommend('yes')}
            />
            <span>{t('Yes')}</span>
          </label>
          <label className="btn btn-lg btn-reference-recommend btn-reference-recommend-no"
            role="radio"
            aria-checked={ reference.recommend === 'no' }>
            <input
              type="radio"
              name="recommend"
              checked={reference.recommend === 'no'}
              onChange={() => onChangeRecommend('no')}
            />
            <span>{t('No')}</span>
          </label>
          <label className="btn btn-lg btn-reference-recommend btn-reference-recommend-unknown"
            role="radio"
            aria-checked={reference.recommend === 'unknown' }>
            <input
              type="radio"
              name="recommend"
              checked={reference.recommend === 'unknown'}
              onChange={() => onChangeRecommend('unknown')}
            />
            <span>{t('I don\'t know')}</span>
          </label>
        </div>
        {(!reference.recommend) ?
          <div className="alert alert-warning reference-new-tabs-alert" role="alert" ng-if="!referenceNew.reference.recommend && referenceNew.recommendationWarning">
            Please choose if you can recommend them.
          </div> : null}
        {(reference.recommend === 'no') ?
          <Report
            onChangeReport={onChangeReport}
            onChangeReportMessage={onChangeReportMessage}
            report={report}
            reportMessage={reportMessage}
          /> : null}
      </div>
    </div>
  );
}

Recommend.propTypes = {
  reference: PropTypes.object.isRequired,
  onChangeRecommend: PropTypes.func.isRequired,
  onChangeReport: PropTypes.func.isRequired,
  onChangeReportMessage: PropTypes.func.isRequired,
  report: PropTypes.bool.isRequired,
  reportMessage: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces('reference')(Recommend);
