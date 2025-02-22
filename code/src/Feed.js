/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Feed = () => {
  const [stateVariable, setStateVariable] = useState('');
  const [thoughtsList, setThoughtsList] = useState([]);
  // const APIEndpoint = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';
  const APIEndpoint = 'https://project-happy-thoughts-api-sgcqkoiltq-lz.a.run.app/thoughts';
  // Fetching

  const fetchHappy = () => {
    fetch(APIEndpoint)
      .then((response) => response.json())
      .then((data) => setThoughtsList(data))
      .catch((error) => console.log(error))
      .finally(() => { console.log('fetch was successful') });
  }
  // Sending
  const postHappy = () => {
    fetch(APIEndpoint, {
      method: 'POST',
      body: JSON.stringify({ message: stateVariable }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(() => {
        setStateVariable(''); // Clear the input after the message has been sent to the API.
        fetchHappy(); // Update/Bring me the thought list with the new ones
      })
      .finally(() => {
        console.log('POST request was successful');
      })
  }
  const increaseLike = (thought) => {
    const options = {
      method: 'PATCH'
    }

    console.log('options', options)
    // eslint-disable-next-line no-underscore-dangle
    fetch(`https://project-happy-thoughts-api-sgcqkoiltq-lz.a.run.app/thoughts/${thought._id}/like
    `, options)
      .then((response) => response.json())
      .then((data) => { console.log(data) })
      .catch((error) => console.log(error))
      .finally(() => {
        fetchHappy();
        console.log('heart count increased');
      })
  }
  // excecute the fetch happy on the first render since the array is empty
  useEffect(fetchHappy, []);

  return (
    <>
      <div className="card">
        <h1>What is making you happy now?</h1>
        <input
          type="text"
          value={stateVariable}
          onChange={(event) => setStateVariable(event.target.value)} />
        <button
          className="send"
          type="button"
          onClick={() => { postHappy() }}>❤️ Send happy thought ❤️
        </button>
      </div>
      <div className="messages-wrapper">
        {thoughtsList.map((thought) => (
          <div className="messages" key={thought._id}>

            <div className="post-text">

              <p key={thought._id}>{thought.message}</p>
              <div className="like-section">
                <button className="like-button" onClick={() => { increaseLike(thought) }} type="button">
                ❤️
                </button>
                <span> x {thought.hearts}</span>
              </div>
              <div className="time-posted">{moment(thought.createdAt).fromNow()}</div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Feed;