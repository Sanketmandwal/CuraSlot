import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assests";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { userData, setUserData, token, backendUrl, loaduserprofiledata } = useContext(AppContext);

  // On mount, fetch user profile
  // useEffect(() => {
  //   loaduserprofiledata();
  // }, []);

  const safeUserData = userData || {};
  const safeAddress = safeUserData.address || { line1: "", line2: "" };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', safeUserData.name || '');
      formData.append('phone', safeUserData.phone || '');
      formData.append('address', JSON.stringify(safeUserData.address || {}));
      formData.append('gender', safeUserData.gender || '');
      formData.append('dob', safeUserData.dob || '');
      if (imageFile) formData.append('image', imageFile);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loaduserprofiledata();
        setIsEdit(false);
        setImageFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    loaduserprofiledata();
    setIsEdit(false);
    setImageFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 mb-20">
      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center relative">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : safeUserData.image || assets.placeholderProfile}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
            />
          </label>
        ) : (
          <img
            src={safeUserData.image || assets.placeholderProfile}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        )}
        <div className="mt-4 text-center">
          {isEdit ? (
            <input
              type="text"
              value={safeUserData.name || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="text-2xl font-bold text-gray-800 border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50"
            />
          ) : (
            <p className="text-2xl font-bold text-gray-800">{safeUserData.name}</p>
          )}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Contact & Address */}
      <div className="space-y-4">
        <div>
          <p className="font-medium">{safeUserData.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          {isEdit ? (
            <input
              type="text"
              value={safeUserData.phone || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              className="border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50 w-full"
            />
          ) : (
            <p className="font-medium">{safeUserData.phone}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500">Address</p>
          {isEdit ? (
            <>
              <input
                type="text"
                value={safeAddress.line1}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
                className="border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50 w-full mb-2"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                value={safeAddress.line2}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
                className="border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50 w-full"
                placeholder="Address Line 2"
              />
            </>
          ) : (
            <p className="font-medium whitespace-pre-line">
              {`${safeAddress.line1}\n${safeAddress.line2}`}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Gender & DOB */}
      <div className="space-y-4">
        <div>
          <p className="text-gray-500">Gender</p>
          {isEdit ? (
            <select
              value={safeUserData.gender || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              className="border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50 w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="font-medium">{safeUserData.gender}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500">Birthday</p>
          {isEdit ? (
            <input
              type="date"
              value={safeUserData.dob || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              className="border-b-2 border-blue-400 focus:outline-none px-2 py-1 bg-gray-50 w-full"
            />
          ) : (
            <p className="font-medium">
              {safeUserData.dob ? new Date(safeUserData.dob).toLocaleDateString() : ''}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEdit ? (
          <>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
