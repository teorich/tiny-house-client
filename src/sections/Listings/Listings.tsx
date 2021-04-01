import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { Listings as ListingsData } from './__generated__/Listings';
import Button from 'antd/es/button';
import { List, Avatar } from 'antd';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import './Listings.css';
// import {
//   ListingsData,
//   DeleteListingData,
//   DeleteListingVariables,
// } from './types';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handledeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => {
        return (
          <List.Item
            actions={[
              <Button
                danger
                type="primary"
                onClick={() => handledeleteListing(listing.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
          </List.Item>
        );
      }}
    />
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Uh Oh! Someething went wrong- please try again later 🔥 </h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress... 🧹 </h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting-please try again later 👄{' '}
    </h4>
  ) : null;

  return (
    <div className="listings">
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
