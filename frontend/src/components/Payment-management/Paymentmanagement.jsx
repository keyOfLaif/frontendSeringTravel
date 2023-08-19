import React, {useEffect, useState} from 'react'
import { Form, FormGroup, Table, Label, Input } from 'reactstrap'

import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'
import './details__booking.css'
import ImagePrev from '../ImagePreviewComp/ImagePrev'


const Paymentmanagement = () => {

    // const [payments, setPayments] = useState([]);
    const [dpState, setDpState] = useState({});
    const [fullPaymentState, setFullPaymentState] = useState({});

    const {
        data:bookings, 
        loading, 
        error,
      } = useFetch(`${BASE_URL}/bookings`)

    const handleDpCheckboxChange = async (e, payment) => {
        const { checked } = e.target;
        try {
          await fetch(`${BASE_URL}/bookings/${payment._id}/dp`, { 
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({value: checked.toString()}) });

            // Update the dpState for the clicked payment
            setDpState((prevDpState) => ({
                ...prevDpState,
                [payment._id]: checked,
            }));
        } catch (error) {
          console.error('Error updating dp:', error);
        }
      };
    
      const handleFullPaymentCheckboxChange = async (e, payment) => {
        const { checked } = e.target;
        try {
          await fetch(`${BASE_URL}/bookings/${payment._id}/fullPayment`, { 
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({value: checked.toString()}) });

            // Update the fullPaymentState for the clicked payment
            setFullPaymentState((prevFullPaymentState) => ({
                ...prevFullPaymentState,
                [payment._id]: checked,
            }));
        } catch (error) {
          console.error('Error updating fullPayment:', error);
        }
      };

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
                        Pemesan
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
                        {   
                            booking.participants.length !== 0 &&
                            booking.participants[0].participantName} Bukti Pembayaran "{booking.paymentProofs.fullPayment
                        }"
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
                            checked={dpState[booking._id] || false}
                            onChange={(e) => handleDpCheckboxChange(e, booking)}
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
                            checked={fullPaymentState[booking._id] || false}
                            onChange={(e) => handleFullPaymentCheckboxChange(e, booking)}
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