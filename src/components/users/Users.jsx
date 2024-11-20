import React, { useState } from 'react';
import "./Users.css";
import male from "../../assets/male-avatar-boy-face-man-user-9.svg";
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg";
import { useDispatch } from "react-redux";
import { removeFromUsers, editUser } from "../../context/usersSlice";

function Users({ data }) {
  const dispatch = useDispatch();
  const [editUserState, setEditUserState] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (user) => {
    setEditUserState(user); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditUserState(null); 
    setShowModal(false);
  };

  return (
    <div className='users__wrapper'>
      {data?.map(user => 
        <div key={user.id} className="users__card">
          <img src={user.gender === "male" ? male : female} alt="" />
          <h2>{user.name}</h2>
          <p>{user.profession}</p>
          <p>{user.age} years old</p>
          <button 
            onClick={() => {
              dispatch(removeFromUsers(user));
            }}
          >
            Remove
          </button>
          <button 
            onClick={() => handleEditClick(user)}
            className="edit__button"
          >
            Edit
          </button>
        </div>
      )}

      {showModal && editUserState && (
        <div className="modal">
          <div className="modal__content">
            <h2>Edit User</h2>
            <form className='create__user-form'
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(editUser({ id: editUserState.id, updatedData: editUserState }));
                handleCloseModal();
              }}
            >
              <label>
                <p className='edit-text'>Name</p>
                <input 
                  type="text" 
                  value={editUserState.name || ''} 
                  onChange={(e) => setEditUserState(prev => ({ ...prev, name: e.target.value }))}
                />
              </label>
              <label>
                 <p className='edit-text'>Age</p>
                <input 
                  type="number" 
                  value={editUserState.age || ''} 
                  onChange={(e) => setEditUserState(prev => ({ ...prev, age: e.target.value }))}
                />
              </label>
              <label>
                 <p className='edit-text'>Profession</p>
                <input 
                  type="text" 
                  value={editUserState.profession || ''} 
                  onChange={(e) => setEditUserState(prev => ({ ...prev, profession: e.target.value }))}
                />
              </label>
              <div className="modal__actions">
                <button className='actions__btn' type="submit">Save</button>
                <button className='actions__btn' type="button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
