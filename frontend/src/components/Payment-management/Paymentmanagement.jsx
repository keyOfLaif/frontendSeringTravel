import React, {useEffect, useState} from 'react'
import { Form, FormGroup, Table, Label, Input } from 'reactstrap'

import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'

const Paymentmanagement = () => {


    // const [payments, setPayments] = useState([]);
    const [dpState, setDpState] = useState({});
    const [fullPaymentState, setFullPaymentState] = useState({});

    const {
        data:payments, 
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
        //   setPayments((prevPayments) =>
        //     prevPayments.map((p) =>
        //       p._id === payment._id ? { ...p, dp: checked } : p
        //     )
        //   );
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
            
        //   setPayments((prevPayments) =>
        //     prevPayments.map((p) =>
        //       p._id === payment._id ? { ...p, fullPayment: checked } : p
        //     )
        //   );
        } catch (error) {
          console.error('Error updating fullPayment:', error);
        }
      };

  return (
    <div className='p-3'>
        <h4>Konfirmasi Pembayaran</h4>
        <Table
        bordered
        hover
        responsive
        >
        <thead>
            <tr>
            <th>
                Booking Code
            </th>
            <th>
                Pembayaran
            </th>
            </tr>
        </thead>
        <tbody>
        {
            payments.map((payment, index) =>
            <tr key={payment._id}>
            <th scope="row">
                {payment.noBooking}
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
                    checked={dpState[payment._id] || false}
                    onChange={(e) => handleDpCheckboxChange(e, payment)}
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
                    checked={fullPaymentState[payment._id] || false}
                    onChange={(e) => handleFullPaymentCheckboxChange(e, payment)}
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
  )
}

export default Paymentmanagement