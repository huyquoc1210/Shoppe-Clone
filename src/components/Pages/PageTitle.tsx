import config from 'config';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import type { FCC } from 'types/react';

interface Props {
  title?: string;
}

const PageTitle: FCC<Props> = (props) => {
  const { title = config.TITLE, children } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Fragment>
  );
};

export default PageTitle;
