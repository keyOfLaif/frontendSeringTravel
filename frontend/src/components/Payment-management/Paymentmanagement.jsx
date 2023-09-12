import React, {useEffect, useState} from 'react'
import { Form, FormGroup, Table, Label, Input } from 'reactstrap'

import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'
import './details__booking.css'
import ImagePrev from '../ImagePreviewComp/ImagePrev'


const Paymentmanagement = () => {

    const {
        data:bookings, 
        loading, 
        error,
      } = useFetch(`${BASE_URL}/bookings`)

    const [checkboxState, setCheckboxState] = useState({});

    useEffect(() => {
        if (bookings) {
            const newState = {};
            bookings.forEach((booking) => {
                newState[booking._id] = {
                    dp: booking.dp,
                    fullPayment: booking.fullPayment,
                };
            });
            setCheckboxState(newState);
        }
    }, [bookings]);

    const updateCheckboxState = (bookingId, type, checked) => {
        setCheckboxState((prevState) => ({
            ...prevState,
            [bookingId]: {
                ...prevState[bookingId],
                [type]: checked,
            },
        }));
    };

    const handleCheckboxChange = async (e, bookingId, type) => {
        const { checked } = e.target;
        try {
            const response = await fetch(`${BASE_URL}/bookings/${bookingId}/${type}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ value: checked }),
            });
            updateCheckboxState(bookingId, type, checked);
            return alert(response.message)
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    // const handleDpCheckboxChange = async (e, payment) => {
    //     const { checked } = e.target;
    //     try {
    //       await fetch(`${BASE_URL}/bookings/${payment}/dp`, { 
    //         method: 'PUT',
    //         headers:{
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({value: checked}) });

    //     } catch (error) {
    //       console.error('Error updating dp:', error);
    //     }
    //   };
    
    //   const handleFullPaymentCheckboxChange = async (e, payment) => {
    //     const { checked } = e.target;
    //     try {
    //       await fetch(`${BASE_URL}/bookings/${payment._id}/fullPayment`, { 
    //         method: 'PUT',
    //         headers:{
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({value: checked}) });

    //     } catch (error) {
    //       console.error('Error updating fullPayment:', error);
    //     }
    //   };

        const [showImage, setShowImage] = useState(false);
        const [imageBeingPrev, setImageBeingPrev] = useState(null);


        const handleImagePrev = (image) => {
            setImageBeingPrev(image);
            setShowImage(true);
        };

        const handleCloseImagePrev = () =>{
            setImageBeingPrev(null);
            setShowImage(false);
        }

  return (<>
    {
        showImage && 
            <ImagePrev imageUrl={`/paymentProofs/${imageBeingPrev}`}
            onClose={handleCloseImagePrev}
            />
    }
    <div className='booking__outer'>
        <div className='booking__frame'>
            <div className='booking__lists'>
                <h4>Konfirmasi Pembayaran</h4>
                <Table
                bordered
                hover
                responsive
                >
                <thead>
                    <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Bukti Pembayaran
                    </th>
                    <th>
                        Pembayaran
                    </th>
                    </tr>
                </thead>
                <tbody>
                {
                    bookings.map((booking, index) =>
                    <tr key={booking._id}>
                    <th scope="row">
                        {/* {   
                            booking.participants.length !== 0 &&
                            booking.participants[0].participantName} Bukti Pembayaran "{booking.paymentProofs.fullPayment
                        }" */}
                        {
                            booking._id
                        }
                    </th>
                    <th scope="row">
                        {
                            <div onClick={() => {
                                console.log("Clicked on dp image, imageBeingPrev:", booking.paymentProofs.dp);
                                handleImagePrev(booking.paymentProofs.dp);
                            }}>1. Dp</div>
                        } 
                        {
                            <div onClick={()=>handleImagePrev(booking.paymentProofs.fullPayment)}>
                                2. Pelunasan
                            </div>
                        } 
                    </th>
                    <td>
                    <Form>
                        <FormGroup
                        check
                        inline
                        >
                        <Input 
                            type="checkbox" 
                            name="dp"
                            checked={checkboxState[booking._id]?.dp || false}
                            onChange={(e) => handleCheckboxChange(e, booking._id, 'dp')}
                        />
                        <Label check>
                            DP
                        </Label>
                        </FormGroup>

                        <FormGroup
                        check
                        inline
                        >
                        <Input 
                            type="checkbox"
                            name="fullPayment"
                            checked={checkboxState[booking._id]?.fullPayment || false}
                            onChange={(e) => handleCheckboxChange(e, booking._id, 'fullPayment')}
                        />
                        <Label check>
                            Pelunasan
                        </Label>
                        </FormGroup>
                    </Form>
                    </td>
                    </tr>
                    )
                }
                    
                </tbody>
                </Table>
            </div>
            
        </div>
    </div>
  </>)
}

export default Paymentmanagement