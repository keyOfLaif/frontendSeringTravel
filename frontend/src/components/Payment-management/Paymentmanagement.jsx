import React from 'react'
import { Form, FormGroup, Table, Label, Input } from 'reactstrap'

const Paymentmanagement = () => {
  return (
    <section>
        <div className='p-3'>
            <h4>Payment</h4>
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
                    Booking Pict
                </th>
                <th>
                    Pembayaran
                </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">
                    1
                </th>
                <td>
                    Otto
                </td>
                <td>
                <Form>
                    <FormGroup
                    check
                    inline
                    >
                    <Input type="checkbox" />
                    <Label check>
                        DP
                    </Label>
                    </FormGroup>
                    <FormGroup
                    check
                    inline
                    >
                    <Input type="checkbox" />
                    <Label check>
                        Pelunasan
                    </Label>
                    </FormGroup>
                </Form>
                </td>
                </tr>
                
            </tbody>
            </Table>
        </div>
    </section>
  )
}

export default Paymentmanagement