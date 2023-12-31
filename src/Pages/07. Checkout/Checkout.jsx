import { useContext, useState } from "react";
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom";

import "./Checkout.css";
import { Header } from "../../Components/01. Header/Header";
import {Footer} from "../../Components/02. Footer/Footer";
import { BookContext } from "../../Context/BookContext";
import {AddressContext} from "../../Context/AddressContext";
import { OrderContext } from "../../Context/OrderContext";

export const Checkout = () => {
  const {state, dispatch} = useContext(BookContext);
  const { orderDispatch} = useContext(OrderContext);
  const {addressState, addressDispatch} = useContext(AddressContext);
  const [addressModal, setAddressModal] = useState(false);

  const checkClearCart = async () => {
    try {
      const response = await fetch("/api/user/cart/clearCart", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      dispatch({type: "CLEAR_CART"});
      return await response.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  }

  const totalItem = state.cart.reduce(((acc,cur) => acc + cur.qty),0);
  const totalCost = Math.round(state.cart.reduce(((acc,cur) => acc + cur.qty * cur.price),0));
  const totalDiscount = Math.round(totalCost * 0.2);
  const totalCouponDiscount = (totalCost - totalDiscount) * Number(state.selectedCoupons.slice(0,2))/100;
  const totalAmount = (totalCost - totalDiscount) - totalCouponDiscount;

  // razorpay integration
  const info = JSON.parse(localStorage.getItem("info"));
  const navigate = useNavigate();

  const checkoutBtn = () => {
    var option={
      key:"rzp_test_mmDucLcvrE3oC1",
      key_secret:"KOKFhYScRVHEo45WTMo5RS2G",
      amount: totalCost*100*82,
      currency:'INR',
      name:"BookBazaar",
      description:"Checkout for Merch",
      handler:function(response){
      navigate("/order/summary");
      checkClearCart();
      },
      prefill:{
        name: `${info.firstName} ${info.lastName}`,
        email: `${info.email}`,
        contact: `${addressState.currentAddress.mobileNo}`,
      },
      notes:{
        address:"Razorpay Corporate Office"
      },
      theme:{
        color:"#f0f0f0",
      },
  };
  var pay=new window.Razorpay(option);
  orderDispatch({type: "ADD", payload1: state.cart, payload2: pay.id, payload3: totalAmount, payload4: addressState.currentAddress});
  pay.open();
  }

  return <div>
    <Header/>
    <h1 className="checkout-header">Checkout</h1>
    <div className="checkout-container">
      <div className="checkout-address">
        <button className="add-address" onClick={() => setAddressModal(true)}>Add New Address</button>
        <Modal className="address-modal" isOpen={addressModal}>
          <h3 className="modal-header">Add New Address</h3>
          <div className="modal-input">
            <input value={addressState.name} onChange={(e) => addressDispatch({type: "NAME", payload: e.target.value})} placeholder="Enter Name" />
            <input value={addressState.houseNo} onChange={(e) => addressDispatch({type: "HOUSE", payload: e.target.value})} placeholder="Enter House no. , Road , Colony" />
            <input value={addressState.city} onChange={(e) => addressDispatch({type: "CITY", payload: e.target.value})} placeholder="Enter City" />
            <input value={addressState.state} onChange={(e) => addressDispatch({type: "STATE", payload: e.target.value})} placeholder="Enter State" />
            <input value={addressState.country} onChange={(e) => addressDispatch({type: "COUNTRY", payload: e.target.value})} placeholder="Enter Country" />
            <input value={addressState.postalCode} onChange={(e) => addressDispatch({type: "POSTAL", payload: e.target.value})} placeholder="Enter Postal Code" />
            <input value={addressState.mobileNo} onChange={(e) => addressDispatch({type: "MOBILE", payload: e.target.value})} placeholder="Enter Mobile Number" />
          </div>
          <div className="modal-btn">
            <button className="btn-add" onClick={() => {setAddressModal(false); addressDispatch({type: "ADD", payload: {
              name : addressState.name,
              houseNo: addressState.houseNo,
              city: addressState.city,
              state: addressState.state,
              country: addressState.country,
              postalCode : addressState.postalCode,
              mobileNo: addressState.mobileNo
            }})}}>Add</button>
            <button className="btn-cancel" onClick={() => {setAddressModal(false); addressDispatch({type: "RESET"})}}>Cancel</button>
            <button className="btn-data" onClick={() => {addressDispatch({type: "DUMMY_DATA"})}}>Add Dummy Data</button>
          </div>
        </Modal>
        <div className="address-container">
          {
            addressState.address.length !==0 && addressState.address.map(item => <label className="each-address" key={item._id}>
              <div className="address-top">
                <input type="radio" checked={addressState.currentAddress._id === item._id} onChange={(e) => addressDispatch({type: "CHANGE_ADDRESS", payload: e.target.value})} value={item._id} />
                <div>{item.name}</div>
              </div>
              <div className="address-bottom">
                <div>{item.houseNo}</div>
                <div>{item.city}, {item.state}, {item.postalCode}</div>
                <div>{item.country}</div>
                <div>Phone Number - {item.mobileNo}</div>
              </div>
            </label>)
          }
        </div>
      </div>
      <div className="checkout-detail">
        <div className="detail-container">
          <hr/>
          <div className="checkout-order">ORDER DETAILS</div>
          <hr/>
          <div className="checkout-items">
            <div>Item</div>
            <div>Qty</div>
          </div>
          <div>
            {
              state.cart.map(item => <div className="checkout-item">
                <div>{item.title}</div>
                <div>{item.qty}</div>
              </div>)
            }
          </div>
          <hr className="checkout-hr"/>
          <div className="checkout-order">PRICE DETAILS</div>
          <hr className="checkout-hr-down"/>
          <div>
            <div className="desc">
              <div>Price ({totalItem} item)</div>
              <div>${totalCost}</div>
            </div>
            <div className="desc">
              <div>Discount</div>
              <div>-${totalDiscount}</div>
            </div>
            <div className="desc">
              <div>Delivery Charges</div>
              <div>FREE</div>
            </div>
            <div className="desc">
              <div>Coupon Discount</div>
              <div>-${state.selectedCoupons ? totalCouponDiscount : 0.00}</div>
            </div>
            <br/>
            <div className="desc total-amount">
              <div>Total Amount</div>
              <div>${totalAmount}</div>
            </div>
          </div>
          {
            Object.keys(addressState.currentAddress).length !== 0 && <div>
              <hr className="checkout-hr"/>
              <div className="checkout-order">DELIVER TO</div>
              <hr className="checkout-hr-down"/>
              <div className="detail-address">
                <div className="address-header">{addressState.currentAddress.name}</div>
                <div>{addressState.currentAddress.houseNo}</div>
                <div>{addressState.currentAddress.city}, {addressState.currentAddress.state}, {addressState.currentAddress.postalCode}</div>
                <div>Phone Number - {addressState.currentAddress.mobileNo}</div>
              </div>
              <button onClick={checkoutBtn} className="place-btn">Place Order</button>
            </div>
          }
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}