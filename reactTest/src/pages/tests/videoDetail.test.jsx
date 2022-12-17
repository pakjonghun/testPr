import { Route } from 'react-router-dom';
import { withRoute } from '../../tests/utils';
import VideoDetail from '../VideoDetail';
import { videos } from '../../tests/videos';
import { screen, render } from '@testing-library/react';
import ChannelInfo from '../../components/ChannelInfo';
import RelatedVideos from '../../components/RelatedVideos';

jest.mock('../../components/ChannelInfo.jsx');
jest.mock('../../components/RelatedVideos.jsx');

describe('videoDetail', () => {
  beforeEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it('should display state data', () => {
    const { asFragment } = render(
      withRoute(<Route path="/" element={<VideoDetail />} />, [
        {
          state: { video: videos[0] },
          path: '/',
          key: 'fake-key',
        },
      ])
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('스테이트와 데이터가 일치해야 한다.', () => {
    render(
      withRoute(<Route path="/" element={<VideoDetail />} />, [
        {
          state: { video: videos[0] },
          path: '/',
          key: 'fake-key',
        },
      ])
    );

    const { title, description, channelId, channelTitle } = videos[0].snippet;
    screen.getByText(title);
    screen.getByText(description);
    expect(ChannelInfo).toHaveBeenCalledTimes(1);
    expect(RelatedVideos).toBeCalledTimes(1);
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({
      id: videos[0].id,
    });
  });
});
