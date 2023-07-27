import React from 'react'
import { Form, FormGroup, Button, Label, Input, Row, Col } from 'reactstrap'
const Payment = () => {
  return (
    <div>
        <h4>Payment</h4>
        <Row>
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

          </Col>
          <Col>
          <h4>Detail Pemesan</h4>
          </Col>
          <Button>
              Bayar
            </Button>
          </Form>
        </Row>
    </div>
  )
}

export default Payment