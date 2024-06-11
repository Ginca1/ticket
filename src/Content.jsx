import React, { useState, useEffect } from 'react';
import './App.css';
import myImage from './image/one.jpg';
import concert from './image/concert.png';
import sports from './image/sports.jpg';
import movie from './image/movie.jpg';
import comedy from './image/comedy.png';

const Content = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const eventsData = [
    {
      EventID: '1',
      EventName: 'Eminem concert',
      EventDate: '2024-01-20',
      EventTime: '36:23:56',
      Venue: 'In LA with Snoop Dog.',
      TicketPrice: '20.00',
      TicketQuantity: '1000',
      CategoryID: '1',
      TypeID: '1',
      Image: 'https://eminem.news/wp-content/uploads/2019/03/MELBOURNE-12.jpg',
    },
    {
      EventID: '2',
      EventName: 'Saw',
      EventDate: '2024-01-25',
      EventTime: '22:00:00',
      Venue: 'New saw movie in Valmiera',
      TicketPrice: '7.00',
      TicketQuantity: '150',
      CategoryID: '5',
      TypeID: '11',
      Image: 'https://cdn.kinocheck.com/i/ox6dz8nod1.jpg',
    },
  ];

  
  const eventsById = {};
  eventsData.forEach((event) => {
    eventsById[event.EventID] = event;
  });

  
  const eventIdToAccess = '1';
  const eventById = eventsById[eventIdToAccess];

  
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const eventTime = new Date(`2000-01-01T${timeString}`);
    return eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
   
    fetch('http://localhost/Biletes/bilete/src/php/category.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));

    fetch('http://localhost/Biletes/bilete/src/php/events.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        } else {
          console.error('Failed to fetch events:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);


  const handleViewMoreClick = (event) => {
    setSelectedEvent(event);
  };

  
  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  
  const renderPopup = () => {
    if (!selectedEvent) {
      return null;
    }

    return (
      <div className="popup">
        <div className="popup-content">
          <div className="row">
          <div className="more">
          <button className="popup-close" onClick={handleClosePopup}>
            Close
          </button>
          <div className="row">
          <img
                        style={{ width: '270px', height: '180px', borderRadius: '3px' }}
                        src={selectedEvent.Image} 
           />
           </div>
          <h2>{selectedEvent.EventName}</h2>
          <p>Date: {formatDate(selectedEvent.EventDate)}</p>
          <p>Time: {selectedEvent.EventTime}</p>
          <p>Venue: {selectedEvent.Venue}</p>
         
        </div>
        </div>
        </div>
      </div>
    );
  };

  
    return (
        <>
        <div  style={{marginTop:'3%'}} className="row">
      <div className="slide-box">
      <div className="row">
        <div  className="image-container">
        
          <img  src={myImage} alt="Image Description" />

          
          <div className="text">
            <h1>Get your music fix with festival !!</h1>
          </div>

        <button className='book-now'>Book now</button>
          

        </div>
        <img   style={{height:'36px',width:'36px', cursor:'pointer', marginLeft:'30px'}}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'%3E%3Cpath d='M13.5 27L22.5 18L13.5 9' stroke='%23667080' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
            alt="SVG Image"
          />
      </div>
    </div>
      </div>

      <div style={{marginTop:'5%', marginRight:'0%'}} className="row">
        <div className="title-head">
          <div style={{justifyContent:"space-between"}} className="row">
        <h2>Browse By Category </h2>
        <button style={{height:'40px',marginRight:'0px'}}  className='head-button'>See more</button>
      </div>
      <div style={{marginTop:'2%'}} className="row">
        <div className="category">
          <div className="row-space">
            <div className="category-box">
            <img style={{width:'100%', height:'100%'}}  src={concert} alt="Image Description" />
            <div className="category-title">
              <div style={{ height:'100%'}}  className="row">
              {categories
    .filter(category => category.ID === "1")
    .map((category, index) => (
        <div key={index} className="category-value">
            <p>{category.Name}</p>
        </div>
))}
              </div>
            </div>
            </div>  
            <div className="category-box">
            <img style={{width:'100%', height:'100%'}}  src={sports} alt="Image Description" />
            <div className="category-title">
              <div style={{ height:'100%'}}  className="row">
              {categories
    .filter(category => category.ID === "3")
    .map((category, index) => (
        <div key={index} className="category-value">
            <p>{category.Name}</p>
        </div>
))}
              </div>
            </div>
            </div>
            <div className="category-box">
            <img style={{width:'100%', height:'100%'}}  src={movie} alt="Image Description" />
            <div className="category-title">
              <div style={{ height:'100%'}}  className="row">
              {categories
    .filter(category => category.ID === "5")
    .map((category, index) => (
        <div key={index} className="category-value">
            <p>{category.Name}</p>
        </div>
))}
              </div>
            </div>
            </div>
            <div className="category-box">
            <img style={{ width: '100%', height: '100%' }} src={comedy} alt="Comedy Category" />
            <div className="category-title">
              <div style={{ height:'100%'}}  className="row">
              {categories
    .filter(category => category.ID === "6")
    .map((category, index) => (
        <div key={index} className="category-value">
            <p>{category.Name}</p>
        </div>
))}
              </div>
            </div>
            </div>
           
          </div>
        </div>
      </div>
      </div>
      </div>

      <div style={{  marginTop:'3%'}} className="row">
        <div className="title-head">
          <div style={{  justifyContent:'space-between'}} className="row">
            <h2>Top picks</h2>
            <div className="sort-box">
              <div  style={{ height:'100%', justifyContent:'space-evenly'}} className="row">
            <div className="dropdown">
  <select className="dropdown-input" id="day" defaultValue="">
    <option value="" >Weekdays</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
  <div className="dropdown-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#1D275F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
</div>
<div className="dropdown">
  <select className="dropdown-input" id="type">
  <option value="" >Event type</option>
    <option value="Rap">Rap</option>
    <option value="Pop">Pop</option>
    <option value="Running">Running</option>
    <option value="Swimming">Swimming</option>
    <option value="Puppet show">Puppet show</option>
    <option value="Basketball">Basketball</option>
    <option value="Football">Football</option>
    <option value="Volley ball">Volley ball</option>
    <option value="Hockey">Hockey</option>
    <option value="Horror">Horror</option>
    <option value="Adventure">Adventure</option>
  </select>
  <div className="dropdown-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#1D275F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
</div>
<button style={{height:'40px',marginRight:'0px'}}  className='head-button'>Sort</button>

</div>
</div>
      <div className="row">
        <div className="events">
        {events.map((event, index) => (
                  <div key={index} style={{marginTop:'3%'}} className="event-box">
                    <div  className="row-space">
                    <div className="img-desc">
                      <div  className="row-space">
                      <img
                        style={{ width: '160px', height: '160px', borderRadius: '20px', cursor:'pointer' }}
                        src={event.Image} 
                        alt={event.EventName}
                      />
                      <div className="desc">
                        <div  className="row-left">
                        <p>{event.EventDate} </p>
                        
                        </div>
                        <div  className="row-left">
                        <p> {event.EventTime}</p> 
                        </div>
                        <div  className="row-left">
                          <p style={{ fontWeight: '700' }}>{event.EventName}</p>
                        </div>
                        <div   className="row-left">
                          <p style={{ fontWeight: '700' }}>{event.Venue}</p>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="purchase-box">
                      <div style={{marginTop:'20%'}} className="row">
                    <button  style={{marginTop:'20%'}} className="view" onClick={() => handleViewMoreClick(event)}>
                    View more
                  </button>
                  </div>
                      <div style={{marginTop:'5%'}} className="row">
                        <button className="book">Book now</button>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
        </div>



       
      </div>
            </div>
            
          </div>
        </div>
        <div style={{ marginTop:'20%'}} className="row">
          -
        </div>
        {renderPopup()}
        </>
    );
  };
  
  export default Content;