```jsx
import React, { useState, useEffect } from 'react';
import { X, MapPin, Package, Loader2, Info } from 'lucide-react';
import { db, auth } from '../firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { getAllShippingRates } from '../services/shippingService';
import { requireCustomerLogin } from '../utils/requireCustomerLogin';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ serviceName, onClose }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [courierRates, setCourierRates] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    weight: '0.5',
    date: ''
  });

  // --------------------------------------------------
  // n8n WEBHOOK
  // --------------------------------------------------
  const sendToZapier = async (bookingData) => {
    const PRODUCTION_URL =
      'http://localhost:5678/webhook/apni-manzil-logistics';

    try {
      const response = await fetch(PRODUCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      let responseData = null;

      try {
        responseData = await response.json();
      } catch (e) {
        responseData = null;
      }

      console.log('n8n Response:', responseData);

      return {
        success: response.ok,
        data: responseData
      };
    } catch (err) {
      console.error('n8n Webhook Error:', err);

      return {
        success: false,
        error: err.message
      };
    }
  };

  // --------------------------------------------------
  // FETCH SHIPPING RATES
  // --------------------------------------------------
  useEffect(() => {
    const fetchRates = async () => {
      if (
        formData.pickup.length === 6 &&
        formData.drop.length === 6
      ) {
        setRatesLoading(true);

        try {
          const data = await getAllShippingRates({
            pickup: formData.pickup,
            drop: formData.drop,
            weight: formData.weight
          });

          if (
            data &&
            data.success &&
            data.rates &&
            data.rates.data &&
            data.rates.data.available_courier_companies
          ) {
            setCourierRates(
              data.rates.data.available_courier_companies
            );
          } else if (Array.isArray(data)) {
            setCourierRates(data);
          } else {
            setCourierRates([]);
          }
        } catch (err) {
          console.error('Rates fetch error:', err);
          setCourierRates([]);
        } finally {
          setRatesLoading(false);
        }
      }
    };

    fetchRates();
  }, [
    formData.pickup,
    formData.drop,
    formData.weight
  ]);

  // --------------------------------------------------
  // RAZORPAY PAYMENT
  // --------------------------------------------------
  const handlePayment = (amount, bookingId) => {
    const options = {
      key: 'rzp_live_SaHG507xstegnT',
      amount: Math.round(Number(amount || 0) * 100),
      currency: 'INR',
      name: 'Apni Manzil',
      description: 'Shipping for ' + serviceName,

      handler: async function (response) {
        console.log('Payment Response:', response);
        console.log('Booking ID:', bookingId);

        try {
          await updateDoc(
            doc(db, 'bookings', bookingId),
            {
              status: 'Payment Successful',
              paymentId: response.razorpay_payment_id || '',
              paymentStatus: 'paid',
              paidAt: new Date().toISOString(),
              updatedAt: serverTimestamp()
            }
          );

          alert(
            '✅ पेमेंट यशस्वी! तुमची booking तयार झाली आहे.'
          );

          onClose();
        } catch (error) {
          console.error(
            'Payment status update error:',
            error
          );

          alert(
            'पेमेंट झाले आहे, पण booking status update करण्यात अडचण आली.'
          );

          onClose();
        }
      },

      prefill: {
        name: auth.currentUser?.displayName || 'Customer',
        email:
          auth.currentUser?.email ||
          'help@apnimanzil.co.in',
        contact: '7378502356'
      },

      theme: {
        color: '#001D3D'
      }
    };

    if (!window.Razorpay) {
      alert(
        'Razorpay load झालेले नाही. कृपया page refresh करून पुन्हा प्रयत्न करा.'
      );
      return;
    }

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', async function (response) {
      console.error(
        'Razorpay Payment Failed:',
        response
      );

      try {
        await updateDoc(
          doc(db, 'bookings', bookingId),
          {
            status: 'Payment Failed',
            paymentStatus: 'failed',
            paymentError:
              response?.error?.description || '',
            updatedAt: serverTimestamp()
          }
        );
      } catch (error) {
        console.error(
          'Payment failed status update error:',
          error
        );
      }

      alert(
        '❌ Payment failed. Booking dashboard मध्ये दिसेल.'
      );
    });

    rzp.open();
  };

  // --------------------------------------------------
  // MAIN BOOKING
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login check
    const canContinue = requireCustomerLogin(
      navigate,
      'book this service'
    );

    if (!canContinue) {
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert(
        'Please Login or Register to continue.'
      );
      return;
    }

    if (!selectedCourier) {
      alert(
        'कृपया कुरियर पार्टनर निवडा!'
      );
      return;
    }

    setLoading(true);

    let firebaseBookingId = null;

    try {
      const courierPrice =
        Number(
          selectedCourier.rate ||
          selectedCourier.freight_charge ||
          0
        );

      const courierName =
        selectedCourier.name ||
        selectedCourier.courier_name ||
        'Courier Partner';

      // --------------------------------------------------
      // STEP 1 — FIREBASE BOOKING FIRST
      // --------------------------------------------------
      const bookingPayload = {
        customerId: currentUser.uid,

        customerEmail:
          currentUser.email || '',

        customerName:
          currentUser.displayName || '',

        serviceType: serviceName,

        pickupAddress: formData.pickup,

        dropAddress: formData.drop,

        pickupPincode: formData.pickup,

        dropPincode: formData.drop,

        dimensions: formData.weight,

        weight: Number(formData.weight),

        pickupDate: formData.date,

        courierName: courierName,

        courierId:
          selectedCourier.courier_id ||
          selectedCourier.courierId ||
          selectedCourier.id ||
          '',

        price: courierPrice,

        status: 'Booking Created',

        paymentStatus: 'pending',

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(
        collection(db, 'bookings'),
        bookingPayload
      );

      firebaseBookingId = docRef.id;

      console.log(
        '✅ Firebase Booking Created:',
        firebaseBookingId
      );

      // --------------------------------------------------
      // STEP 2 — SEND TO n8n
      // --------------------------------------------------
      const n8nResult = await sendToZapier({
        ...bookingPayload,
        bookingId: firebaseBookingId,
        firebaseUid: currentUser.uid
      });

      // --------------------------------------------------
      // STEP 3 — UPDATE FIREBASE WITH n8n RESULT
      // --------------------------------------------------
      if (n8nResult.success) {
        await updateDoc(
          doc(db, 'bookings', firebaseBookingId),
          {
            status: 'Payment Pending',
            n8nStatus: 'success',
            n8nResponse:
              n8nResult.data || null,
            updatedAt: serverTimestamp()
          }
        );

        console.log(
          '✅ n8n booking submitted successfully'
        );
      } else {
        // n8n/API fail झाला तरी Firebase booking राहणार
        await updateDoc(
          doc(db, 'bookings', firebaseBookingId),
          {
            status: 'Courier Processing',
            n8nStatus: 'failed',
            n8nError:
              n8nResult.error || 'n8n request failed',
            updatedAt: serverTimestamp()
          }
        );

        console.warn(
          '⚠️ n8n failed, but Firebase booking preserved.'
        );
      }

      // --------------------------------------------------
      // STEP 4 — RAZORPAY
      // --------------------------------------------------
      handlePayment(
        courierPrice,
        firebaseBookingId
      );

    } catch (error) {
      console.error(
        '❌ Booking Error:',
        error
      );

      if (firebaseBookingId) {
        try {
          await updateDoc(
            doc(db, 'bookings', firebaseBookingId),
            {
              status: 'Booking Error',
              errorMessage:
                error.message || 'Unknown error',
              updatedAt: serverTimestamp()
            }
          );
        } catch (updateError) {
          console.error(
            'Booking error status update failed:',
            updateError
          );
        }
      }

      alert(
        '❌ Booking Error: ' +
          (error.message || 'Something went wrong')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative border-t-[8px] border-[#FF5E00] my-8 animate-in zoom-in duration-200">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">

          <h2 className="text-2xl font-black text-[#001D3D] uppercase italic">
            Book {serviceName}
          </h2>

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
            AI Logistics Search Active
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PICKUP */}

            <div className="flex flex-col gap-2">

              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Pickup Pincode
              </label>

              <div className="relative">

                <MapPin
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  required
                  maxLength={6}
                  value={formData.pickup}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pickup:
                        e.target.value.replace(
                          /\D/g,
                          ''
                        )
                    })
                  }
                  className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm"
                  placeholder="e.g. 416520"
                />

              </div>

            </div>

            {/* DROP */}

            <div className="flex flex-col gap-2">

              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Drop Pincode
              </label>

              <div className="relative">

                <MapPin
                  className="absolute left-4 top-4 text-[#FF5E00]"
                  size={18}
                />

                <input
                  required
                  maxLength={6}
                  value={formData.drop}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      drop:
                        e.target.value.replace(
                          /\D/g,
                          ''
                        )
                    })
                  }
                  className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm"
                  placeholder="e.g. 400094"
                />

              </div>

            </div>

            {/* WEIGHT */}

            <div className="flex flex-col gap-2">

              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Weight (KG)
              </label>

              <select
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value
                  })
                }
                className="p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm"
              >
                <option value="0.5">
                  0.5 KG
                </option>

                <option value="1">
                  1 KG
                </option>

                <option value="5">
                  5 KG
                </option>
              </select>

            </div>

            {/* DATE */}

            <div className="flex flex-col gap-2">

              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Pickup Date
              </label>

              <input
                required
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value
                  })
                }
                className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm"
              />

            </div>

          </div>

          {/* COURIER RATES */}

          <div className="mt-8">

            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 ml-2 flex items-center gap-2">

              <Info size={12} />

              Select Courier Partner

            </h3>

            {ratesLoading ? (

              <div className="flex items-center justify-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed">

                <Loader2
                  className="animate-spin text-[#FF5E00] mr-2"
                  size={20}
                />

                <span className="text-[10px] font-black uppercase text-slate-500">
                  Searching Best Rates...
                </span>

              </div>

            ) : courierRates.length > 0 ? (

              <div className="grid grid-cols-1 gap-3 max-h-[200px] overflow-y-auto pr-2">

                {courierRates.map(
                  (courier, index) => {

                    const cName =
                      courier.name ||
                      courier.courier_name ||
                      'Courier Partner';

                    const cRate =
                      courier.rate ||
                      courier.freight_charge ||
                      0;

                    const cEtd =
                      courier.etd ||
                      courier.estimated_delivery_days ||
                      '3-5 Days';

                    const isSelected =
                      selectedCourier === courier;

                    return (
                      <div
                        key={
                          courier.courier_id ||
                          courier.id ||
                          index
                        }
                        onClick={() =>
                          setSelectedCourier(
                            courier
                          )
                        }
                        className={
                          'flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ' +
                          (
                            isSelected
                              ? 'border-[#FF5E00] bg-orange-50'
                              : 'border-slate-100 bg-white'
                          )
                        }
                      >

                        <div className="flex items-center gap-3">

                          <Package
                            size={20}
                            className="text-[#001D3D]"
                          />

                          <div>

                            <p className="text-xs font-black uppercase">
                              {cName}
                            </p>

                            <p className="text-[8px] text-slate-400 font-bold uppercase italic">
                              Est: {cEtd}
                            </p>

                          </div>

                        </div>

                        <p className="text-lg font-black text-[#FF5E00]">
                          ₹{cRate}
                        </p>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <div className="p-6 text-center bg-slate-50 rounded-3xl text-[10px] font-black text-slate-400 uppercase italic">
                Enter Pincodes to see Rates
              </div>

            )}

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !selectedCourier
              }
              className={
                'flex-[2] text-white py-4 rounded-2xl font-black uppercase text-xs shadow-xl flex justify-center items-center gap-2 ' +
                (
                  !selectedCourier
                    ? 'bg-slate-300'
                    : 'bg-[#001D3D] hover:bg-[#FF5E00]'
                )
              }
            >

              {loading ? (

                <Loader2
                  className="animate-spin"
                  size={16}
                />

              ) : (

                'Pay & Book Now'

              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BookingForm;
```
