import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContext, withRoute } from '../../tests/utils';
import Videos from '../Videos';
import { videos } from '../../tests/videos';

const jestFn = jest.fn();

const youtube = {
  search: jestFn,
};

describe('video', () => {
  afterEach(() => jestFn.mockReset());
  it('render correctly', async () => {
    jestFn.mockImplementation(() => videos);

    const { asFragment } = render(
      withAllContext(withRoute(<Route path="/" element={<Videos />} />), {
        youtube,
      })
    );
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('error', async () => {
    jestFn.mockImplementation(() => {
      throw new Error('error');
    });

    render(
      withAllContext(withRoute(<Route path="/" element={<Videos />} />), {
        youtube,
      })
    );
    const err = 'Something is wrong 😖';

    await screen.findByText(err);
  });

  it('have video', async () => {
    const keyword = 'keyword';

    jestFn.mockImplementation(() => videos);

    render(
      withAllContext(
        withRoute(
          <>
            <Route path="/:keyword" element={<Videos />} />
          </>,
          [`/${keyword}`]
        ),
        { youtube }
      )
    );

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    expect(jestFn).toBeCalledWith(keyword);

    videos.forEach((video) => {
      const url = video.snippet.thumbnails.medium.url;
      expect(screen.getByRole('img')).toHaveAttribute('src', url);
    });
  });
});
