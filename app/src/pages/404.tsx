import { Helmet } from 'react-helmet';

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | 42Stat</title>
      </Helmet>
      404 Not Found
    </>
  );
};
