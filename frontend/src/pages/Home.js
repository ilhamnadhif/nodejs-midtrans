import React, { useState } from "react";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
import Header from "../component/Header";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = (e) => setShow(false);

  const handleForm = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const res = await axios.post("http://localhost:3000/pay", data);
      window.open(res.data.data.redirect_url, "_self");
    } catch (error) {
      console.log(error);
    }
    setShow(false);
  };

  return (
    <div>
      <Header />
      <Container>
        <Col md={6}>
          <form onSubmit={handleForm}>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Total Amount : </label>
              <input
                required
                type="number"
                id="amount"
                onChange={(e) =>
                  setData({ ...data, total_amount: Number(e.target.value) })
                }
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Col>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Masukkan Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePay}>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Firstname : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) =>
                  setData({ ...data, first_name: e.target.value })
                }
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Lastname : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) =>
                  setData({ ...data, last_name: e.target.value })
                }
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Email : </label>
              <input
                type="email"
                required
                id="amount"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Phone : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Address : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">City : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="amount">Postal Code : </label>
              <input
                type="text"
                required
                id="amount"
                onChange={(e) =>
                  setData({ ...data, postal_code: e.target.value })
                }
              />
            </div>
            <button type="submit">Pay</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
