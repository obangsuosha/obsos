/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { collectionApi, seasonApi } from '../../api';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import { Helmet } from 'react-helmet';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: calc(100vh-50px);
    width: 100vw;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) =>
        `https://image.tmdb.org/t/p/original${props.bdUrl}`});
    background-position: center center;
    background-size: cover;
    filter: blur(1.5px);
    opacity: 0.5;
    z-index: -2;
`;
const Content = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;
`;
const CoverContainer = styled.div``;
const Cover = styled.div`
    display: block;
    position: fixed;
    top: 70px;
    left: 30px;
    height: 450px;
    width: 300px;
    background-image: url(${(props) => props.poUrl});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 1200px;
    height: 700px;
    margin-left: 350px;
`;

const Title = styled.span`
    font-size: 50px;
    font-weight: 600;
    color: white;
`;

const ItemContainer = styled.div`
    display: flex;
`;

const Item = styled.span`
    display: flex;
    align-items: center;
`;

const Divider = styled.div`
    margin: 0px 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.9;
    line-height: 1.5;
    width: 80%;
`;

const Contents = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    overflow: auto;
`;

const ContentCover = styled.div`
    height: 180px;
    width: 120px;
    background-image: url(${(props) => props.profile});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const ContentCoverH = styled.div`
    height: 140px;
    width: 210px;
    background-image: url(${(props) => props.profile});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const CTContainer = styled.div`
    width: 700px;
`;

const ContentName = styled.div`
    font-size: 18px;
    height: 18px;
    margin: 10px 0px;
    padding: 0px;
`;

const ContentOverview = styled.div`
    font-size: 12px;
    height: 18px;
    margin: 0px;
    padding: 0px;
`;

const ContentContainer = styled.div`
    &:hover {
        ${ContentCover} {
            opacity: 0.5;
        }
    }
    display: flex;
`;

export default (props) => {
    const {
        location: { pathname },
        match: {
            params: { id, number },
        },
        history: { push },
    } = props;
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isCollection = pathname.includes('/collection');

    const viewDetail = async () => {
        const parsedId = parseInt(id);
        const parsedNumber = parseInt(number);
        if (isNaN(parsedId)) {
            return push('/');
        }

        let result = null;

        try {
            if (isCollection) {
                console.log(isCollection);
                const request = await collectionApi.detail(parsedId);
                result = request;
            } else {
                console.log(isCollection);
                const request = await seasonApi.detail(parsedId, parsedNumber);
                console.log(request);
                result = request;
            }
        } catch {
            setError("Can't find anything.");
        } finally {
            setResult(result);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        viewDetail();
    }, [id]);

    return loading ? (
        <Loader>
            <title>Detail | OBSOS</title>
        </Loader>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {`${
                        result != null &&
                        (result.data.title != null
                            ? result.data.title
                            : result.data.name)
                    }`}
                </title>
            </Helmet>
            <Backdrop bdUrl={result != null && result.data.backdrop_path} />
            {error ? <Message text={error} color="tomato" /> : null}
            <Content>
                <CoverContainer>
                    <Cover
                        poUrl={
                            result != null && result.data.poster_path != null
                                ? `https://image.tmdb.org/t/p/w300${result.data.poster_path}`
                                : 'data:image/png;base64,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'
                        }
                    />
                </CoverContainer>
                <Data>
                    <Title>
                        {result != null &&
                            (result.data.title != null
                                ? result.data.title
                                : result.data.name != null
                                ? result.data.name
                                : null)}
                    </Title>

                    <Overview>
                        {result != null &&
                            result.data != null &&
                            (result.data.overview != null
                                ? result.data.overview
                                : null)}
                    </Overview>
                    <Contents>
                        {result != null &&
                        result.data != null &&
                        result.data.parts != null
                            ? result.data.parts.map((content) => {
                                  return (
                                      <Link
                                          to={
                                              content.title != null
                                                  ? `/movie/${content.id}`
                                                  : `/show/${content.id}`
                                          }
                                      >
                                          <ContentContainer>
                                              <ContentCover
                                                  profile={
                                                      content.poster_path !=
                                                      null
                                                          ? `https://image.tmdb.org/t/p/w200${content.poster_path}`
                                                          : 'data:image/png;base64,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'
                                                  }
                                              />
                                              <CTContainer>
                                                  <ContentName>
                                                      {content.name != null
                                                          ? content.name
                                                          : null}
                                                      {content.title != null
                                                          ? content.title
                                                          : null}
                                                  </ContentName>
                                                  <ItemContainer>
                                                      <Item>
                                                          {content != null &&
                                                              (content.release_date !=
                                                              null
                                                                  ? content.release_date.substring(
                                                                        0,
                                                                        4
                                                                    )
                                                                  : content.first_air_date !=
                                                                    null
                                                                  ? content.first_air_date.substring(
                                                                        0,
                                                                        4
                                                                    )
                                                                  : 'Not yet')}
                                                      </Item>

                                                      <Divider>|</Divider>
                                                      <Item>
                                                          <Rating
                                                              value={
                                                                  content.vote_average
                                                              }
                                                              max={10}
                                                              precision={0.1}
                                                              readOnly
                                                              size="small"
                                                          />
                                                          &nbsp;
                                                          {content != null &&
                                                              (content.vote_average !=
                                                              null
                                                                  ? content.vote_average
                                                                  : null)}
                                                          &nbsp;/ 10
                                                      </Item>
                                                  </ItemContainer>
                                                  <ContentOverview>
                                                      {content.overview != null
                                                          ? content.overview
                                                          : null}
                                                  </ContentOverview>
                                              </CTContainer>
                                          </ContentContainer>
                                      </Link>
                                  );
                              })
                            : null}
                        {result != null &&
                        result.data != null &&
                        result.data.episodes != null
                            ? result.data.episodes.map((content) => {
                                  return (
                                      <ContentContainer>
                                          <ContentCoverH
                                              profile={
                                                  content.still_path != null
                                                      ? `https://image.tmdb.org/t/p/w200${content.still_path}`
                                                      : 'data:image/png;base64,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'
                                              }
                                          />
                                          <CTContainer>
                                              <ContentName>
                                                  {content.name != null
                                                      ? content.name
                                                      : null}
                                                  {content.title != null
                                                      ? content.title
                                                      : null}
                                              </ContentName>
                                              <ItemContainer>
                                                  <Item>
                                                      {content != null &&
                                                          (content.release_date !=
                                                          null
                                                              ? content.release_date.substring(
                                                                    0,
                                                                    4
                                                                )
                                                              : content.air_date !=
                                                                null
                                                              ? content.air_date
                                                              : 'Not yet')}
                                                  </Item>

                                                  <Divider>|</Divider>
                                                  <Item>
                                                      <Rating
                                                          value={
                                                              content.vote_average
                                                          }
                                                          max={10}
                                                          precision={0.1}
                                                          readOnly
                                                          size="small"
                                                      />
                                                      &nbsp;
                                                      {content != null &&
                                                          (content.vote_average !=
                                                          null
                                                              ? content.vote_average
                                                              : null)}
                                                      &nbsp;/ 10
                                                  </Item>
                                              </ItemContainer>
                                              <ContentOverview>
                                                  {content.overview != null
                                                      ? content.overview
                                                      : null}
                                              </ContentOverview>
                                          </CTContainer>
                                      </ContentContainer>
                                  );
                              })
                            : null}
                    </Contents>
                </Data>
            </Content>
        </Container>
    );
};
