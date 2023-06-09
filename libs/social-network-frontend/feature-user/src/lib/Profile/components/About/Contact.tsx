import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBIcon, MDBToast } from 'mdb-react-ui-kit';
import AddAddress from './Address/AddAddress';
import { Profile, useGetProfileForUserQuery } from '@sn-htc/social-network-frontend/data-access-user';
import EditAddress from './Address/EditAddress';
import AddPhone from './Phone/AddPhone';
import EditPhone from './Phone/EditPhone';

interface ContactProps {
  currentUserId: string;
  userId: string;
  profile: Profile;
}

const Contact = (props: ContactProps) => {
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const { refetch } = useGetProfileForUserQuery({
    userId: props.userId
  });

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  }, [showErrorToast]);

  const updateProfile = () => {
    refetch();
  };

  return (
    <>
      <MDBContainer className='ps-2 pb-1 pe-2'>
        <h6 className='mb-3 about-content-header'>Living Location</h6>
        {props.currentUserId === props.userId && !props.profile.address &&
          <AddAddress
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !props.profile.address &&
          <div className='d-flex align-items-center ps-2 pb-1'>
            <div style={{ width: '30px' }}>
              <MDBIcon fas icon='home' />
            </div>
            <div className='d-flex flex-column justify-content-center flex-grow-1'>
              <p className='m-0'>No address to show</p>
            </div>
          </div>
        }

        {props.profile.address &&
          <EditAddress
            currentUserId={props.currentUserId}
            userId={props.userId}
            address={props.profile.address}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
      </MDBContainer>
      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mb-3 about-content-header'>Phone Number</h6>
        {props.currentUserId === props.userId && !props.profile.phoneNumber &&
          <AddPhone
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !props.profile.phoneNumber &&
          <div className='d-flex align-items-center ps-2 pb-1'>
            <div style={{ width: '30px' }}>
              <MDBIcon fas icon='phone-alt' />
            </div>
            <div className='d-flex flex-column flex-grow-1'>
              <p className='m-0'>No phone number to show</p>
            </div>
          </div>
        }

        {props.profile.phoneNumber &&
        <EditPhone
          currentUserId={props.currentUserId}
          userId={props.userId}
          phone={props.profile.phoneNumber}
          updateProfile={updateProfile}
          showToast={() => setShowErrorToast(true)}
        />
        }
      </MDBContainer>
      <MDBToast
        color='danger'
        show={showErrorToast}
        autohide
        position='top-right'
        delay={3000}
        appendToBody
        headerContent={
          <>
            <strong className='me-auto'>Error!</strong>
          </>
        }
        bodyContent='An error occurred. Please retry'
      />
    </>
  );
};

export default Contact;
