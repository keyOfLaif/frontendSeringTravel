import React from 'react'
import { Form, FormGroup, Button, Label, Input, Row, Col } from 'reactstrap'

import './payment.css'
const Payment = () => {
  return (
    <div className='frame__payment'>
        <h4>Payment</h4>
        
          <Form>
          <Col>
            <FormGroup>
              <Label for="booking Code">
                Kode
              </Label>
              <Input
                id="bookingCode"
                name="bookingCode"
                placeholder="Kode"
                type="text"
              />
            </FormGroup>

            
            <FormGroup>
              <Label for="exampleFile">
                Bukti Pembayaran
              </Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
              />
            </FormGroup>

            <FormGroup>
              <Label for="paymentStage">Jenis Kelamin</Label>
              <Input
                id="paymentStage"
                name="paymentStage"
                type="select"
                
              >
                  <option>
                    Dp                    
                  </option>
                  <option>
                    Pelunasan                    
                  </option>
              </Input>
            </FormGroup>

          </Col>
          <Col>
          <h4>Detail Pemesan</h4>
          </Col>
          <Button>
              Bayar
            </Button>
          </Form>
        
    </div>
  )
}

export default Payment