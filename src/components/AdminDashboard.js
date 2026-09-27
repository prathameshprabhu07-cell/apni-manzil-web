import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

import {
  Users,
  Package,
  Truck,
  Trash2,
  Phone,
  User,
  LogOut,
  Mail,
  Eye
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [msmeUsers, setMsmeUsers] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {

    // =========================
    // BOOKINGS
    // =========================
    const bookingsQuery = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeBookings = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const bookingData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        setOrders(bookingData);
        setLoading(false);
      },
      (error) => {
        console.error('Bookings listener error:', error);
        setLoading(false);
      }
    );

    // =========================
    // MSME USERS
    // =========================
    const unsubscribeMsme = onSnapshot(
      collection(db, 'msme_profile'),
      (snapshot) => {
        setMsmeUsers(snapshot.size);
      },
      (error) => {
        console.error('MSME listener error:', error);
      }
    );

    // =========================
    // REGISTERED USERS
    // =========================
    const unsubscribeUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        setRegisteredUsers(snapshot.size);
        console.log('Total Registered Users:', snapshot.size);
      },
      (error) => {
        console.error('Users listener error:', error);
      }
    );

    // =========================
    // PARTNERS
    // =========================
    const unsubscribePartners = onSnapshot(
      collection(db, 'partner_profiles'),
      (snapshot) => {

        const partnerData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        setPartners(partnerData);

        console.log('Total Partners:', partnerData.length);
      },
      (error) => {
        console.error('Partners listener error:', error);
      }
    );

    // =========================
    // CLEANUP
    // =========================
    return () => {
      unsubscribeBookings();
      unsubscribeMsme();
      unsubscribeUsers();
      unsubscribePartners();
    };

  }, []);

  // =========================
  // ADMIN LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert('Admin Logged Out Safely!');

      navigate('/login');

    } catch (error) {
      console.error('Admin logout error:', error);
      alert('Logout failed!');
    }
  };

  // =========================
  // UPDATE BOOKING STATUS
  // =========================
  const updateStatus = async (orderId, newStatus) => {
    try {

      await updateDoc(
        doc(db, 'bookings', orderId),
        {
          status: newStatus
        }
      );

    } catch (error) {
      console.error('Status update error:', error);
      alert('Status update failed!');
    }
  };

  // =========================
  // DELETE BOOKING
  // =========================
  const deleteOrder = async (orderId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, 'bookings', orderId)
      );

    } catch (error) {

      console.error('Delete order error:', error);
      alert('Booking delete failed!');

    }
  };

  // =========================
  // APPROVE PARTNER
  // =========================
  const approvePartner = async (partner) => {

    const partnerId =
      partner.Partner_ID ||
      partner.partner_id ||
      partner.id;

    const confirmApprove = window.confirm(
      `Approve partner ${partnerId}?`
    );

    if (!confirmApprove) return;

    try {

      await updateDoc(
        doc(db, 'partner_profiles', partner.id),
        {
          status: 'Approved',
          verificationStatus: 'Approved',
          approvedAt: new Date().toISOString()
        }
      );

      alert('Partner Approved Successfully!');

    } catch (error) {

      console.error(
        'Partner approval error:',
        error
      );

      alert(
        'Partner approval failed! Check Firebase permissions.'
      );

    }
  };

  // =========================
  // REJECT PARTNER
  // =========================
  const rejectPartner = async (partner) => {

    const partnerId =
      partner.Partner_ID ||
      partner.partner_id ||
      partner.id;

    const confirmReject = window.confirm(
      `Reject partner ${partnerId}?`
    );

    if (!confirmReject) return;

    try {

      await updateDoc(
        doc(db, 'partner_profiles', partner.id),
        {
          status: 'Rejected',
          verificationStatus: 'Rejected',
          rejectedAt: new Date().toISOString()
        }
      );

      alert('Partner Rejected!');

    } catch (error) {

      console.error(
        'Partner rejection error:',
        error
      );

      alert(
        'Partner rejection failed! Check Firebase permissions.'
      );

    }
  };

  // =========================
  // FILTER BOOKINGS
  // =========================
  const filteredOrders =
    filterStatus === 'All'
      ? orders
      : orders.filter(
          (order) =>
            String(order.status || '').toLowerCase() ===
            filterStatus.toLowerCase()
        );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-[#002D5E] text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h1 className="text-2xl md:text-3xl font-bold">
                APNI MANZIL SUPER ADMIN
              </h1>

              <p className="text-sm text-blue-200 mt-1">
                LOGISTICS CONTROL CENTER
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-6">

          {[
            'All',
            'Pending',
            'Paid',
            'In Transit',
            'Delivered'
          ].map((status) => (

            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === status
                  ? 'bg-[#002D5E] text-white'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              {status}
            </button>

          ))}

        </div>


        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          {/* REGISTERED USERS */}
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 font-semibold">
                  REGISTERED USERS
                </p>

                <h2 className="text-3xl font-bold text-[#002D5E] mt-2">
                  {registeredUsers}
                </h2>

              </div>

              <Users
                className="text-blue-600"
                size={35}
              />

            </div>

          </div>


          {/* MSME USERS */}
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-orange-500">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 font-semibold">
                  MSME USERS
                </p>

                <h2 className="text-3xl font-bold text-[#002D5E] mt-2">
                  {msmeUsers}
                </h2>

              </div>

              <Package
                className="text-orange-500"
                size={35}
              />

            </div>

          </div>


          {/* PARTNERS */}
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-600">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 font-semibold">
                  PARTNERS
                </p>

                <h2 className="text-3xl font-bold text-[#002D5E] mt-2">
                  {partners.length}
                </h2>

              </div>

              <Truck
                className="text-green-600"
                size={35}
              />

            </div>

          </div>


          {/* TOTAL ORDERS */}
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-600">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 font-semibold">
                  TOTAL ORDERS
                </p>

                <h2 className="text-3xl font-bold text-[#002D5E] mt-2">
                  {orders.length}
                </h2>

              </div>

              <Package
                className="text-purple-600"
                size={35}
              />

            </div>

          </div>


          {/* SYSTEM */}
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 font-semibold">
                  SYSTEM
                </p>

                <h2 className="text-xl font-bold text-green-600 mt-2">
                  LIVE
                </h2>

              </div>

              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

            </div>

          </div>

        </div>


        {/* ================= PARTNER MANAGEMENT ================= */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">

          <div className="px-5 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-2">

            <div>

              <h2 className="text-xl font-bold text-[#002D5E]">
                Partner Management
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage registered partners
              </p>

            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
              {partners.length} Partners
            </div>

          </div>


          {partners.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No partners found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-4 py-3">
                      Partner ID
                    </th>

                    <th className="text-left px-4 py-3">
                      Company
                    </th>

                    <th className="text-left px-4 py-3">
                      Owner
                    </th>

                    <th className="text-left px-4 py-3">
                      Mobile
                    </th>

                    <th className="text-left px-4 py-3">
                      Service
                    </th>

                    <th className="text-left px-4 py-3">
                      Status
                    </th>

                    <th className="text-left px-4 py-3">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {partners.map((partner) => {

                    const currentStatus =
                      partner.status ||
                      partner.verificationStatus ||
                      'Pending';

                    const normalizedStatus =
                      String(currentStatus).toLowerCase();

                    const isApproved =
                      normalizedStatus === 'approved';

                    const isRejected =
                      normalizedStatus === 'rejected';

                    return (

                      <tr
                        key={partner.id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* PARTNER ID */}
                        <td className="px-4 py-4">

                          <span className="font-bold text-[#002D5E]">
                            {partner.Partner_ID ||
                              partner.partner_id ||
                              'N/A'}
                          </span>

                        </td>


                        {/* COMPANY */}
                        <td className="px-4 py-4">

                          <div className="font-semibold text-gray-800">

                            {partner.companyName ||
                              partner.company_name ||
                              partner.Company_Name ||
                              'N/A'}

                          </div>

                          {partner.email && (

                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">

                              <Mail size={12} />

                              {partner.email}

                            </div>

                          )}

                        </td>


                        {/* OWNER */}
                        <td className="px-4 py-4">

                          <div className="flex items-center gap-1">

                            <User size={14} />

                            {partner.ownerName ||
                              partner.owner_name ||
                              partner.Owner_Name ||
                              'N/A'}

                          </div>

                        </td>


                        {/* MOBILE */}
                        <td className="px-4 py-4">

                          {partner.mobile ||
                            partner.phone ||
                            partner.contactNumber ||
                            partner.contact_number ||
                            'N/A'}

                        </td>


                        {/* SERVICE */}
                        <td className="px-4 py-4">

                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">

                            {partner.serviceType ||
                              partner.service_type ||
                              partner.services ||
                              'N/A'}

                          </span>

                        </td>


                        {/* STATUS */}
                        <td className="px-4 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isApproved
                                ? 'bg-green-100 text-green-700'
                                : isRejected
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >

                            {currentStatus}

                          </span>

                        </td>


                        {/* ACTION */}
                        <td className="px-4 py-4">

                          <div className="flex flex-wrap items-center gap-2">

                            {/* VIEW */}
                            <button
                              onClick={() => {

                                alert(
                                  JSON.stringify(
                                    partner,
                                    null,
                                    2
                                  )
                                );

                              }}
                              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                              title="View Partner"
                            >

                              <Eye size={17} />

                            </button>


                            {/* APPROVE */}
                            {!isApproved && (

                              <button
                                onClick={() =>
                                  approvePartner(partner)
                                }
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-xs"
                              >
                                Approve
                              </button>

                            )}


                            {/* REJECT */}
                            {!isRejected && (

                              <button
                                onClick={() =>
                                  rejectPartner(partner)
                                }
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-xs"
                              >
                                Reject
                              </button>

                            )}


                            {/* CALL */}
                            {(partner.mobile ||
                              partner.phone ||
                              partner.contactNumber) && (

                              <a
                                href={`tel:${
                                  partner.mobile ||
                                  partner.phone ||
                                  partner.contactNumber
                                }`}
                                className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                                title="Call Partner"
                              >

                                <Phone size={17} />

                              </a>

                            )}

                          </div>

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* ================= BOOKINGS TABLE ================= */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="px-5 py-4 border-b">

            <h2 className="text-xl font-bold text-[#002D5E]">
              Live Bookings List
            </h2>

          </div>


          {loading ? (

            <div className="p-8 text-center text-gray-500">
              Loading bookings...
            </div>

          ) : filteredOrders.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No bookings found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-4 py-3">
                      Customer & Service
                    </th>

                    <th className="text-left px-4 py-3">
                      Route (From-To)
                    </th>

                    <th className="text-left px-4 py-3">
                      Partner & Price
                    </th>

                    <th className="text-left px-4 py-3">
                      Status
                    </th>

                    <th className="text-left px-4 py-3">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-t hover:bg-gray-50"
                    >

                      {/* CUSTOMER */}
                      <td className="px-4 py-4">

                        <div className="font-semibold text-gray-800">

                          <User
                            size={15}
                            className="inline mr-1"
                          />

                          {order.customerName ||
                            order.fullName ||
                            'N/A'}

                        </div>

                        <div className="text-gray-500 mt-1">

                          <Phone
                            size={13}
                            className="inline mr-1"
                          />

                          {order.phone || 'N/A'}

                        </div>

                        <div className="text-xs text-blue-600 mt-1">

                          {order.serviceType ||
                            order.service ||
                            'Logistics Service'}

                        </div>

                      </td>


                      {/* ROUTE */}
                      <td className="px-4 py-4">

                        <div>

                          <span className="font-semibold">
                            {order.fromPincode ||
                              order.pickupPincode ||
                              order.from ||
                              'N/A'}
                          </span>

                          <span className="mx-2">
                            →
                          </span>

                          <span className="font-semibold">
                            {order.toPincode ||
                              order.dropPincode ||
                              order.to ||
                              'N/A'}
                          </span>

                        </div>

                      </td>


                      {/* PARTNER */}
                      <td className="px-4 py-4">

                        <div className="font-semibold">
                          {order.partnerName ||
                            order.partner ||
                            'Not Assigned'}
                        </div>

                        <div className="text-gray-600">
                          ₹{order.price ||
                            order.amount ||
                            0}
                        </div>

                      </td>


                      {/* STATUS */}
                      <td className="px-4 py-4">

                        <select
                          value={
                            order.status ||
                            'Pending'
                          }
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-3 py-2"
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Paid">
                            Paid
                          </option>

                          <option value="In Transit">
                            In Transit
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                        </select>

                      </td>


                      {/* ACTION */}
                      <td className="px-4 py-4">

                        <button
                          onClick={() =>
                            deleteOrder(order.id)
                          }
                          className="text-red-600 hover:text-red-800"
                          title="Delete booking"
                        >

                          <Trash2 size={20} />

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;